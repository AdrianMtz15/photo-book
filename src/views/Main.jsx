import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import PhotoGrid from "./PhotoGrid";
import Landing from "./Landing";
import MobileModal from "../components/MobileModal";
import InstagramWidget from "./InstagramWidget";
import {
  IonApp,
  IonLabel,
  IonSegment,
  IonSegmentButton,
  IonContent,
} from "@ionic/react";
import { ModalContext } from "../context/ModalContext";

const Main = () => {
  const { userLoggedIn } = useContext(UserContext);
  const { showModal } = useContext(ModalContext);

  const [tab, setTab] = useState("photoGrid");

  useEffect(() => {
    userLoggedIn();
  }, []);

  const renderTabs = () => {
    return (
      <div style={{ paddingLeft: "10px", paddingRight: "10px" }}>
        <IonSegment value={tab}>
          <IonSegmentButton
            value="photoGrid"
            onClick={() => setTab("photoGrid")}
          >
            <IonLabel>Galería de Fotos</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton
            value="instagram"
            onClick={() => setTab("instagram")}
          >
            <IonLabel>Instagram</IonLabel>
          </IonSegmentButton>
        </IonSegment>
      </div>
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

  const renderModal = () => {
    if(showModal) {
      return <MobileModal />
    }
  }

  return (
    <IonApp>
      <Landing />
      {renderTabs()}
      <IonContent>{renderContent()}</IonContent>
      {renderModal()}
    </IonApp>
  );
};

export default Main;
