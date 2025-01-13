import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = ({  setIsLoggedIn }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleLogout = async () => {
            try {
                // Optionally, you can make an API call to log the user out server-side
                const response = await fetch("http://localhost:6080/user/logout", {
                    method: "PATCH",
                    credentials: "include", // Include cookies to ensure session is cleared
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
