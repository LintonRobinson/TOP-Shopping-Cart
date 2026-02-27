import styles from "./HomePage.module.css";
import { Link } from "react-router";
function HomePage() {
  return (
    <>
      <section className={styles.heroSection}>
        <h1>Premium Supplies for Exceptional Dogs.</h1>
        <p>Curated products chosen for safety, performance, and your dog’s long-term success.</p>
        <Link className={styles.button}>SHOP NOW</Link>
      </section>
    </>
  );
}

export default HomePage;
