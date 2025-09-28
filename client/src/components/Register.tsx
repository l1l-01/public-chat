import { useState } from "react";
import axios from "axios";
import { TextField, Button, Alert } from "@mui/material";

const Register = () => {
  const [username, setUsername] = useState<string>("");
  const [error, setError] = useState<string>("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim().length === 0) {
      setError("Username is required");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/register", {
        username,
      });
      setUsername("");
      setError("");
      localStorage.setItem(
        "account-creation-date",
        response.data.user.createdDate,
      );
      localStorage.setItem("account-id", response.data.user.id);
      localStorage.setItem("account-username", response.data.user.username);
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response) {
        console.log(err);
        setError(err.response.data.message || "Login failed");
      } else {
        setError("An unexpected error occurred");
      }
    }
  };
  return (
    <form
      className="lg:w-[500px] md:w-[300px] h-[340px] p-8 rounded-3xl border-1 border-[#CFCFCF] flex justify-center items-center flex-col gap-5"
      onSubmit={handleSubmit}
    >
      <h1 className="text-3xl font-bold mb-2 text-center text-[#CFCFCF] uppercase">
        Start Chatting
      </h1>
      {error && (
        <Alert variant="filled" severity="error" className="mt-4 w-full">
          {error}
        </Alert>
      )}
      <TextField
        id="outlined-basic"
        label="Username"
        variant="outlined"
        className="w-full"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        sx={{
          input: { color: "#CFCFCF" },
          "& label": { color: "#CFCFCF" },
          "& label.Mui-focused": { color: "#CFCFCF" },
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "#CFCFCF" },
            "&:hover fieldset": { borderColor: "#CFCFCF" },
            "&.Mui-focused fieldset": { borderColor: "#CFCFCF" },
          },
        }}
      />
      <Button
        className="w-full h-[50px] "
        variant="contained"
        size="large"
        type="submit"
        sx={{
          color: "#040404",
          fontWeight: "bold",
          backgroundColor: "#CFCFCF",
          "&:hover": {
            backgroundColor: "#fff",
            borderColor: "white",
          },
        }}
      >
        Register
      </Button>
    </form>
  );
};

export default Register;
