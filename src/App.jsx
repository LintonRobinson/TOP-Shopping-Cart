import { useState } from "react";
import { Outlet } from "react-router";
import "./App.css";
import Navbar from "./components/layout/Navbar/Navbar";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
