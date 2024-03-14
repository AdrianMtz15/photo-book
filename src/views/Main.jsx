import React, { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import PhotoGrid from "./PhotoGrid";
import Landing from "./Landing";

const Main = () => {
  const { userLoggedIn } = useContext(UserContext);

  useEffect(() => {
    userLoggedIn();
  }, []);

  return (
    <div>
      <Landing />
      <PhotoGrid />
    </div>
  );
};

export default Main;
