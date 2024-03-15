import React, { createContext, useReducer } from "react";
import { LOGIN, SHOW_SPINNER, HIDE_SPINNER } from "../types";
import UserReducer from "../reducers/UserReducer";
import AuthService from "../services/AuthService";
import UserService from "../services/UserService";

const initialState = {
  user: null,
};

export const UserContext = createContext(initialState);

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, initialState);

  function userLoggedIn() {
    dispatch({ type: SHOW_SPINNER });
    AuthService.userLoggedIn(
      () => {
        UserService.getCurrentUser().then((res) => {
          const { user } = res.data;
          dispatch({
            type: LOGIN,
            payload: user,
          });
        });
      },
      (error) => {
        if (error) {
          alert(error);
          AuthService.signOut();
        }
        dispatch({ type: HIDE_SPINNER });
      }
    );
  }

  function signOut() {
    AuthService.signOut();
  }

  async function signUp() {
    const token = await AuthService.signInAnonimously()
    return token;
  }
  
  return (
    <UserContext.Provider
      value={{
        ...state,
        signUp,
        signOut,
        userLoggedIn,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
