import { TextField, Button } from "@mui/material";

const Register = () => {
  return (
    <form className="lg:w-[500px] md:w-[300px] h-[300px] p-8 rounded-3xl border-1 border-[#CFCFCF] flex justify-center items-center flex-col gap-5">
      <h1 className="text-3xl font-bold mb-2 text-center text-[#CFCFCF] uppercase">
        Start Chatting
      </h1>
      <TextField
        id="outlined-basic"
        label="Username"
        variant="outlined"
        className="w-full"
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
