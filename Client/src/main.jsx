import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { Toaster } from "./components/ui/toaster.jsx";
import { AuthProvider } from "./components/common/Helper/context.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "@fontsource/ubuntu";
import "@fontsource/exo-2";
import config from "./store/config.js";

createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={config.CLIENT_ID}>
    <BrowserRouter>
      <Provider store={store}>
        <AuthProvider>
          <App />
          <Toaster />
        </AuthProvider>
      </Provider>
    </BrowserRouter>
  </GoogleOAuthProvider>
);
