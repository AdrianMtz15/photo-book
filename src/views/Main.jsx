import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import PhotoGrid from "./PhotoGrid";
import Landing from "./Landing";
import MobileModal from "../components/MobileModal";
import InstagramWidget from "./InstagramWidget";

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
      {/* <InstagramWidget /> */}
    </div>
  );
};

export default Main;
