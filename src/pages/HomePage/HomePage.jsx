import styles from "./HomePage.module.css";
import { Link } from "react-router";
function HomePage() {
  return (
    <>
      <section className={styles.heroSection}>
        <h1>Premium Supplies for Exceptional Dogs.</h1>
        <p>Curated products chosen for safety, performance, and your dog’s long-term success.</p>
        <Link className={styles.button} aria-label="Shop All Page">
          SHOP NOW
        </Link>
      </section>
      <section className={styles.valuePropSection}>
        <h2>Quality over quantity.</h2>
        <p>We believe the things you use every day should be made with care. Every product in our store is selected for its craftsmanship, durability, and timeless design.</p>
      </section>
      <section>
        <Link aria-label="Shop Training Page">Shop Training</Link>
        <Link aria-label="Shop All Page">Shop Training</Link>
      </section>
    </>
  );
}

export default HomePage;
