// import { Navigate, useLocation } from "react-router-dom";

// function CheckAuth({ isAuthenticated, user, children }) {
//   const location = useLocation();

//   // Define public paths accessible without authentication
//   const publicPaths = [
//     "/ride",
//     "/listing",
//     "/Reach-Us",
//     "/details",
//     "/about",
//     "/faqs",
//     "/Terms&Condition",
//     "/Policy",
//   ];

//   // Allow access to public paths without requiring authentication
//   if (!isAuthenticated && publicPaths.includes(location.pathname)) {
//     return <>{children}</>;
//   }

//   // Redirect unauthenticated users if accessing non-public paths
//   if (location.pathname === "/") {
//     return <Navigate to="/" />;
//   } else if (!isAuthenticated) {
//     if (!location.pathname.includes("/") && location.pathname !== "/") {
//       return <Navigate to="/auth/login" />;
//     }
//   }

//   if (!isAuthenticated)
//     if (location.pathname === "/booking" || location.pathname === "/bookings") {
//       return <Navigate to="/auth/login" />;
//     }

//   // Redirect authenticated users away from "/auth" routes
//   if (isAuthenticated && location.pathname.startsWith("/auth")) {
//     return <Navigate to="/ride" />;
//   }

//   // Redirect admin users away from "/ride" routes to dashboard
//   if (user?.role === "admin" && location.pathname.includes("/")) {
//     return <Navigate to="/admin" />;
//   }

//   if (!isAuthenticated && location.pathname.includes("/admin")) {
//     return <Navigate to="/ride" />;
//   }

//   // Restrict non-admin users from accessing "/admin" routes
//   if (
//     isAuthenticated &&
//     user?.role !== "admin" &&
//     location.pathname.includes("/admin")
//   ) {
//     return <Navigate to="/unauth-page" />;
//   }

//   // Prevent authenticated users from accessing login/register
//   if (
//     isAuthenticated &&
//     (location.pathname.includes("/login") ||
//       location.pathname.includes("/register"))
//   ) {
//     return <Navigate to="/ride" />;
//   }

//   return <>{children}</>;
// }

// export default CheckAuth;
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
      // Allow access to public paths
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
