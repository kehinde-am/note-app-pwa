import React from "react"
import Layout from "../components/layout/Layout"
import RequireAuth from "../components/auth/RequireAuth"
import NotesPage from "../components/notes/NotesPage"

export const Head = () => (
  <>
    <title>My Notes | Note Taking PWA</title>
    <meta name="description" content="View and manage your notes" />
  </>
)

const Notes = () => (
  <Layout>
    <RequireAuth>
      <NotesPage />
    </RequireAuth>
  </Layout>
)

export default Notes
