import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ViewRecipie from "./pages/ViewRecipe.jsx";
import { Favorites } from "./pages/Favorites.jsx";
import { BookMark } from "./pages/BookMark.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: (
      <div className="error text-3xl">
        404 <br />
        page not found
      </div>
    ),
  },
  {
    path: "/details/:mealID",
    element: <ViewRecipie />,
  },
  {
    path: "/favorites",
    element: <Favorites />,
  },
  {
    path: "/bookmark",
    element: <BookMark />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
