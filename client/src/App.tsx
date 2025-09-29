import { useEffect, useState } from "react";
import StarryBackground from "./components/StarryBackground";
import Register from "./components/Register";
import axios from "axios";
import Chat from "./components/Chat";

const getNextDate = (inputDate: Date): Date => {
  const date = new Date(inputDate);
  // Add 1 day to the date
  const nextDate = new Date(date.setDate(date.getDate() + 1));
  return nextDate;
};

const deleteUser = async (userId: number) => {
  try {
    await axios.delete(`http://localhost:3000/api/register/users/${userId}`);
  } catch (error) {
    console.error(error);
  }
};

function App() {
  const [valid, setValid] = useState<boolean>(false);
  useEffect(() => {
    const storedDate: string | null = localStorage.getItem(
      "account-creation-date",
    );
    if (storedDate) {
      const createdAt = new Date(storedDate);
      console.log(createdAt);
      const nextDate = getNextDate(createdAt);
      if (new Date() >= nextDate) {
        setValid(true);
        const userId: string | null = localStorage.getItem("account-id");
        if (userId) {
          deleteUser(parseInt(userId));
          localStorage.removeItem("account-creation-date");
          localStorage.removeItem("account-id");
          localStorage.removeItem("account-username");
        }
      }
    }
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <StarryBackground />
      {valid ? <Register /> : <Chat />}
    </div>
  );
}

export default App;
