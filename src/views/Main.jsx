import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import PhotoGrid from "./PhotoGrid";
import Landing from "./Landing";
import MobileModal from "../components/MobileModal";
import InstagramWidget from "./InstagramWidget";
import { IonApp, IonLabel, IonSegment, IonSegmentButton } from "@ionic/react";

const Main = () => {
  const { userLoggedIn } = useContext(UserContext);

  const [tab, setTab] = useState("photoGrid");

  useEffect(() => {
    userLoggedIn();
  }, []);

  const renderTabs = () => {
    return (
      <IonSegment value={tab}>
        <IonSegmentButton value="photoGrid" onClick={() => setTab("photoGrid")}>
          <IonLabel>Galería de Fotos</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton value="instagram" onClick={() => setTab("instagram")}>
          <IonLabel>Instagram</IonLabel>
        </IonSegmentButton>
      </IonSegment>
    );
  };

  const renderContent = () => {
    if (tab === "photoGrid") {
      return <PhotoGrid />;
    }

    if (tab === "instagram") {
      return <InstagramWidget />;
    }
  };

  return (
    <IonApp>
      <div>
        <Landing />
        {renderTabs()}
        {renderContent()}
        <MobileModal />
      </div>

    </IonApp>
  );
};

export default Main;
