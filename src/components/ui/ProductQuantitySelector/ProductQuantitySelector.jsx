import styles from "./ProductQuantitySelector.module.css";
import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { ProgressBar } from "react-loader-spinner";
import useChangeProductQuantity from "../../../hooks/useChangeProductQuantity.js";
function ProductQuantitySelector({ productId, productTitle, handleCartUpdate, userCartProducts, productQuantity }) {
  const [quantity, setQuantity] = useState(productQuantity);

  const { loadingState, error, changeProductQuantity, setError } = useChangeProductQuantity(userCartProducts, productId);
  const [displayAddedToCartPopup, setDisplayAddedToCartPopup] = useState(false);

  useEffect(() => {
    const removeAddedToCartPopup = setTimeout(() => {
      setDisplayAddedToCartPopup(false);
    }, 6000);
    return () => clearTimeout(removeAddedToCartPopup);
  }, [displayAddedToCartPopup]);

  const handleDecrementing = async () => {
    const updatedUserCart = await changeProductQuantity(quantity - 1);
    if (updatedUserCart === userCartProducts) {
      setError(true);
    } else {
      handleCartUpdate(updatedUserCart);

      setQuantity((previousQuantity) => previousQuantity - 1);
    }
  };

  const handleIncrementing = async () => {
    const updatedUserCart = await changeProductQuantity(quantity + 1);
    if (updatedUserCart === userCartProducts) {
      setError(true);
    } else {
      handleCartUpdate(updatedUserCart);

      setQuantity((previousQuantity) => previousQuantity + 1);
    }
  };

  if (error) {
    return (
      <button className={styles.errorButton} onClick={() => setError(false)} aria-label="Something went wrong. Try again">
        Something went wrong. Try again
      </button>
    );
  }

  if (quantity === 0) {
    return (
      <>
        {!loadingState ? (
          <button
            type="button"
            className={styles.button}
            aria-label={`Add ${productTitle} To Cart`}
            onClick={async () => {
              const updatedUserCart = await changeProductQuantity(1);
              if (updatedUserCart === userCartProducts) {
                setError(true);
              } else {
                handleCartUpdate(updatedUserCart);
                setDisplayAddedToCartPopup(true);
                setQuantity(1);
              }
            }}
          >
            Add To Cart
          </button>
        ) : (
          <ProgressBar barColor="#196bc1" borderColor="#000000" height={38} />
        )}
      </>
    );
  }

  return (
    <>
      {!loadingState ? (
        <div className={styles.ProductQuantitySelector}>
          <button className={`${styles.quantityButton} ${styles.quantityButtonLeft}`} aria-label="Decrementing Button" onClick={handleDecrementing}>
            <FaMinus />
          </button>
          <span aria-label="Product quantity">{quantity}</span>
          <button className={`${styles.quantityButton} ${styles.quantityButtonRight}`} aria-label="Incrementing Button" onClick={handleIncrementing}>
            <FaPlus />
          </button>
        </div>
      ) : (
        <ProgressBar barColor="#196bc1" borderColor="#000000" height={38} />
      )}

      {displayAddedToCartPopup && <AddToCartPopUp />}
    </>
  );
}
function AddToCartPopUp() {
  return <span className={styles.addToCartPopUp}> Added To Cart ✅</span>;
}

export default ProductQuantitySelector;
