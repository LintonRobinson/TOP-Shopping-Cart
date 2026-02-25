import { useState } from "react";
import "./App.css";
import Navbar from "./components/layout/Navbar/Navbar";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      <h1>Fresh off the press!</h1>
    </>
  );
}

export default App;
