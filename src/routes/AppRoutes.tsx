import { createBrowserRouter } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Home from "../pages/Home/Home";
import Doctors from "../pages/Doctors/Doctors";
import Booking from "../pages/Booking/Booking";
import MyAppointments from "../pages/MyAppointments/MyAppointments";
import ProtectedRoute from "../components/ProtectedRoute";
import Navbar from "../components/Navbar";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <>
    <Navbar />
    {children}
  </>
);

export const router = createBrowserRouter([
  {
    errorElement: <NotFound />,
    children: [
      // Public routes
      { path: "/login",    element: <Login /> },
      { path: "/register", element: <Register /> },

      // Protected routes (all share the Navbar layout)
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <Layout><Home /></Layout>
          </ProtectedRoute>
        ),
      },
      {
        path: "/doctors",
        element: (
          <ProtectedRoute>
            <Layout><Doctors /></Layout>
          </ProtectedRoute>
        ),
      },
      {
        path: "/booking/:id",
        element: (
          <ProtectedRoute>
            <Layout><Booking /></Layout>
          </ProtectedRoute>
        ),
      },
      {
        path: "/my-appointments",
        element: (
          <ProtectedRoute>
            <Layout><MyAppointments /></Layout>
          </ProtectedRoute>
        ),
      },

      // Fallback
      { path: "*", element: <NotFound /> },
    ],
  },
]);
