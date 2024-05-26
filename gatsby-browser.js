import React from "react";
import { AuthProvider } from "./src/auth-context";
import Notifications from "./src/components/Notifications";

export const wrapRootElement = ({ element }) => {
  return (
    <AuthProvider>
      <Notifications />
      {element}
    </AuthProvider>
  );
};
