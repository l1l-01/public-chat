import { useEffect, useState } from "react";
import StarryBackground from "./components/StarryBackground";
import Register from "./components/Register";

const getNextDate = (inputDate: Date) => {
  const date = new Date(inputDate);
  // Add 1 day to the date
  const nextDate = new Date(date.setDate(date.getDate() + 1));
  return nextDate;
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
        localStorage.removeItem("account-creation-date");
        localStorage.removeItem("account-id");
        localStorage.removeItem("account-username");
      }
    }
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <StarryBackground />
      {valid && <Register />}
    </div>
  );
}

export default App;
