import { Box } from "@mui/material";
import "./App.css";
import Header from "./components/Header";
import PhotoGrid from "./views/PhotoGrid";
import Navbar from "./components/Navbar";
import useLocalStorage from "./hooks/useLocalStorage";
import { useEffect } from "react";
import Login from "./views/Login";

function App() {

  const { storage, saveData} = useLocalStorage();

  useEffect(() => {
    // saveData('session', {
    //   loggedIn: true,
    //   userId: 1
    // });
  }, []); 

  const renderApp = () => {
    if(storage?.loggedIn) {
      return(
        <>
          <Header />
          <PhotoGrid />
          <Navbar/>
        </>
      )
    }
  }

  const renderLogin = () => {
    if(!storage?.loggedIn) {
      return(
        <>
          <Login/>
        </>
      )
    }
  }


  return (
    <>
      {renderApp()}
      {renderLogin()}
    </>
  );
}

export default App;
