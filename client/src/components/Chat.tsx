import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import io, { Socket } from "socket.io-client";
import { TextField, Button, Box } from "@mui/material";
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

  console.log(msgs.length);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!userId) {
        alert("UserId is missing ");
        return;
      }

      if (msgs.length >= 20) {
        await axios.delete(`http://localhost:3000/api/msgs`);
      }

      if (new Date() >= nextDate) {
        if (userId && !isNaN(parseInt(userId))) {
          await axios.delete(
            `http://localhost:3000/api/users/${parseInt(userId)}`,
          );
          localStorage.removeItem("account-creation-date");
          localStorage.removeItem("account-id");
          localStorage.removeItem("account-username");
          setValid(false);
          return;
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
    <div className="w-[800px] flex flex-col bg-neutral-900/50 border border-neutral-700 rounded-2xl shadow-lg relative z-10">
      {/* Header */}
      <div className="flex justify-between items-center p-5 border-b border-neutral-700">
        <h1 className="text-2xl font-bold text-gray-200 flex items-center gap-2">
          <PublicIcon />
          Public Chat
        </h1>
        <form onSubmit={handleDeregister}>
          <Button size="large" type="submit" color="inherit">
            <ExitToAppIcon className="w-6 h-6 text-gray-300" />
          </Button>
        </form>
      </div>

      {/* Scrollable messages */}
      <Box
        sx={{
          maxHeight: "450px",
          overflowY: "auto",
          p: 3,
          "&::-webkit-scrollbar": { width: "6px" },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#6a7282",
            borderRadius: "10px",
          },
        }}
        className="flex flex-col gap-4"
      >
        {msgs.map((msg) =>
          msg.user.id == userId ? (
            <li className="flex justify-end gap-3" key={msg.id}>
              {/* message content */}
              <div className="max-w-xs bg-blue-600/90 text-white rounded-2xl p-4 shadow-md text-sm">
                <p>{msg.content}</p>
                <span className="block text-right text-[10px] opacity-70 mt-1">
                  {new Date(msg.created_at).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              {/* avatar */}
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-700">
                <PersonIcon fontSize="small" />
              </span>
            </li>
          ) : (
            <li className="flex gap-3" key={msg.id}>
              {/* avatar */}
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-neutral-800">
                <PersonIcon fontSize="small" />
              </span>
              {/* message content */}
              <div className="max-w-xs bg-neutral-800 border border-neutral-700 text-white rounded-2xl p-4 shadow-md text-sm">
                <h3 className="text-sm font-semibold text-gray-300 mb-1">
                  {msg.user.username}
                </h3>
                <p>{msg.content}</p>
                <span className="block text-right text-[10px] opacity-70 mt-1">
                  {new Date(msg.created_at).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </li>
          ),
        )}
      </Box>

      <form
        className="flex items-center border-t border-neutral-700 p-3"
        onSubmit={handleSubmit}
      >
        <TextField
          fullWidth
          label="Write a message..."
          variant="outlined"
          inputProps={{ maxLength: 150 }}
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          sx={{
            input: { color: "#e5e7eb" },
            "& label": { color: "#9ca3af" },
            "& label.Mui-focused": { color: "#9ca3af" },
            "& .MuiOutlinedInput-root": {
              borderRadius: "20px 0 0 20px",
              height: "50px",
              "& fieldset": { borderColor: "#6a7282" },
              "&:hover fieldset": { borderColor: "#9ca3af" },
              "&.Mui-focused fieldset": { borderColor: "#9ca3af" },
            },
          }}
        />
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          type="submit"
          sx={{
            px: 3,
            fontWeight: "bold",
            height: "50px",
            borderRadius: "0 20px 20px 0",
            backgroundColor: "#6a7282",
            "&:hover": { backgroundColor: "#9ca3af", color: "black" },
          }}
        >
          Send
        </Button>
      </form>
    </div>
  );
};

export default Chat;
