import styles from "./ProductPage.module.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import useFetchProduct from "../../hooks/useFetchProduct";
import { useOutletContext, useParams } from "react-router";
import ProductQuantitySelector from "../../components/ui/ProductQuantitySelector/ProductQuantitySelector.jsx";
import { useEffect, useState } from "react";
import AboutUs from "../../components/ui/AboutUs/AboutUs.jsx";

function ProductPage() {
  const { productId } = useParams();
  const [userCartProducts, handleCartUpdate] = useOutletContext();
  const { loadingState, productData, error } = useFetchProduct(Number(productId));

  let productCategory;
  let productPrice;

  if (productData) {
    productCategory = productData.category.charAt(0).toUpperCase() + productData.category.slice(1);
    productPrice = productData.price.toFixed(2);
  }

  let productIndexInCart;
  let productQuantity = 0;
  if (userCartProducts.length > 0) {
    productIndexInCart = userCartProducts.findIndex((product) => {
      return product.id === Number(productId);
    });
    if (productIndexInCart > -1) {
      productQuantity = userCartProducts[productIndexInCart].quantity;
    }
  }

  return (
    <>
      <main className={styles.productSectionWrapper}>
        <div className={styles.productSectionDesktop}>
          <div className={styles.productSectionImage}>{!loadingState ? <img src={productData.image} alt={productData.title} /> : <Skeleton height={415} width={400} />}</div>
          <div className={styles.productDetails}>
            <h3>{!loadingState ? productCategory : <Skeleton height={25} width={350} />}</h3>
            <h1>{!loadingState ? productData.title : <Skeleton height={25} width={350} />}</h1>
            <h2>{!loadingState ? `$${productPrice}` : <Skeleton height={25} width={350} />}</h2>
            <p>{!loadingState ? productData.description : <Skeleton height={75} width={350} />}</p>
            <div className={styles.productButtonWrapper}>
              {!loadingState && (
                <ProductQuantitySelector
                  userCartProducts={userCartProducts}
                  handleCartUpdate={handleCartUpdate}
                  productQuantity={productQuantity}
                  productId={productId}
                  productTitle={productData.title}
                />
              )}
            </div>
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
          <div className={styles.productButtonWrapper}>
            {!loadingState && (
              <ProductQuantitySelector
                userCartProducts={userCartProducts}
                handleCartUpdate={handleCartUpdate}
                productQuantity={productQuantity}
                productId={productId}
                productTitle={productData.title}
              />
            )}
          </div>
        </div>
      </main>
      <AboutUs />
    </>
  );
}

export default ProductPage;
