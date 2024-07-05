"use client"
import { ReactNode, createContext, useContext, useReducer } from "react";
import { removeSessionToken } from "./helpers/sessionTokenManager";
import { useQuery } from "@apollo/client";
import { GET_USER } from "@/constants";

const initialState = {
  user: null
};


const reducer = (state, action) => {
 
  switch (action.type) {
    case 'LOGIN':
      console.log("hi from context")
      return {
        ...state,
        user: action.payload
      };
    case 'LOGOUT':
      console.log("logout")
      removeSessionToken()
      return {
        ...state,
        user: null
      };
    default:
      return state;
  }
};

const UserContext = createContext();


export const UserProvider = ({ children }) => {

   
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
     <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
