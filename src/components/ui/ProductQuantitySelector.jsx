import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
function ProductQuantitySelector({ productQuantity, handleQuantityUpdate }) {
  const [quantity, setQuantity] = useState(productQuantity);
  const handleDecrementing = () => {
    setQuantity((previousQuantity) => previousQuantity - 1);
    handleQuantityUpdate(quantity);
  };

  const handleIncrementing = () => {
    setQuantity((previousQuantity) => previousQuantity + 1);
    handleQuantityUpdate(quantity);
  };

  return (
    <div>
      <button aria-label="Decrementing Button" onClick={handleDecrementing}>
        <FaMinus />
      </button>
      <span>{quantity}</span>
      <button aria-label="Incrementing Button" onClick={handleIncrementing}>
        <FaPlus />
      </button>
    </div>
  );
}

export default ProductQuantitySelector;
