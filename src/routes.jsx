import App from "./App";
import HomePage from "./pages/HomePage/HomePage.jsx";
import CategoryPage from "./pages/CategoryPage/CategoryPage.jsx";
import ProductPage from "./pages/ProductPage/ProductPage.jsx";
import UserCartPage from "./pages/UserCartPage/UserCartPage.jsx";
import ErrorPage from "./pages/ErrorPage/ErrorPage.jsx";
import { Navigate } from "react-router";
const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/shop",
        element: <Navigate to="/shop/all" />,
        children: [],
      },
      {
        path: "/shop/:category",
        element: <CategoryPage />,
        children: [],
      },
      {
        path: "/shop/:category/:productId",
        element: <ProductPage />,
      },
      {
        path: "/cart",
        element: <UserCartPage />,
        children: [],
      },
    ],
  },
];
export default routes;
