function ProductCard({ cartProductData }) {
  return (
    <div>
      <img src={cartProductData.image} alt={cartProductData.title} />
      <span>{cartProductData.title}</span>
      <span>{cartProductData.category}</span>
      <span>{cartProductData.price}</span>
    </div>
  );
}

export default ProductCard;
