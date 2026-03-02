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
        <h2>Everything your dog needs—picked with care.</h2>
        <p>High-quality essentials, treats, and gear for city pups (and the people who love them). Easy to shop. Fast to grab. Worth it.</p>
      </section>
      <section className={styles.collectionCardSection}>
        <Link aria-label="Shop Training Page" className={styles.collectionCard}>
          <span>Shop Training</span>
        </Link>
        <Link aria-label="Shop All Page" className={styles.collectionCard}>
          <span>Shop Training</span>
        </Link>
      </section>
    </>
  );
}

export default HomePage;
