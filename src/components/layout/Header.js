import * as React from "react"
import { Link, navigate } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import { useAuth } from "../../context/auth-context"

const Header = ({ siteTitle, brandIcon }) => {
  const { currentUser, logout } = useAuth()

  const handleLogout = async () => {
    try {
      await logout()
      navigate("/login")
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link to="/" className="site-brand">
          <span className="brand-icon">
            <FontAwesomeIcon icon={brandIcon} />
          </span>
          {siteTitle}
        </Link>
        <nav className="site-nav">
          {currentUser ? (
            <>
              <Link to="/notes" className="nav-link" activeClassName="nav-link-active">
                Notes
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="btn btn-ghost btn-sm"
              >
                <FontAwesomeIcon icon={faRightFromBracket} />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link" activeClassName="nav-link-active">
                Login
              </Link>
              <Link to="/signup" className="btn btn-primary btn-sm">
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Header
