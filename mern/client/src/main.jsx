import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Learn from "./pages/Learn";
import Manage from "./pages/Manage";
import ModuleComplete from "./pages/ModuleComplete";
import "./index.css";

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