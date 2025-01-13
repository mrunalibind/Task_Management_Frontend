import React from 'react'
import "./Navigation.css"
import { Link } from "react-router-dom";

const Navigation = ({ isLoggedIn }) => {
    return (
        <div className='nav-block'>
          <nav className="navigation-bar">
          <div className="nav-logo">
            <h2>Task Manager</h2>
          </div>
          {
            isLoggedIn && (
              <ul className="nav-links">
                <li>
                  <Link to="/tasks">Tasks</Link>
                </li>
                <li>
                  <Link to="/notifications">Notifications</Link>
                </li>
                <li>
                <Link to="/logout">Logout</Link>
                </li>
              </ul>
            )
          }
        </nav>
        </div>
      );
}

export default Navigation