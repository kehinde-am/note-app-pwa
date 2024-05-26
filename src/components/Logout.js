import React from "react";
import { useAuth } from "../auth-context";

const Logout = () => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch {
      console.error("Failed to log out");
    }
  };

  return <button onClick={handleLogout}>Log Out</button>;
};

export default Logout;
