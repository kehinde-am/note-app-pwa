import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faNoteSticky } from "@fortawesome/free-solid-svg-icons"

import Header from "./Header"
import "./layout.css"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const siteTitle = data.site.siteMetadata?.title || "Note Taking PWA"

  return (
    <div className="site-shell">
      <Header siteTitle={siteTitle} brandIcon={faNoteSticky} />
      <div className="layout-content">
        <main>{children}</main>
        <footer className="layout-footer">
          © {new Date().getFullYear()} Kehinde Amusa · Built with Gatsby &
          Firebase
        </footer>
      </div>
    </div>
  )
}

export default Layout
