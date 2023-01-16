import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App";
// import './index.css'
import "semantic-ui-css/semantic.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home";
import SignInPage from "./Pages/SignIn";
// import ErrorPage from "./Pages/Error";

const checkLocalStorage = localStorage.getItem("id_login");

const router = createBrowserRouter([
  {
    path: "/",
    element: checkLocalStorage == undefined ? <SignInPage /> : <Home />,
  },
  {
    path: "/sign-in",
    element: <SignInPage />,
    // errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
