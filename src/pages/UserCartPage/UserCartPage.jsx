import { useState, useEffect } from "react";
import useFetchProducts from "../../hooks/useFetchProducts.js";
import styles from "./UserCartPage.module.css";
import { useOutletContext } from "react-router";
import { Link } from "react-router";
import { IoClose } from "react-icons/io5";
import { TailSpin } from "react-loader-spinner";
import CartProductItem from "../../components/ui/CartProductItem/CartProductItem.jsx";
import AboutUs from "../../components/ui/AboutUs/AboutUs.jsx";
function UserCartPage() {
  const [userCartProducts, handleCartUpdate] = useOutletContext();
  const { loadingState, storeProductsData, error } = useFetchProducts();

  if (error) throw error;
  let cartTotal = 0;
  let cartTotalWithShipping;
  const getCartTotals = (storeProductsData) => {
    userCartProducts.forEach((userCartProduct) => {
      const cartProductItemIndex = storeProductsData.findIndex((product) => Number(product["_id"]) === Number(userCartProduct.id));
      const userCartProductQuantity = Number(userCartProduct.quantity);
      cartTotal = cartTotal + Number(storeProductsData[cartProductItemIndex].price) * userCartProductQuantity;
    });
    cartTotalWithShipping = cartTotal + 10;
  };

  if (storeProductsData) getCartTotals(storeProductsData);

  const getCartProductItemDetails = (cartProductItemId, storeProductsData) => {
    const cartProductItemIndex = storeProductsData.findIndex((product) => Number(product["_id"]) === Number(cartProductItemId));

    return {
      cartProductItemId: cartProductItemId,
      cartProductItemImage: storeProductsData[cartProductItemIndex].image,
      cartProductItemName: storeProductsData[cartProductItemIndex].title,
      cartProductItemCategory: storeProductsData[cartProductItemIndex].category,
      cartProductItemPrice: storeProductsData[cartProductItemIndex].price,
    };
  };

  if (userCartProducts.length === 0) {
    return (
      <div className={styles.emptyCartContentWrapper}>
        <div className={styles.emptyCartContent}>
          <h1>Your Cart Is Empty.</h1>
          <Link to="/shop/all" className={styles.button} aria-label="Shop All Page">
            SHOP NOW
          </Link>
        </div>
      </div>
    );
  }
  let userCartProductItems;
  if (storeProductsData) {
    userCartProductItems = userCartProducts.map((userCartProductItem, index) => {
      const cartProduct = getCartProductItemDetails(userCartProductItem.id, storeProductsData);
      return (
        <CartProductItem
          key={userCartProductItem.id}
          cartProductItemDetails={cartProduct}
          cartProductItemQuantity={userCartProductItem.quantity}
          userCartProducts={userCartProducts}
          handleCartUpdate={handleCartUpdate}
        />
      );
    });
  }

  return (
    <>
      {!loadingState ? (
        <>
          <div className={styles.userCartPage}>
            <div className={styles.userCartPageHeadingWrapper}>
              <h1>My Cart</h1>
            </div>
            <div className={styles.cartProductItems}>{userCartProductItems}</div>
            <div className={styles.userCartDetails}>
              <span>{`Subtotal: $${cartTotal}`}</span>
              <span>{`Shipping: $10`}</span>
              <div className={styles.cartTotalDivider}></div>
              <span className={styles.cartTotal}>{`Total: $${cartTotalWithShipping}`}</span>
              <button onClick={() => window.location.reload()} type="button" className={styles.button}>
                Proceed To Cart Summary
              </button>
            </div>
          </div>
          <AboutUs />
        </>
      ) : (
        <div className={styles.cartLoading}>
          <TailSpin color="#196bc1" />
        </div>
      )}
    </>
  );
}

export default UserCartPage;
