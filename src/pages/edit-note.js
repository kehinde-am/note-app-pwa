import React from "react"
import Layout from "../components/layout/Layout"
import RequireAuth from "../components/auth/RequireAuth"
import EditNote from "../components/notes/EditNote"

export const Head = () => (
  <>
    <title>Edit Note | Note Taking PWA</title>
    <meta name="description" content="Edit your note" />
  </>
)

const EditNotePage = ({ params }) => {
  const noteId = params["*"]

  return (
    <Layout>
      <RequireAuth>
        <EditNote noteId={noteId} />
      </RequireAuth>
    </Layout>
  )
}

export default EditNotePage
