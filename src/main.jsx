import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./component/Navbar/Login.jsx";
import Registration from "./component/Navbar/Registration.jsx";
import AuthProvider from "./component/AuthProvider/AuthProvider.jsx";
import Products from "./component/Products/Products.jsx";
import PrivateRoute from "./component/PrivateRoute/PrivateRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "register",
        element: <Registration />,
      },
      {
        path: "products",
        element: (
          <PrivateRoute>
            <Products />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
