import { useContext, useEffect, useState } from "react";
import { ModalContext } from "../context/ModalContext";
import { IonApp, IonButton, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonList, IonModal, IonTextarea } from "@ionic/react";
import ProgressBar from "./ProgressBar";
import { UserContext } from "../context/UserContext";
import useLocalStorage from "../hooks/useLocalStorage";

const MobileModal = () => {
  const [name, setName] = useState("");
  const [validName, setValidName] = useState(false);
  const [content, setContent] = useState("");
  const [spinner, setSpinner] = useState(false);
  const [needLogin, setNeedLogin] = useState(false);


  const {
    title,
    component,
    children,
    clearModal,
    showModal,
    total, 
    uploadedCount, 
  } = useContext(ModalContext);

  const { user, signUp } = useContext(UserContext);

  const { saveData, storage } = useLocalStorage();


  useEffect(() => {
    console.log(storage);
  }, []);


  // useEffect(() => {
  //   if (user !== null && needLogin) {
  //     if (user.user_id && user.user_id !== null) {
  //       setNeedLogin(false);
  //       // handleUpload();
  //     }
  //   }

  //   if (user !== null) {
  //     if (user.name !== null) {
  //       setName(user.name);
  //     }
  //   }
  // }, [user]);


  const validateName = () => {
    if(name.length > 0) {
      return true;
    } else {
      return false;
    }
  }


  const handleSave = () => {
    console.log('handle save');
    console.log(name);
    console.log(validateName());
    console.log(storage);

    if(validateName()) {
      setSpinner(true);

      if(storage.userId === null) {
        signUp()
      }

    }
  };

  const handleCancel = () => {
    clearModal();
  };

  const handleChangeName = (event) => {
    console.log(event);
    const value = event.target.value;
    console.log(value);
    setName(value);
  };

  const handleChangeContent = (event) => {
    setContent(event.target.value);
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
        leaveAnimation={false}
        onDidDismiss={handleCancel}
      >

          <IonGrid class="pt-4 overflow-hidden">

            {title && title !== "" ? <h2 className="text-primary text-center mt-3">{title}</h2> : ""}

            <div className="p-3 pt-0 overflow-scroll" style={{flex: 1}}>
              {component}
              {children}

              <IonList>
                <IonItem>
                  <input 
                    onChange={handleChangeName}
                    value={name}
                    label="Nombre del Invitado" 
                    // labelPlacement="floating" 
                    type="text"
                    size={24}
                  />
                </IonItem>

                <IonItem>
                  <IonTextarea
                    onChange={handleChangeContent}
                    placeholder="Comentario (opcional)"
                    autoGrow={true}
                    value={content}
                    rows={4}
                  ></IonTextarea>
                </IonItem>
              </IonList>

              {renderProgress()}

              <button
                type="button"
                disabled={spinner}
                onClick={handleSave}
                className="gradient btn text-white text-capitalize fw-bold mt-4 w-100"
          
              >
                {spinner ? <div className="spinner-border" /> : "SUBIR"}
              </button>
              
              <button
                type="button"
                onClick={handleCancel}
                className="btn text-muted w-100 my-3 z-10"
              >
                Cancelar
              </button>
            </div>
          </IonGrid>
      </IonModal>
    </>
  );
};

export default MobileModal;
