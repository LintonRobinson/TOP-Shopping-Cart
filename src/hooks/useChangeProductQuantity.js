import { useEffect, useState } from "react";
useEffect;

function useChangeProductQuantity(previousCart, updatedProductId, updatedProductQuantity) {
  const [loadingState, setLoadingState] = useState(true);
  const [updatedUserCart, setUpdatedUserCart] = useState(null);
  const [error, setError] = useState(null);
  const previousUserCart = structuredClone(previousCart);

  const productIndexFromId = previousUserCart.products.findIndex((product) => product.productId === updatedProductId);

  previousUserCart.products[productIndexFromId].quantity = updatedProductQuantity;
  useEffect(() => {
    const updateUserCart = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/carts/1", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(previousUserCart),
        });

        if (!response.ok) {
          throw Error("handles a failed PUT request");
        }

        const fetchedResponse = await response.json();
        setUpdatedUserCart(fetchedResponse);
        setLoadingState(false);
      } catch (error) {
        setError(error);
        setLoadingState(false);
      } finally {
        setLoadingState(false);
      }
    };

    updateUserCart();
  }, []);
  return { loadingState, updatedUserCart, error };
}

export default useChangeProductQuantity;
