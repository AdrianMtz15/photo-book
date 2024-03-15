import { useContext, useEffect, useState } from "react";
import { ModalContext } from "../context/ModalContext";
import { IonButton, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonList, IonModal, IonTextarea } from "@ionic/react";
import ProgressBar from "./ProgressBar";

const MobileModal = () => {
  const [name, setName] = useState("");
  const [spinner, setSpinner] = useState(false);

  const {
    title,
    content,
    component,
    children,
    clearModal,
    showModal,
  } = useContext(ModalContext);

  const {
    total, 
    uploadedCount, 
    setTotalFiles, 
    fileUploaded
  } = useContext(ModalContext);


  useEffect(() => {
    console.log(showModal);
    
  }, [showModal]);


  const handleCancel = () => {
    console.log('handle cancel');
    clearModal();

  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const renderProgress = () => {
    if (spinner) {
      const progress = (uploadedCount / total) * 100;
      return (
        <div className="mb-3">
          <ProgressBar progress={progress} />
        </div>
      );
    }
  };

  return (
    <>
    <IonModal
      isOpen={showModal}
      initialBreakpoint={0.9}
      breakpoints={[0.9]}
      // onDidDismiss={handleCancel}
    >

        <IonGrid class="pt-4 overflow-hidden">

          {title && title !== "" ? <h2 className="text-primary text-center mt-3">{title}</h2> : ""}

          <div className="p-3 pt-0 overflow-scroll" style={{flex: 1}}>
            {content}
            {component}
            {children}

            <IonList>
              <IonItem>
                <IonInput 
                  label="Nombre del Invitado" 
                  labelPlacement="floating" 
                  type="text"
                  size={24}
                />
              </IonItem>

              <IonItem>
                <IonTextarea
                  placeholder="Comentario (opcional)"
                  autoGrow={true}
                  value=""
                  rows={4}
                ></IonTextarea>
              </IonItem>
            </IonList>

            {renderProgress()}

            <button
              type="submit"
              disabled={spinner}
              className="gradient btn text-white text-capitalize fw-bold mt-4 w-100"
        
            >
              {spinner ? <div className="spinner-border" /> : "SUBIR"}
            </button>
            
            <button
              type="button"
              disabled={spinner}
              onClick={() => {
                console.log('cancel');
              }}
              className="btn text-muted w-100 my-3"
            >
              Cancel
            </button>
          </div>
        </IonGrid>
    </IonModal>
    </>
    

  );
};

export default MobileModal;
