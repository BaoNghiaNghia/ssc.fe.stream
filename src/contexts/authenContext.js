/* eslint-disable */
import React from 'react';
import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [token, setToken_] = useState(localStorage.getItem("persist:auth"));
    const [profile, setProfile_] = useState(localStorage.getItem("profile"));

    const setToken = (newToken) => {
        setToken_(newToken);
    };

    const setProfile = (newProfile) => {
        setProfile_(newProfile);
    };

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
            localStorage.setItem("persist:auth", token);
            setToken_(token);
        } else {
            delete axios.defaults.headers.common["Authorization"];
            localStorage.removeItem("persist:auth");
        }
    }, [token]);

    useEffect(() => {
        if (profile) {
            localStorage.setItem("profile", profile);
            setProfile_(profile);
        } else {
            localStorage.removeItem("profile");
        }
    }, [profile]);

    // Memoized value of the authentication context
    const contextValue = useMemo(() => ({
        token,
        profile,
        setProfile,
        setToken
    }), [token, profile]);

    // Provide the authentication context to the children components
    return (
        <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthProvider;