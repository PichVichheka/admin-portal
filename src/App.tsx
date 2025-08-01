import { Route, Routes } from "react-router";
import AuthLayout from "./components/Layout/auth-layout";
import LoginForm from "./components/auth-screen/login";
import DashboardLayout from "./components/Layout/dashboard-layout";
import Dashboard from "./screens/dashboard";
import { useAuthStore } from "@/store/auth-store";
import { useEffect } from "react";
import ProtectedRoute from "./components/protect-route";
import Users from "./screens/users";
import Card from "./screens/card";
import Profile from "./screens/profile";

function App() {
  const checkAuth = useAuthStore((s) => s.checkAuth);

  useEffect(() => {
    checkAuth();
  }, []);
  return (
    <>
      <Routes>
        {/* Auth Route */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginForm />} />
        </Route>

        {/* Dashboard route */}
        <Route element={<ProtectedRoute roles={["admin", "super_admin"]} />}>
          <Route element={<DashboardLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/cards" element={<Card />} />
            {/* Add more routes as needed */}
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
