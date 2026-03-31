import styles from "./Navbar.module.css";
import logo from "../../../assets/images/dogsdowntown-logo.png";
import { Link, NavLink, useOutletContext } from "react-router";
import ProductSearchBar from "../../ui/ProductSearchBar/ProductSearchBar.jsx";
import { LuShoppingBag } from "react-icons/lu";

function Navbar({ userCart }) {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/" aria-label="Home Page" className={styles.logoContainer}>
            <img src={logo} alt="" />
          </Link>
        </li>
        <li>
          <NavLink to="/" aria-label="Home Page" className={({ isActive }) => (isActive ? `${styles.navLink} ${styles.active}` : styles.navLink)}>
            Home
          </NavLink>
          <NavLink to="/shop" aria-label="Shop All Page" className={({ isActive }) => (isActive ? `${styles.navLink} ${styles.active}` : styles.navLink)}>
            Shop
          </NavLink>
        </li>
        <li className={styles.navbarRight}>
          <ProductSearchBar />
          <Link key={userCart} to="/cart" className={styles.shoppingBag} aria-label="Go To User Cart">
            <LuShoppingBag size={22} />
            {userCart > 0 && <span className={styles.shoppingBagNumber}>{userCart}</span>}
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
