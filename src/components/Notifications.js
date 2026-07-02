import { useEffect } from "react"

const Notifications = () => {
  useEffect(() => {
    if ("Notification" in window && navigator.serviceWorker) {
      Notification.requestPermission()
    }
  }, [])

  return null
}

export default Notifications
