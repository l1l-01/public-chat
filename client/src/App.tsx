import { useEffect, useState, useCallback } from "react";
import StarryBackground from "./components/StarryBackground";
import Register from "./components/Register";
import axios from "axios";
import Chat from "./components/Chat";

const getNextDate = (inputDate: Date): Date => {
  const date = new Date(inputDate);
  date.setDate(date.getDate() + 1);
  return date;
};

const deleteUser = async (userId: number): Promise<void> => {
  try {
    await axios.delete(`http://localhost:3000/api/users/${userId}`);
  } catch (error) {
    console.error("Failed to delete user:", error);
    throw error; // Propagate error for better handling
  }
};

function App() {
  const [valid, setValid] = useState<boolean | null>(null);

  const checkUserValidity = useCallback(async () => {
    const storedDate = localStorage.getItem("account-creation-date");
    if (!storedDate) {
      setValid(false);
      return;
    }

    const createdAt = new Date(storedDate);
    const nextDate = getNextDate(createdAt);

    if (new Date() >= nextDate) {
      const userId = localStorage.getItem("account-id");
      if (userId && !isNaN(parseInt(userId))) {
        try {
          (async () => {
            await deleteUser(parseInt(userId));
          })();
          localStorage.removeItem("account-creation-date");
          localStorage.removeItem("account-id");
          localStorage.removeItem("account-username");
          setValid(false);
        } catch (error) {
          setValid(true);
        }
      }
    } else {
      setValid(true);
    }
  }, []);

  useEffect(() => {
    checkUserValidity();
  }, [checkUserValidity]);

  return (
    <div className="flex justify-center items-center h-screen">
      <StarryBackground />
      {valid ? <Chat /> : <Register />}
    </div>
  );
}

export default App;
