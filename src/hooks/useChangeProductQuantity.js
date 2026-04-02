import { useEffect, useState } from "react";

function useChangeProductQuantity(previousCartProducts, updatedProductId) {
  const [loadingState, setLoadingState] = useState(false);
  const [error, setError] = useState(false);

  const changeProductQuantity = async (updatedProductQuantity) => {
    setLoadingState(true);
    const newUserCartProducts = structuredClone(previousCartProducts);
    let productIndexFromId;
    productIndexFromId = newUserCartProducts.findIndex((product) => product.id === Number(updatedProductId));

    if (productIndexFromId !== -1) {
      newUserCartProducts[productIndexFromId].quantity = updatedProductQuantity;
    } else {
      newUserCartProducts.push({ id: updatedProductId, quantity: updatedProductQuantity });
    }

    if (productIndexFromId !== -1 && newUserCartProducts[productIndexFromId].quantity === 0) newUserCartProducts.splice(productIndexFromId, 1);
    try {
      const response = await fetch("https://dummyjson.com/carts/1", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          products: newUserCartProducts,
        }),
      });

      if (!response.ok) {
        //setError(true);
        setLoadingState(false);
        return previousCartProducts;
      }
      const fetchedResponse = await response.json();
      setLoadingState(false);
      return fetchedResponse;
    } catch (error) {
      //setError(true);
      setLoadingState(false);
      return previousCartProducts;
    }
  };

  return { changeProductQuantity, loadingState, error, setError };
}

export default useChangeProductQuantity;
