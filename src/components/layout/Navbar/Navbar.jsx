import styles from "./Navbar.module.css";
import logo from "../../../assets/images/dogsdowntown-logo.png";
import { Link } from "react-router";

function Navbar() {
  return (
    <nav>
      <Link to="/" aria-label="Home Page">
        <img src={logo} alt="" />
      </Link>
      <Link to="/" aria-label="Home Page">
        Home
      </Link>
      <Link aria-label="Shop Page">Shop</Link>
    </nav>
  );
}

export default Navbar;
