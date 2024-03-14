import React, { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import PhotoGrid from "./PhotoGrid";
import Landing from "./Landing";
import MobileModal from "../components/MobileModal";

const Main = () => {
  const { userLoggedIn } = useContext(UserContext);

  useEffect(() => {
    userLoggedIn();
  }, []);

  return (
    <div>
      <Landing />
      <PhotoGrid />
      <MobileModal />
    </div>
  );
};

export default Main;
