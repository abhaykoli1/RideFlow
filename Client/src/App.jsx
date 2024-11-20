import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./store/auth-slice";
import { Skeleton } from "./components/ui/skeleton";
import AuthLayout from "./components/authCompo/layout";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
import AdminLayout from "./components/admin-view/layout";
import AdminDashboard from "./pages/admin-view/dashboard";
import AdminOrders from "./pages/admin-view/orders";
import AdminFeatures from "./pages/admin-view/features";
import CheckAuth from "./components/common/check-auth";
import UnauthPage from "./pages/unauth-page";
import ShopLayout from "./components/User-view/shopLayout";
import UserDashboard from "./pages/User-view/Dashboard";
import AdminRides from "./pages/admin-view/AdminRides";
import RideListing from "./pages/User-view/listing";
import NotFound from "./pages/not-found";
import FAQ from "./pages/User-view/FAQs";
import AboutUs from "./pages/User-view/Dashboard/aboutUs";
import ReachUs from "./pages/User-view/Dashboard/reach";
import AnimatedGif from "./components/animatedGif";
import RideDetailsPage from "./pages/User-view/ride-details";
import AddReviews from "./pages/admin-view/AddReviews";
import BookingComponent from "./pages/User-view/booking";

// import RideDetailsPage from "./pages/User-view/ride-details";
// import PaypalReturnPage from "./pages/shopping-view/paypal-return";
// import PaymentSuccessPage from "./pages/shopping-view/payment-success";
// import SearchProducts from "./pages/shopping-view/search";

function App() {
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading)
    return (
      <div className="bg-black h-[100vh] flex justify-center items-center">
        <AnimatedGif
          src={
            "http://res.cloudinary.com/dulkmeadg/image/upload/v1730524986/o9ce5ixqmq9fgihbqmon.gif"
          }
          className="h-16 w-16"
        />
      </div>
    );

  return (
    <div className="flex flex-col overflow-hidden ">
      <Routes>
        <Route
          path="/"
          element={
            <CheckAuth
              isAuthenticated={isAuthenticated}
              user={user}
            ></CheckAuth>
          }
        />
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>
        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="Rides" element={<AdminRides />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="features" element={<AdminFeatures />} />
          <Route path="addReviews" element={<AddReviews />} />
        </Route>
        <Route
          path="/ride"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShopLayout />
            </CheckAuth>
          }
        >
          <Route path="home" element={<UserDashboard />} />
          <Route path="listing" element={<RideListing />} />
          <Route path="Reach-Us" element={<ReachUs />} />
          <Route path="details" element={<RideDetailsPage />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="faqs" element={<FAQ />} />
          <Route path="booking" element={<BookingComponent />} />
        </Route>
        <Route path="/unauth-page" element={<UnauthPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;