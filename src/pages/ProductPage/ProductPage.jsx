import styles from "./ProductPage.module.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import useFetchProduct from "../../hooks/useFetchProduct";
import { useOutletContext, useParams } from "react-router";
import ProductQuantitySelector from "../../components/ui/ProductQuantitySelector/ProductQuantitySelector.jsx";
import UserCartModal from "../../components/ui/UserCartModal/UserCartModal.jsx";
import { useEffect, useState } from "react";

function ProductPage({ productQuantity }) {
  const [displayAddedToCartPopup, setDisplayAddedToCartPopup] = useState(false);

  useEffect(() => {
    const removeAddedToCartPopup = setTimeout(() => {
      setDisplayAddedToCartPopup(false);
    }, 6000);
    return () => clearTimeout(removeAddedToCartPopup);
  }, [displayAddedToCartPopup]);
  const { productId } = useParams();

  const [userCartProducts, handleCartUpdate] = useOutletContext();
  const { loadingState, productData, error } = useFetchProduct(productId);

  let productCategory;
  let productPrice;

  if (productData) {
    productCategory = productData.category.charAt(0).toUpperCase() + productData.category.slice(1);
    productPrice = productData.price.toFixed(2);
  }

  let productQuantityButton;

  if (productData) {
    let productIndexInCart;
    if (userCartProducts.length > 0) {
      productIndexInCart = userCartProducts.findIndex((product) => product.productId === Number(productId));
      productQuantityButton =
        productIndexInCart > -1 ? (
          <ProductQuantitySelector productQuantity={1} />
        ) : (
          <button
            type=""
            className={styles.button}
            aria-label={`Add ${productData.title} To Cart`}
            onClick={() => {
              setDisplayAddedToCartPopup(true);
            }}
          >
            Add To Cart
          </button>
        );
    } else {
      productQuantityButton = (
        <button
          type="button"
          className={styles.button}
          aria-label={`Add ${productData.title} To Cart`}
          onClick={() => {
            setDisplayAddedToCartPopup(true);
          }}
        >
          Add To Cart
        </button>
      );
    }
  }

  function checkProductQuantity() {}

  return (
    <>
      {/* <UserCartModal /> */}
      <main className={styles.productSectionWrapper}>
        <div className={styles.productSectionDesktop}>
          <div className={styles.productSectionImage}>{!loadingState ? <img src={productData.image} alt={productData.title} /> : <Skeleton height={415} width={400} />}</div>
          <div className={styles.productDetails}>
            <h3>{!loadingState ? productCategory : <Skeleton height={25} width={350} />}</h3>
            <h1>{!loadingState ? productData.title : <Skeleton height={25} width={350} />}</h1>
            <h2>{!loadingState ? `$${productPrice}` : <Skeleton height={25} width={350} />}</h2>
            <p>{!loadingState ? productData.description : <Skeleton height={75} width={350} />}</p>
            <div className={styles.productButtonWrapper}>{!loadingState && productQuantityButton}</div>
          </div>
        </div>
        <div className={styles.productSectionMobile}>
          <div className={styles.productDetails}>
            <h3>{!loadingState ? productCategory : <Skeleton height={25} width={350} />}</h3>
            <h1>{!loadingState ? productData.title : <Skeleton height={25} width={350} />}</h1>
            <h2>{!loadingState ? `$${productData.price.toFixed(2)}` : <Skeleton height={25} width={350} />}</h2>
          </div>
          {!loadingState ? <img src={productData.image} alt={productData.title} /> : <Skeleton height={415} width={400} />}
          <div className={styles.productDetails}>
            <p>{!loadingState ? productData.description : <Skeleton height={75} width={350} />}</p>
          </div>
        </div>
        {displayAddedToCartPopup && <AddToCartPopUp />}
      </main>
    </>
  );
}

function AddToCartPopUp() {
  return <span className={styles.addToCartPopUp}> Added To Cart ✅</span>;
}

export default ProductPage;
