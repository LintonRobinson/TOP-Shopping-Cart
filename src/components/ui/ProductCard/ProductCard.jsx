import styles from "./ProductCard.module.css";
import { Link, useParams } from "react-router";
function ProductCard({ productData, productCategory }) {
  return (
    <Link to={`/shop/${productCategory}/${productData["_id"]}`} className={styles.productCard}>
      <img src={productData.image} alt={productData.title} />
      <span className={styles.productCardTitle}>{productData.title}</span>
      <span className={styles.productCardCategory}>{productData.category}</span>
      <span className={styles.productCardPrice}>{`$${productData.price}`}</span>
    </Link>
  );
}

export default ProductCard;
