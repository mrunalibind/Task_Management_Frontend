import React, { useEffect, useState } from "react";
import { io } from "socket.io-client"
import NotificationCard from "./NotificationCard";
import "./Notification.css"

const Notification = () => {
  const [notifications, setNotifications] = useState([]);

  console.log("Notification Componenet")
  const fetchNotifications = async () => {
    try {

      const response = await fetch("http://localhost:6080/notification/retrieveNotification", {
        method: 'GET',
        credentials: 'include', // Include cookies
      });

      let data = await response.json();
      console.log(data.notifications);
      setNotifications(data.notifications);
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred while fetching notifications.");
    }
  };

  useEffect(() => {
    fetchNotifications();

    // Optional: Add WebSocket to listen for new notifications in real-time
    const socket = io("http://localhost:6080");
    
    socket.on("newNotification", (notification) => {
      console.log(notification, "noticompo");
      setNotifications((prev) => [notification, ...prev]);
      
    });

    // Cleanup on unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h2 className="noti-title">Notifications</h2>
      {notifications.length === 0 ? (
        <p style={{ color: "red" }}>No new notifications.</p>
      ) : (
        <div>
          {
            notifications.map((notification) => (
              <NotificationCard key={notification._id} noti={notification} fetchNotifications={fetchNotifications}/>
            ))
          }
        </div>
      )}
    </div>
  );
};

export default Notification;
