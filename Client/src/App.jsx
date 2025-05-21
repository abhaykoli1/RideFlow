import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./store/auth-slice";
import AuthLayout from "./components/authCompo/layout";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
import AdminLayout from "./components/admin-view/layout";
import AdminDashboard from "./pages/admin-view/AdminDashboard";
import CheckAuth from "./components/common/check-auth";
import UnauthPage from "./pages/unauth-page";
import ShopLayout from "./components/User-view/userLayout";
import UserDashboard from "./pages/User-view/Dashboard";
import AdminRides from "./pages/admin-view/AdminRides";
import RideListing from "./pages/User-view/listing";
import NotFound from "./pages/not-found";
import FAQ from "./pages/User-view/FAQs";
import AboutUs from "./pages/User-view/Dashboard/aboutUs";

import AnimatedGif from "./components/animatedGif";
import RideDetailsPage from "./pages/User-view/ride-details";
import AddReviews from "./pages/admin-view/AddReviews";
import BookingComponent from "./pages/User-view/booking";
import PrivacyPolicy from "./pages/User-view/PrivacyPolicy";
import TermsAndConditions from "./pages/User-view/Terms";
import AdminBookings from "./pages/admin-view/AdminBookings";
import AdminUsers from "./pages/admin-view/AdminUsers";
import Bookings from "./pages/User-view/ride-Bookings";
import ContactList from "./pages/admin-view/NeedAssist";
import VerifyEmail from "./pages/auth/verify";
import ForgotPassword from "./pages/auth/forgetPassword";
import ResetPassword from "./pages/auth/resetPassword";
import Ebike from "./assets/ebike.gif";
import ReachUs from "./pages/User-view/ReachUs";
import { Helmet } from "react-helmet";
import TagManager from "react-gtm-module";

function App() {
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );

  // const GoogleTag = () => {
  //   useEffect(() => {
  //     // Check if the Google tag is already added to prevent duplicates
  //     if (
  //       !document.querySelector(
  //         'script[src="https://www.googletagmanager.com/gtag/js?id=AW-16839198103"]'
  //       )
  //     ) {
  //       const script1 = document.createElement("script");
  //       script1.async = true;
  //       script1.src =
  //         "https://www.googletagmanager.com/gtag/js?id=AW-16839198103";
  //       document.head.appendChild(script1);

  //       const script2 = document.createElement("script");
  //       script2.innerHTML = `
  //         window.dataLayer = window.dataLayer || [];
  //         function gtag(){dataLayer.push(arguments);}
  //         gtag('js', new Date());
  //         gtag('config', 'AW-16839198103');
  //       `;
  //       document.head.appendChild(script2);
  //     }
  //   }, []); // Empty array ensures this only runs once when the component is mounted
  //
  //   return null; // This component does not need to render anything
  // };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading)
    return (
      <div className="bg-black h-[100vh] flex justify-center items-center">
        <AnimatedGif src={Ebike} className="h-16 w-16" />
      </div>
    );

  return (
    <div className="flex flex-col overflow-hidden">
      {/* <GoogleTag /> */}
      <Routes>
        <Route
          path="/auth"
          element={
            // <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AuthLayout />
            // {/* </CheckAuth> */}
          }
        >
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
          <Route path="verify-email/:token" element={<VerifyEmail />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password/:token" element={<ResetPassword />} />
        </Route>
        <Route
          path="/admin"
          element={
            // <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AdminLayout />
            // </CheckAuth>
          }
        >
          <Route path="" element={<AdminDashboard />} />
          <Route path="contacts" element={<ContactList />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="Rides" element={<AdminRides />} />
          <Route path="Bookings" element={<AdminBookings />} />
          <Route path="addReviews" element={<AddReviews />} />
        </Route>
        <Route
          path="/"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShopLayout />
            </CheckAuth>
          }
        >
          <Route path="" element={<UserDashboard />} />
          <Route path="listing" element={<RideListing />} />
          <Route path="Reach-Us" element={<ReachUs />} />
          <Route path="details" element={<RideDetailsPage />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="Faq's" element={<FAQ />} />
          <Route path="booking/:rideId" element={<BookingComponent />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="Policy" element={<PrivacyPolicy />} />
          <Route path="Terms&Condition" element={<TermsAndConditions />} />
        </Route>
        <Route path="/unauth-page" element={<UnauthPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
