import { useEffect } from "react";
import { useState } from "react";

function useFetchProduct(productId) {
  const [loadingState, setLoadingState] = useState(true);
  const [productData, setProductData] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch(`https://fakestoreapiserver.reactbd.org/api/products`);
        if (!response.ok) {
          throw Error("Network response was not ok");
        }
        const fetchedProductsData = await response.json();
        const productIndexFromId = fetchedProductsData.data.findIndex((product) => Number(product["_id"]) === productId);
        setProductData(fetchedProductsData.data[productIndexFromId]);
      } catch (error) {
        setError(error);
        setLoadingState(false);
      } finally {
        setLoadingState(false);
      }
    };
    fetchProductData();
  }, []);
  return { loadingState, productData, error };
}

export default useFetchProduct;
