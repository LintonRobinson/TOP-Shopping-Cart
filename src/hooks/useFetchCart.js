import { useEffect, useState } from "react";

function useFetchCart() {
  const [userCartData, setUserCartData] = useState(null);
  const [loadingState, setLoadingState] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchUserCart = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/carts/1`);
        if (!response.ok) {
          throw Error("Network response was not ok");
        }
        const fetchedCartData = await response.json();
        setUserCartData(fetchedCartData);
        setLoadingState(false);
      } catch (err) {
        setError(err);
        setLoadingState(false);
      } finally {
        setLoadingState(false);
      }
    };
    fetchUserCart();
  }, []);
  return { loadingState, userCartData, error };
}

export default useFetchCart;
