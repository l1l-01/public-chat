import StarryBackground from "./components/StarryBackground";
import Register from "./components/Register";
import Chat from "./components/Chat";
import { useState } from "react";

function App() {
  const [valid, setValid] = useState<boolean | null>(false);
  console.log(valid);

  return (
    <div className="flex justify-center items-center h-screen">
      <StarryBackground />

      {valid ? <Chat setValid={setValid} /> : <Register setValid={setValid} />}
    </div>
  );
}

export default App;
