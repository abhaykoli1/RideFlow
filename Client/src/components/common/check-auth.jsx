import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();

  // Define public paths accessible without authentication
  const publicPaths = [
    "/",
    "/listing",
    "/Reach-Us",
    "/details",
    "/about",
    "/faqs",
    "/Terms&Condition",
    "/Policy",
  ];

  // Handle unauthenticated users
  if (!isAuthenticated) {
    if (publicPaths.includes(location.pathname)) {
      return <>{children}</>;
    }

    // Redirect unauthenticated users accessing protected paths
    if (location.pathname.startsWith("/admin")) {
      return <Navigate to="/auth/login" />;
    }

    // Redirect unauthenticated users trying to book or view bookings
    if (
      location.pathname.startsWith("/booking") ||
      location.pathname === "/bookings"
    ) {
      return <Navigate to="/auth/login" />;
    }
    // Redirect unauthenticated users to login for other protected routes
    // return <Navigate to="/auth/login" />;
  }

  // Handle authenticated users accessing "/auth" routes
  if (isAuthenticated && location.pathname.startsWith("/auth")) {
    // Redirect to user or admin dashboard based on role
    return <Navigate to={user?.role === "admin" ? "/admin" : "/"} />;
  }

  // Handle admin users
  if (isAuthenticated && user?.role === "admin") {
    if (location.pathname === "/") {
      // Redirect admin users from the home page to admin dashboard
      return <Navigate to="/admin" />;
    }

    if (!location.pathname.startsWith("/admin")) {
      // Redirect admin users away from user routes
      return <Navigate to="/admin" />;
    }
  }

  // Restrict non-admin users from accessing admin routes
  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    location.pathname.startsWith("/admin")
  ) {
    return <Navigate to="/unauth-page" />;
  }

  // Default: Render children for allowed routes
  return <>{children}</>;
}

export default CheckAuth;
