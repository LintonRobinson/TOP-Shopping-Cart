import styles from "./CategoryPage.module.css";
import useFetchProducts from "../../hooks/useFetchProducts";
import ProductCard from "../../components/ui/ProductCard/ProductCard.jsx";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function CategoryPage({ currentCategory = "All Products" }) {
  const { loadingState, storeProductsData, error } = useFetchProducts();

  const getNumberOfProducts = (productsData) => {
    return productsData.length;
  };
  return (
    <div>
      <div>
        <h1>{currentCategory}</h1>
        <span>{!loadingState ? `${getNumberOfProducts(storeProductsData)} Products` : <Skeleton count={1} />}</span>
      </div>
      <div>{!loadingState ? storeProductsData.map((storeProduct) => <ProductCard className={styles.productCard} key={storeProduct.id} cartProductData={storeProduct} />) : <Skeleton count={4} />}</div>
    </div>
  );
}

export default CategoryPage;
