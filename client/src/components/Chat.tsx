import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Button } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import SendIcon from "@mui/icons-material/Send";
import PublicIcon from "@mui/icons-material/Public";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const getNextDate = (inputDate: Date): Date => {
  const date = new Date(inputDate);
  date.setDate(date.getDate() + 1);
  return date;
};

const Chat = ({ setValid }) => {
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
    if (new Date() >= nextDate) {
      try {
        if (!userId) {
          return;
        }
        if (userId && !isNaN(parseInt(userId))) {
          await axios.delete(
            `http://localhost:3000/api/users/${parseInt(userId)}`,
          );
          localStorage.removeItem("account-creation-date");
          localStorage.removeItem("account-id");
          localStorage.removeItem("account-username");
        }

        if (msg.length < 1) {
          alert("Message too long");
          return;
        }

        if (msg.length > 150) {
          alert("Message too long");
          return;
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <ul className="space-y-5 p-5 flex flex-col gap-4">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-2xl font-bold text-gray-300 flex justify-start items-center gap-2">
          <PublicIcon />
          Public Chat
        </h1>
        <form onSubmit={handleDeregister}>
          <Button size="large" type="submit">
            <ExitToAppIcon className="w-6 h-6 text-gray-300" />
          </Button>
        </form>
      </div>
      <li className="max-w-lg flex gap-x-2 sm:gap-x-4 me-11">
        <span className="shrink-0 inline-flex items-center justify-center size-9.5 rounded-full bg-neutral-800">
          <span className="text-sm font-medium text-white">
            <PersonIcon />
          </span>
        </span>

        <div className="border rounded-2xl p-4 space-y-3 bg-neutral-900 border-neutral-700 text-white">
          <h3 className="text-lg font-semibold text-gray-300 mb-2">Username</h3>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam.
        </div>
      </li>

      <li className="flex ms-auto gap-x-2 sm:gap-x-4">
        <div className="grow text-end space-y-3">
          <div className="inline-block bg-neutral-900 border border-neutral-800 rounded-2xl p-4 shadow-2xs font-semibold">
            <p className="text-sm text-white">Lorem ipsum dolor sit</p>
          </div>
        </div>

        <span className="shrink-0 inline-flex items-center justify-center size-9.5 rounded-full bg-neutral-900">
          <span className="text-sm font-medium text-white">
            <PersonIcon />
          </span>
        </span>
      </li>
      <form className="mt-10 flex px-6" onSubmit={handleSubmit}>
        <TextField
          id="outlined-basic"
          label="Write a message..."
          variant="outlined"
          className="w-full rounded-full"
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
