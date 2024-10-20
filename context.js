"use client"
import { ReactNode, createContext, useContext, useReducer } from "react";
import { removeSessionToken } from "./helpers/sessionTokenManager";
import { useQuery } from "@apollo/client";
import { GET_USER } from "@/constants";

const initialState = {
  user: null,
  selectedUser: null
};


const reducer = (state, action) => {
 
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload
      };
    case 'LOGOUT':
      removeSessionToken()
      return {
        ...state,
        user: null
      };
    case 'SELECTED_USER':
      return {
        ...state,
        selectedUser: action.payload
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
