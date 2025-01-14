import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = ({  setIsLoggedIn }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleLogout = async () => {
            try {
                let token = localStorage.getItem('token');
                // Optionally, you can make an API call to log the user out server-side
                const response = await fetch("https://task-management-backend-xz3t.onrender.com/user/logout", {
                    method: "PATCH",
                    credentials: "include", // Include cookies to ensure session is cleared
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}` // Pass token here
                    },
                });

                if (response.ok) {
                    // Clear user ID from localStorage
                    localStorage.removeItem("userID");
                    setIsLoggedIn(false)
                    // Redirect to home page
                    navigate("/");
                } else {
                    console.error("Logout failed");
                }
            } catch (error) {
                console.error("Error logging out:", error);
            }
        };

        handleLogout();
    }, [navigate]);

    return null;  // No UI needed, it's handled by the effect
};

export default Logout;
