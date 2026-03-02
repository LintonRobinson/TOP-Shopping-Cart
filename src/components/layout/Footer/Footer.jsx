import styles from "./Footer.module.css";
import { Link } from "react-router";
import logo from "../../../assets/images/dogsdowntown-logo.png";
import githubLogo from "../../../assets/images/github-logo-white.png";
function Footer() {
  return (
    <footer>
      <div className={styles.footerTop}>
        <div>
          <div>
            <h3>Shop</h3>
            <div>
              <Link aria-label="Shop Training Page">Shop Training</Link>
              <Link aria-label="Shop All Page">Shop All</Link>
            </div>
          </div>
          <div>
            <h3>Connect With Us!</h3>
            <div>
              <a href="https://www.instagram.com/dogsdowntownva/" target="_blank" rel="noopener noreferrer" aria-label="Visit Dogs Downtown on Instagram (opens in new tab)">
                Instagram
              </a>
              <a href="https://www.facebook.com/dogsdowntownva" target="_blank" rel="noopener noreferrer" aria-label="Visit Dogs Downtown on Instagram (opens in new tab)">
                Facebook
              </a>
            </div>
          </div>
        </div>
        <div>
          <Link to="/" aria-label="Home Page" className={styles.logoContainer}>
            <img src={logo} alt="" />
          </Link>
          <span>Better picks for better pups.</span>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <span>© 2026 Dog's Downtown All Rights Reserved</span>
        <a
          href="https://github.com/LintonRobinson/TOP-Shopping-Cart"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View source code for this project on GitHub (opens in new tab)"
          className={styles.githubLink}
        ></a>
      </div>
    </footer>
  );
}

export default Footer;
