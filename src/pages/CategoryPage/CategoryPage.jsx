import styles from "./CategoryPage.module.css";
import useFetchProducts from "../../hooks/useFetchProducts";
import ProductCard from "../../components/ui/ProductCard/ProductCard.jsx";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useParams } from "react-router";

function ProductCardSkeleton() {
  return (
    <div>
      <Skeleton height={142} />
      <Skeleton count={2} />
    </div>
  );
}

function CategoryPage() {
  const { loadingState, storeProductsData, error } = useFetchProducts();
  const { category } = useParams();

  let categoryTitle;
  let categoryProductsData;
  // Filter Products or Set Default Title
  if (storeProductsData !== null && category !== "all") {
    categoryProductsData = storeProductsData.filter((productData) => productData.category === category);
    categoryTitle = category.charAt(0).toUpperCase() + category.slice(1);
  } else if (storeProductsData) {
    categoryTitle = "All Products";
    categoryProductsData = storeProductsData;
  }

  if (storeProductsData) {
    categoryProductsData = categoryProductsData.map((productData) => ({
      ...productData,
      category: productData.category.charAt(0).toUpperCase() + productData.category.slice(1),
    }));
  }

  const getNumberOfProducts = (productsData) => {
    return productsData.length;
  };

  return (
    <main>
      <section className={styles.headingSection}>
        <h1>{categoryTitle}</h1>
        <span>{!loadingState ? `${getNumberOfProducts(categoryProductsData)} Products` : <Skeleton count={1} height={20} />}</span>
      </section>
      <section className={styles.productCardsSection}>
        {!loadingState
          ? categoryProductsData.map((storeProduct) => <ProductCard className={styles.productCard} key={storeProduct.id} cartProductData={storeProduct} />)
          : Array.from({ length: 20 }).map((_, index) => <ProductCardSkeleton key={index} />)}
      </section>
    </main>
  );
}

export default CategoryPage;
