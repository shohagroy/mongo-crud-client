import { createBrowserRouter } from "react-router-dom";
import ItemsAdd from "../Components/ItemsAdd";
import Main from "../Components/Main";
import Purchase from "../Components/Purchase";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/items",
        element: <ItemsAdd />,
        loader: () => fetch("http://localhost:5000/items"),
      },
      { path: "/purchase", element: <Purchase /> },
    ],
  },
]);
