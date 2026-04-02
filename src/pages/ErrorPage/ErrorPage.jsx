import styles from "./ErrorPage.module.css";
import { useNavigate } from "react-router";
function ErrorPage() {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <main className={styles.errorPage}>
      <h1>Something went wrong.</h1>
      <p>We couldn't complete your request. Please try again, or come back later.</p>
      <button onClick={handleGoBack} type="button">
        Go Back
      </button>
    </main>
  );
}

export default ErrorPage;
