import styles from "./ProductSearchBar.module.css";
import useFetchProducts from "../../../hooks/useFetchProducts";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Link } from "react-router";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";

function ProductSearchBar() {
  const { loadingState, storeProductsData, error } = useFetchProducts();
  const [searchQuery, setSearchQuery] = useState("");
  const [displayMobileSearchBar, setDisplayMobileSearchBar] = useState(false);
  if (searchQuery && error) {
    return (
      <>
        <div className={styles.desktopSearchBarWrapper} aria-label="Desktop Product Search Bar">
          <div className={styles.desktopSearchBar}>
            <input
              className={styles.searchBarInput}
              type="text"
              aria-label="Product Search Bar Text Entry"
              placeholder="Search Products"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FaMagnifyingGlass />
          </div>
          <div className={`${styles.loadingThreeDots} ${styles.searchResultsLoading}`}>
            <h1>Something Went Wrong.</h1>
            <button className={styles.tryAgainButton} onClick={() => window.location.reload()}>
              Refresh and Try Again
            </button>
          </div>
        </div>
        <div className={styles.mobileSearchBarWrapper}>
          <div className={`${styles.loadingThreeDots} ${styles.searchResultsLoadingMobile}`} aria-label="Mobile Product Search Bar">
            <h1>Something Went Wrong.</h1>
            <button className={styles.tryAgainButton} onClick={() => window.location.reload()}>
              Refresh and Try Again
            </button>
          </div>
        </div>
      </>
    );
  }

  let matchedQueryProducts;

  let searchResultProductItems;
  if (storeProductsData && searchQuery) {
    matchedQueryProducts = storeProductsData.filter((product) => {
      const normalizedProductTitle = product.title.replaceAll(" ", "").toLowerCase();
      const normalizedSearchQuery = searchQuery.replaceAll(" ", "").toLowerCase();
      return normalizedProductTitle.startsWith(normalizedSearchQuery);
    });
    searchResultProductItems = matchedQueryProducts.map((matchedQueryProduct) => (
      <SearchProductItem
        key={matchedQueryProduct["_id"]}
        productImage={matchedQueryProduct.image}
        productTitle={matchedQueryProduct.title}
        productCategory={matchedQueryProduct.category}
        productPrice={matchedQueryProduct.price}
        productId={matchedQueryProduct["_id"]}
        setSearchQuery={setSearchQuery}
      />
    ));
  }

  if (storeProductsData) {
    if (matchedQueryProducts?.length === 0) {
      return (
        <>
          <div className={styles.desktopSearchBarWrapper} aria-label="Desktop Product Search Bar">
            <div className={styles.desktopSearchBar}>
              <input
                className={styles.searchBarInput}
                type="text"
                aria-label="Product Search Bar Text Entry"
                placeholder="Search Products"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <FaMagnifyingGlass />
            </div>
            <div className={`${styles.loadingThreeDots} ${styles.searchResultsLoading}`}>
              <h1>No Products Found!</h1>
            </div>
          </div>
          <div className={styles.mobileSearchBarWrapper}>
            {displayMobileSearchBar ? (
              <>
                <div className={styles.searchResultsLoadingMobile} aria-label="Mobile Product Search Bar">
                  <div className={styles.searchBarInputMobile}>
                    <FaMagnifyingGlass />
                    <input type="text" aria-label="Product Search Bar Text Entry" placeholder="Search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                  </div>
                  <button
                    onClick={() => {
                      setDisplayMobileSearchBar(false);
                      setSearchQuery("");
                    }}
                  >
                    Cancel Search
                  </button>
                </div>
                <div className={`${styles.loadingThreeDots} ${styles.searchResultsLoading}`}>
                  <h1>No Products Found!</h1>
                </div>
              </>
            ) : (
              <FaMagnifyingGlass onClick={() => setDisplayMobileSearchBar(true)} />
            )}
          </div>
        </>
      );
    }
  }

  return (
    <>
      <div className={styles.desktopSearchBarWrapper} aria-label="Desktop Product Search Bar">
        <div className={styles.desktopSearchBar}>
          <input
            className={styles.searchBarInput}
            type="text"
            aria-label="Product Search Bar Text Entry"
            placeholder="Search Products"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FaMagnifyingGlass />
        </div>
        {searchQuery &&
          (loadingState ? (
            <div className={`${styles.loadingThreeDots} ${styles.searchResultsLoading}`}>
              <ThreeDots color="#196bc1" />
            </div>
          ) : (
            <div className={styles.searchResults}>
              <div className={styles.searchResultsHeading}>
                <span>Search Results</span>
                <span>{`${matchedQueryProducts.length} Products`}</span>
              </div>
              <div className={styles.searchResultItems}>{searchResultProductItems}</div>
            </div>
          ))}
      </div>
      <div className={styles.mobileSearchBarWrapper}>
        {displayMobileSearchBar ? (
          <>
            <div className={styles.searchResultsLoadingMobile} aria-label="Mobile Product Search Bar">
              <div className={styles.searchBarInputMobile}>
                <FaMagnifyingGlass />
                <input type="text" aria-label="Product Search Bar Text Entry" placeholder="Search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
              </div>
              <button
                aria-label="Cancel Search Button"
                onClick={() => {
                  setDisplayMobileSearchBar(false);
                  setSearchQuery("");
                }}
              >
                Cancel Search
              </button>
            </div>
            {searchQuery &&
              (loadingState ? (
                <div className={`${styles.loadingThreeDots} ${styles.searchResultsLoading}`}>
                  <ThreeDots color="#196bc1" />
                </div>
              ) : (
                <div className={styles.searchResults}>
                  <div className={styles.searchResultsHeading}>
                    <span>Search Results</span>
                    <span>{`${matchedQueryProducts.length} Products`}</span>
                  </div>
                  <div className={styles.searchResultItems}>{searchResultProductItems}</div>
                </div>
              ))}
          </>
        ) : (
          <button onClick={() => setDisplayMobileSearchBar(true)} aria-label="Show Mobile Search Bar">
            <FaMagnifyingGlass />
          </button>
        )}
      </div>
    </>
  );
}

function SearchProductItem({ productImage, productTitle, productCategory, productPrice, productId, setSearchQuery }) {
  const productCategoryCapitalized = productCategory.charAt(0).toUpperCase() + productCategory.slice(1);
  return (
    <Link to={`/shop/all/${productId}`} className={styles.searchProductItem} onClick={() => setSearchQuery("")}>
      <img src={productImage} alt="" />
      <span>{productTitle}</span>
      <span>{productCategoryCapitalized}</span>
      <span>{`$${productPrice.toFixed(2)}`}</span>
    </Link>
  );
}

export default ProductSearchBar;
