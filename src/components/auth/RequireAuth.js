import React, { useEffect } from "react"
import { navigate } from "gatsby"
import { useAuth } from "../../context/auth-context"

const RequireAuth = ({ children }) => {
  const { currentUser } = useAuth()

  useEffect(() => {
    if (!currentUser) {
      navigate("/login")
    }
  }, [currentUser])

  if (!currentUser) {
    return null
  }

  return children
}

export default RequireAuth
