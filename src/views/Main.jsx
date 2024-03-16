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
import { Pagination } from "@mui/material";

const Main = () => {
  const { userLoggedIn } = useContext(UserContext);
  const [tab, setTab] = useState("photoGrid");
  const [page, setPage] = useState(1);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    console.log("🚀: Main -> page", page);
  }, [page]);

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
      return <PhotoGrid page={page} />;
    }

    if (tab === "instagram") {
      return <InstagramWidget />;
    }
  };

  return (
    <IonApp>
      <Landing />
      {renderTabs()}
      <IonContent>
        {renderContent()}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Pagination count={10} page={page} onChange={handlePageChange} />
        </div>
      </IonContent>
      <MobileModal />
    </IonApp>
  );
};

export default Main;
