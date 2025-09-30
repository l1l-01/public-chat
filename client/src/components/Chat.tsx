import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import io, { Socket } from "socket.io-client";
import { TextField, Button } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import SendIcon from "@mui/icons-material/Send";
import PublicIcon from "@mui/icons-material/Public";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

interface Msg {
  id: number;
  content: string;
  user: {
    id: number;
    username: string;
  };
  created_at: Date;
}

const getNextDate = (inputDate: Date): Date => {
  const date = new Date(inputDate);
  date.setDate(date.getDate() + 1);
  return date;
};

const fetchLast20Msgs = async () => {
  const data = await axios.get("http://localhost:3000/api/msgs/last-20");
  return data;
};

const Chat = ({ setValid }) => {
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [msg, setMsg] = useState<string>("");

  const storedDate: string | null = localStorage.getItem(
    "account-creation-date",
  );

  const createdAt: Date = new Date(storedDate);
  const nextDate: Date = getNextDate(createdAt);

  const [userId, setUserId] = useState<string | null>(
    localStorage.getItem("account-id"),
  );

  useEffect(() => {
    if (userId && !isNaN(parseInt(userId))) {
      setValid(true);
    }
  }, [userId, setValid]);

  useEffect(() => {
    fetchLast20Msgs().then((data) => {
      setMsgs(data.data.data);
      console.log(data.data.data);
    });
  }, []);

  const handleDeregister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!userId) {
        return;
      }
      if (userId && !isNaN(parseInt(userId))) {
        await axios.delete(
          `http://localhost:3000/api/deregister/${parseInt(userId)}`,
        );
        localStorage.removeItem("account-creation-date");
        localStorage.removeItem("account-id");
        localStorage.removeItem("account-username");
        setValid(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!userId) {
        alert("UserId is missing ");
        return;
      }
      if (new Date() >= nextDate) {
        if (userId && !isNaN(parseInt(userId))) {
          await axios.delete(
            `http://localhost:3000/api/users/${parseInt(userId)}`,
          );
          localStorage.removeItem("account-creation-date");
          localStorage.removeItem("account-id");
          localStorage.removeItem("account-username");
        }
      }
      if (msg.length < 1) {
        alert("Message too long");
        return;
      }

      if (msg.length > 150) {
        alert("Message too long");
        return;
      }

      await axios.post(
        `http://localhost:3000/api/send-msg/${parseInt(userId)}`,
        {
          content: msg,
        },
      );
      setMsg("");
    } catch (error) {
      console.error(error);
    }
  };

  const socketRef = useRef<Socket | null>(null);

  // Setup WebSocket
  useEffect(() => {
    socketRef.current = io("http://localhost:3000", {
      transports: ["websocket"],
    });
    console.log("WebSocket connected");

    const handleNewMsg = (newMsg: Msg) => {
      setMsgs((prev) => [...prev, newMsg]);
      console.log(newMsg);
    };

    socketRef.current.on("newMsg", handleNewMsg);

    return () => {
      socketRef.current?.off("newMsg", handleNewMsg);
      socketRef.current?.disconnect();
    };
  }, []);

  return (
    <ul className="space-y-5 px-5 py-10 flex flex-col gap-4 w-[700px] bg-gray-400/2  border-gray-500 border-2 rounded-[20px]">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-2xl font-bold text-gray-200 flex justify-start items-center gap-2">
          <PublicIcon />
          Public Chat
        </h1>
        <form onSubmit={handleDeregister}>
          <Button size="large" type="submit">
            <ExitToAppIcon className="w-6 h-6 text-gray-200" />
          </Button>
        </form>
      </div>

      {msgs.map((msg) => {
        if (msg.user.id == userId) {
          return (
            <li className="flex ms-auto gap-x-2 sm:gap-x-4" key={msg.id}>
              <div className="grow text-end space-y-3">
                <div className="inline-block bg-neutral-900 border border-neutral-800 rounded-2xl p-4 shadow-2xs font-semibold">
                  <p className="text-sm text-white">{msg.content}</p>
                  <span className="w-full text-right text-white mt-2 text-[10px] mt-5">
                    {new Date(msg.created_at).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>

              <span className="shrink-0 inline-flex items-center justify-center size-9.5 rounded-full bg-neutral-900">
                <span className="text-sm font-medium text-white">
                  <PersonIcon />
                </span>
              </span>
            </li>
          );
        }
        return (
          <li className="max-w-lg flex gap-x-2 sm:gap-x-4 me-11" key={msg.id}>
            <span className="shrink-0 inline-flex items-center justify-center size-9.5 rounded-full bg-neutral-800">
              <span className="text-sm font-medium text-white">
                <PersonIcon />
              </span>
            </span>

            <div className="border rounded-2xl p-4 space-y-3 bg-neutral-900 border-neutral-700 text-white flex flex-col">
              <h3 className="text-lg font-semibold text-gray-300 mb-2">
                {msg.user.username}
              </h3>
              {msg.content}
              <span className="w-full text-right text-white mt-2 text-[10px] mt-5">
                {new Date(msg.created_at).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </li>
        );
      })}

      <form className="mt-10 flex" onSubmit={handleSubmit}>
        <TextField
          id="outlined-basic"
          label="Write a message..."
          variant="outlined"
          className="w-full rounded-full"
          inputProps={{ maxLength: 150 }}
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          sx={{
            input: { color: "#6a7282" },
            "& label": { color: "#6a7282" },
            "& label.Mui-focused": { color: "#6a7282" },
            "& .MuiOutlinedInput-root": {
              borderTopLeftRadius: "20px",
              borderBottomLeftRadius: "20px",
              borderTopRightRadius: "0",
              borderBottomRightRadius: "0",
              height: "55px",
              "& fieldset": { borderColor: "#6a7282" },
              "&:hover fieldset": { borderColor: "#6a7282" },
              "&.Mui-focused fieldset": { borderColor: "#6a7282" },
            },
          }}
        />
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          type="submit"
          sx={{
            color: "#040404",
            fontWeight: "bold",
            height: "55px",
            borderTopLeftRadius: "0",
            borderBottomLeftRadius: "0",
            borderTopRightRadius: "20px",
            borderBottomRightRadius: "20px",
            backgroundColor: "#6a7282",
            "&:hover": {
              backgroundColor: "#CFCFCF",
              borderColor: "white",
            },
          }}
        >
          send
        </Button>
      </form>
    </ul>
  );
};

export default Chat;
