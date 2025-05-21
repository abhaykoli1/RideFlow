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
import TagManager from "react-gtm-module";
import Logo from "./assets/logo/rideFlowLargeLight2.png";
const tagManagerArgs = {
  gtmId: "GTM-T7CNNBTW", // Your GTM ID here
};

TagManager.initialize(tagManagerArgs);

createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={config.CLIENT_ID}>
    <BrowserRouter>
      <Provider store={store}>
        <AuthProvider>
          <div className="min-h-screen flex place-content-center items-center text-3xl font-bold text-white bg-gradient-to-r from-[#222] to-[#111]">
            <img src={Logo} alt="Logo" className="h-16 w-auto mr-2" />
          </div>
          {/* <App /> */}
          <Toaster />
        </AuthProvider>
      </Provider>
    </BrowserRouter>
  </GoogleOAuthProvider>
);
