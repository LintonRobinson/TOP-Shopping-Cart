import { useEffect } from "react";
import { useState } from "react";

function useFetchProduct(productId) {
  const [loadingState, setLoadingState] = useState(true);
  const [productData, setProductData] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
        if (!response.ok) {
          throw Error("Network response was not ok");
        }
        const fetchedProductData = await response.json();
        setProductData(fetchedProductData);
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
