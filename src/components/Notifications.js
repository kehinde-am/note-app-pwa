import { useEffect } from "react";

const Notifications = () => {
  useEffect(() => {
    if ("Notification" in window && navigator.serviceWorker) {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          navigator.serviceWorker.ready.then((registration) => {
            registration.showNotification("Notifications enabled for Note Taking PWA!");
          });
        }
      });
    }
  }, []);

  return null;
};

export default Notifications;
