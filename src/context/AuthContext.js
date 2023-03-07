import { createContext, useReducer } from "react";
import React from "react";
import AuthReducer from "./AuthReducer";
const INITIAL_STATE = {
    user: {
        _id: "63e6bb99eb596d5c4a550481",
        username: "John",
        email: "John@gmail.com",
        profilePicture: "person/1.jpeg",
        coverPicture: "",
        isAdmin: false,
        followers: [],
        following: [],
    },
    isFetching: false,
    error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    return (
        <AuthContext.Provider 
        value={{ 
            user: state.user, 
            isFetching: state.isFetching, 
            error: state.error,
            dispatch,
             }}
             >
                {children}
             </AuthContext.Provider>
    );
}