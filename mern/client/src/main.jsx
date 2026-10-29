import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Home from "./interfaces/pages/Home";
import Learn from "./interfaces/pages/Learn";
import Manage from "./interfaces/pages/Manage";
import ModuleComplete from "./interfaces/pages/ModuleComplete";
import "./styles/index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "learn", element: <Learn /> },
      { path: "manage", element: <Manage /> },
      { path: "module-complete", element: <ModuleComplete /> },
      // add new pages here, e.g. { path: "about", element: <About /> }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);