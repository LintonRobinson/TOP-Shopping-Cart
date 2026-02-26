import styles from "./Navbar.module.css";
import logo from "../../../assets/images/dogsdowntown-logo.png";
import { Link, NavLink } from "react-router";

function Navbar() {
  return (
    <nav>
      <Link to="/" aria-label="Home Page" className={styles.logoContainer}>
        <img src={logo} alt="" />
      </Link>
      <div>
        <NavLink to="/" aria-label="Home Page" className={({ isActive }) => (isActive ? `${styles.navLink} ${styles.active}` : styles.navLink)}>
          Home
        </NavLink>
        <NavLink to="/shop" aria-label="Shop Page" className={styles.navLink}>
          Shop
        </NavLink>
      </div>
      <div></div>
    </nav>
  );
}

export default Navbar;
