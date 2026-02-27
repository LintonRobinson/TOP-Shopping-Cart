import App from "./App";
import HomePage from "./pages/HomePage/HomePage.jsx";
const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,

        // errorElement: <ErrorPage />,
      },
    ],
    // errorElement: <ErrorPage />,
  },
];
export default routes;
