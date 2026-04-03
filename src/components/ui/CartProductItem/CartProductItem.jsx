import styles from "./CartProductItem.module.css";

import ProductQuantitySelector from "../ProductQuantitySelector/ProductQuantitySelector.jsx";
import useChangeProductQuantity from "../../../hooks/useChangeProductQuantity.js";
import { TailSpin } from "react-loader-spinner";
import "react-loading-skeleton/dist/skeleton.css";
function CartProductItem({ cartProductItemDetails, cartProductItemQuantity, handleCartUpdate, userCartProducts }) {
  const { loadingState, error, changeProductQuantity, setError } = useChangeProductQuantity(userCartProducts, cartProductItemDetails.cartProductItemId);
  if (error) throw error;
  const productCategory = cartProductItemDetails.cartProductItemCategory.charAt(0).toUpperCase() + cartProductItemDetails.cartProductItemCategory.slice(1);

  const handleRemoveProductFromCart = async () => {
    const updatedUserCart = await changeProductQuantity(0);
    if (updatedUserCart === userCartProducts) {
      setError(true);
    } else {
      handleCartUpdate(updatedUserCart);
    }
  };

  return (
    <div className={styles.cartProductItem}>
      <div className={styles.cartProductItemLeft}>
        <img src={cartProductItemDetails.cartProductItemImage} alt={cartProductItemDetails.cartProductItemName} />
        <div className={styles.cartProductTextDetails}>
          <span className={styles.cartProductTitle}>{cartProductItemDetails.cartProductItemName}</span>
          <span className={styles.cartProductCategory}>{productCategory}</span>
          <span>{`$${cartProductItemDetails.cartProductItemPrice.toFixed(2)}`}</span>
        </div>
      </div>
      <div className={styles.cartItemButtonWrapper}>
        <ProductQuantitySelector
          className={styles.productQuantitySelector}
          productQuantity={cartProductItemQuantity}
          userCartProducts={userCartProducts}
          handleCartUpdate={handleCartUpdate}
          productId={cartProductItemDetails.cartProductItemId}
          productTitle={cartProductItemDetails.cartProductItemName}
        />
        {!loadingState ? (
          <button onClick={handleRemoveProductFromCart} className={styles.removeProductFromCartButton} type="button" aria-label={`Remove ${cartProductItemDetails.cartProductItemName} From Cart`}>
            Remove From Cart
          </button>
        ) : (
          <div className={styles.loadingRemoveCartProducItem}>
            <TailSpin height={38} color="#196bc1" />
          </div>
        )}
      </div>
    </div>
  );
}

export default CartProductItem;
