import styles from "./AboutUs.module.css";
import dogsDowntownEntrance from "../../../assets/images/dogs-downtown-front-entrance.webp";

function AboutUs() {
  return (
    <div className={styles.aboutUs}>
      <h3>About Dogs Downtown</h3>
      <p>We believe the things you use every day should be made with care. Every product in our store is selected for its craftsmanship, durability, and timeless design.</p>
      <img src={dogsDowntownEntrance} alt="Dogs Downtown Entrance" />
      <span className={styles.aboutUsQuote}>Better days start here — for every dog, every family.</span>
    </div>
  );
}

export default AboutUs;
