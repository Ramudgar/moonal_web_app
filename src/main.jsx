import { createRoot } from "react-dom/client";
import "remixicon/fonts/remixicon.css";
import "./index.css";

import AdminLayout from "./Pages/Admin/AdminLayout.jsx";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./store/store.js";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    {/* <App /> */}
    <AdminLayout />
  </Provider>
);
