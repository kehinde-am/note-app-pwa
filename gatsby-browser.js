import React from "react"
import { AuthProvider } from "./src/context/auth-context"
import Notifications from "./src/components/Notifications"

export const wrapRootElement = ({ element }) => (
  <AuthProvider>
    <Notifications />
    {element}
  </AuthProvider>
)
