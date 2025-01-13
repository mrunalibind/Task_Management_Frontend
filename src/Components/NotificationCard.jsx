import React from 'react'
import "./Notification.css"

const NotificationCard = ({noti}) => {
    let {title, createdAt } = noti;
  return (
    <div className='notification-card'>
        <h3>{title}</h3>
        <p>CreatedAt: {new Date(createdAt).toLocaleString()}</p>
    </div>
  )
}

export default NotificationCard