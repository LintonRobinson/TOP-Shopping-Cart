import { useState, useEffect } from "react";
import { Outlet } from "react-router";
import "./App.css";
import Navbar from "./components/layout/Navbar/Navbar";
import Footer from "./components/layout/Footer/Footer";
import { useLocation } from "react-router";

function App() {
  const [userCart, setUserCart] = useState({
    id: 1,
    userId: 1,
    date: "2020-03-02T00:00:00.000Z",
    products: [],
    __v: 0,
  });

  let numberOfProductsInCart = 0;
  userCart.products.forEach((cartProduct) => {
    numberOfProductsInCart = numberOfProductsInCart + cartProduct.quantity;
  });

  const { pathname } = useLocation();

  const handleCartUpdate = async (updatedCart) => {
    setUserCart(updatedCart);
  };

  return (
    <>
      <Navbar userCart={numberOfProductsInCart} />
      <Outlet key={pathname} context={[userCart.products, handleCartUpdate]} />
      <Footer />
    </>
  );
}

export default App;
