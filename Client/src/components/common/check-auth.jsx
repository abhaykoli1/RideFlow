import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();

  // Define public paths accessible without authentication
  const publicPaths = [
    "/ride/home",
    "/ride/listing",
    "/ride/Reach-Us",
    "/ride/details",
    "/ride/about",
    "/ride/faqs",
    "/ride/Terms&Condition",
    "/ride/Policy",
  ];

  // Allow access to public paths without requiring authentication
  if (!isAuthenticated && publicPaths.includes(location.pathname)) {
    return <>{children}</>;
  }

  // Redirect unauthenticated users if accessing non-public paths
  if (location.pathname === "/" || location.pathname === "/ride") {
    return <Navigate to="/ride/home" />;
  } else if (!isAuthenticated) {
    if (
      !location.pathname.includes("/") &&
      location.pathname !== "/ride/home"
    ) {
      return <Navigate to="/auth/login" />;
    }
  }

  if (!isAuthenticated)
    if (
      location.pathname === "/ride/booking" ||
      location.pathname === "/ride/bookings"
    ) {
      return <Navigate to="/auth/login" />;
    }

  // Redirect authenticated users away from "/auth" routes
  if (isAuthenticated && location.pathname.startsWith("/auth")) {
    return <Navigate to="/ride/home" />;
  }

  // Redirect admin users away from "/ride" routes to dashboard
  if (user?.role === "admin" && location.pathname.includes("/ride")) {
    return <Navigate to="/admin" />;
  }

  if (!isAuthenticated && location.pathname.includes("/admin")) {
    return <Navigate to="/ride/home" />;
  }

  // Restrict non-admin users from accessing "/admin" routes
  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    location.pathname.includes("/admin")
  ) {
    return <Navigate to="/unauth-page" />;
  }

  // Prevent authenticated users from accessing login/register
  if (
    isAuthenticated &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/register"))
  ) {
    return <Navigate to="/ride/home" />;
  }

  return <>{children}</>;
}

export default CheckAuth;
