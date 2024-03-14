import { useContext, useEffect, useState } from "react";
import { ModalContext } from "../context/ModalContext";
import { IonContent, IonGrid, IonInput, IonItem, IonList, IonModal, IonTextarea } from "@ionic/react";
import { Container, Grid, TextField } from "@mui/material";
import Login from "../views/Login";

const MobileModal = () => {
  const [name, setName] = useState("");

  const {
    title,
    content,
    component,
    children,
    clearModal,
    onCancel,
    showModal,
  } = useContext(ModalContext);


  useEffect(() => {
    console.log(showModal);
    
  }, [showModal]);


  const handleCancel = () => {
    clearModal();
    if (typeof onCancel === "function") {
      onCancel();
    }
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  return (
    <>
    <IonModal
      isOpen={showModal}
      initialBreakpoint={0.9}
      breakpoints={[0.9, 0.95]}
      onDidDismiss={handleCancel}
    >
      <IonContent className="py-4 ps-4 bg-white">
        <IonGrid>
          <div className="p-3">
            {title && title !== "" ? <h2 className="text-primary text-center">{title}</h2> : ""}
            {content}
            {component}
            {children}

            <IonList>
              <IonItem>
                <IonInput 
                  label="Nombre del Invitado" 
                  labelPlacement="floating" 
                  placeholder="Enter text"
                  type="text"
                  size={24}
                />
              </IonItem>

              {/* <IonItem>
                <IonInput 
                  label="Mensaje para los novios" 
                  labelPlacement="floating" 
                  placeholder="Enter text"
                  type="text"
                  size={24}
                />
              </IonItem> */}

              <IonItem>
                <IonTextarea
                  placeholder="Type something here"
                  autoGrow={true}
                  value=""
                ></IonTextarea>
              </IonItem>
            </IonList>
            {/* <IonInput
              // className={`${isValid && 'ion-valid'} ${isValid === false && 'ion-invalid'} ${isTouched && 'ion-touched'}`}
              type="email"
              fill="solid"
              label="Email"
              labelPlacement="floating"
              // onIonInput={(event) => validate(event)}
              // onIonBlur={() => markTouched()}
            ></IonInput> */}
          </div>

          
        </IonGrid>

        
       

      </IonContent>
    </IonModal>
    </>
    

  );
};

export default MobileModal;
