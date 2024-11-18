import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./variables.css";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { ToastContainer } from "react-toast";
import { persistor, store } from "./lib/store";
import { Spin } from "antd";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
    <Provider store={store}>
      <PersistGate loading={<Spin />} persistor={persistor}>
        <ToastContainer delay={1500} />
      </PersistGate>
    </Provider>
  </StrictMode>
);
