import { useContext, useEffect, useState } from "react";
import { ModalContext } from "../context/ModalContext";
import { IonContent, IonGrid, IonHeader, IonInput, IonItem, IonList, IonModal, IonTextarea } from "@ionic/react";
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
    onCancel,
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
    clearModal();
    if (typeof onCancel === "function") {
      onCancel();
    }
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
      breakpoints={[0.9, 0.95]}
      onDidDismiss={handleCancel}
    >

      <IonContent className="py-4 ps-4 bg-white position-relative overflow-auto">
        <IonGrid class="h-100  d-flex flex-column pt-4">

          {title && title !== "" ? <h2 className="text-primary h-auto text-center mt-3">{title}</h2> : ""}

          <div className="p-3 pt-0 " style={{flex: 1, overflow: 'auto'}}>
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
              className="gradient btn text-white text-capitalize fw-bold mt-4 w-50"
        
            >
              {spinner ? <div className="spinner-border" /> : "SUBIR"}
            </button>
            
            <button
              type="button"
              disabled={spinner}
              onClick={handleCancel}
              className="btn text-muted w-50 my-3"
            >
              Cancelar
            </button>
          </div>
        </IonGrid>
      </IonContent>
    </IonModal>
    </>
    

  );
};

export default MobileModal;
