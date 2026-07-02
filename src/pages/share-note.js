import React from "react"
import Layout from "../components/layout/Layout"
import RequireAuth from "../components/auth/RequireAuth"
import ShareNote from "../components/notes/ShareNote"

export const Head = () => (
  <>
    <title>Share Note | Note Taking PWA</title>
    <meta name="description" content="Share your note" />
  </>
)

const ShareNotePage = ({ params }) => {
  const noteId = params["*"]

  return (
    <Layout>
      <RequireAuth>
        <ShareNote noteId={noteId} />
      </RequireAuth>
    </Layout>
  )
}

export default ShareNotePage
