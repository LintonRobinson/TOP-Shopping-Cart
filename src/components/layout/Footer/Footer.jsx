import { Link } from "react-router";
import logo from "../../../assets/images/dogsdowntown-logo.png";
function Footer() {
  return (
    <footer>
      <Link aria-label="Shop Training Page">Shop All</Link>
      <Link aria-label="Shop All Page">Shop All</Link>
      <Link to="/" aria-label="Home Page" className>
        <img src={logo} alt="" />
      </Link>
    </footer>
  );
}

export default Footer;
