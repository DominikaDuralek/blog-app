import { createContext, useEffect, useState } from "react";
import axios from 'axios';

// React context api
// Using this to check stored information for different components
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    // Try to read user from localstorage
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null);

    // After login, set user data in localstorage
    const login = async (inputs) => {
        const res = await axios.post("/api/auth/login", inputs);
        setCurrentUser(res.data);
    };

    // After logout, set data in localstorage to null
    const logout = async (inputs) => {
        await axios.post("/api/auth/logout");
        setCurrentUser(null);
    };

    // Whenever current user is changed, update localstorage
    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser]);

    return (
        <AuthContext.Provider value={{ currentUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}