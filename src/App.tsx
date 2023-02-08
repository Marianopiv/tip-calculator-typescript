import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Home from "./home/Home";

function App() {
  const [count, setCount] = useState(0);

  return <div className="h-screen dark:bg-white md:w-screen  md:bg-cyan-950"><Home/></div>;
}

export default App;
