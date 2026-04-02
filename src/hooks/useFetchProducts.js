import { useEffect, useState } from "react";
function useFetchProducts() {
  const [storeProductsData, setStoreProductsData] = useState(null);
  const [loadingState, setLoadingState] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        const response = await fetch("https://fakestoreapiserver.reactbd.org/api/products");
        if (!response.ok) {
          throw Error("Network error: Something went wrong");
        }
        const fetchedStoreProductsData = await response.json();
        setStoreProductsData(fetchedStoreProductsData.data);
        setLoadingState(false);
      } catch (err) {
        setError(err);
      } finally {
        setLoadingState(false);
      }
    };
    fetchProductsData();
  }, []);
  return { loadingState, storeProductsData, error };
}

export default useFetchProducts;
