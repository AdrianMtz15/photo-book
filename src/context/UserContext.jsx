import React, { createContext, useEffect, useReducer } from "react";
import { LOGIN, SHOW_SPINNER, HIDE_SPINNER } from "../types";
import UserReducer from "../reducers/UserReducer";
import AuthService from "../services/AuthService";
import UserService from "../services/UserService";
import useLocalStorage from "../hooks/useLocalStorage";

const initialState = {
  user: null,
};

export const UserContext = createContext(initialState);

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, initialState);
  const { storage } = useLocalStorage();

  useEffect(() => { 
    userLoggedIn()
  }, [storage])

  function userLoggedIn() {
    if(storage.token && storage.token.length > 0) {
      AuthService.setToken(storage.token);
    }



    // dispatch({ type: SHOW_SPINNER });
    // AuthService.userLoggedIn(
    //   () => {
    //     UserService.getCurrentUser().then((res) => {
    //       const { user } = res.data;
    //       dispatch({
    //         type: LOGIN,
    //         payload: user,
    //       });
    //     });
    //   },
    //   (error) => {
    //     if (error) {
    //       alert(error);
    //       AuthService.signOut();
    //     }
    //     dispatch({ type: HIDE_SPINNER });
    //   }
    // );
  }

  function signOut() {
    AuthService.signOut();
  }

  async function signUp(name) {
    const token = await AuthService.signInAnonimously();
    const user = await UserService.postUser({
      name,
      uid: token
    })

    return {
      token,
      userId: user.data.current_user.user_id
    };
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
