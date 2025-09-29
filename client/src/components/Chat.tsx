import { TextField, Button } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import SendIcon from "@mui/icons-material/Send";
import PublicIcon from "@mui/icons-material/Public";

const Chat = () => {
  return (
    <ul className="space-y-5 p-5 flex flex-col gap-4">
      <h1 className="text-2xl font-bold text-gray-300 mb-10 flex justify-start items-center gap-2">
        <PublicIcon />
        Public Chat
      </h1>
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
      <form className="mt-10 flex px-6">
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
