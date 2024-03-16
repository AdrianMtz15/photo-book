import { useContext, useEffect, useState } from "react";
import { ModalContext } from "../context/ModalContext";
import {
  IonGrid,
  IonInput,
  IonItem,
  IonList,
  IonModal,
  IonTextarea,
} from "@ionic/react";
import ProgressBar from "./ProgressBar";
import { UserContext } from "../context/UserContext";
import useLocalStorage from "../hooks/useLocalStorage";
import { FilesContext } from "../context/FilesContext";
import { PostsContext } from "../context/PostsContext";
import FilesService from "../services/FilesService";

const MobileModal = () => {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [spinner, setSpinner] = useState(false);
  // const [needLogin, setNeedLogin] = useState(false);
  const [page, setPage] = useState(0);

  const { title, component, clearModal, showModal, total, uploadedCount } =
    useContext(ModalContext);

  const { user, signUp } = useContext(UserContext);
  const { getFiles, setSrcSet, setTotalFiles, inputFiles, fileUploaded, clearUploads } = useContext(FilesContext);
  const { savePost, getPosts, posts } = useContext(PostsContext);
  const { saveData, storage } = useLocalStorage();


  useEffect(() => {
    if(storage.name && storage.name.length > 0) {
      setName(storage.name);
    }
  }, [storage]);

  const fetchPosts = () => getPosts({ page });

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
    if (name.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  const handleSignUp = async () => {
    const { token, userId } = await signUp(name);

    saveData({
      ...storage,
      userId,
      token,
      name
    });

    return userId;
  };

  const handleCreatePost = async (userId) => {
    const newPost = await savePost({
      user_id: userId,
      content,
    });

    return newPost;
  };

  const handleCallback = () => {
    clearUploads();
    setSrcSet([]);
    getFiles();
  };

  const handleUpload = async (user_id, post_id) => {
    const promises = [];
    setSpinner(true);
    setTotalFiles(inputFiles);

    for (let i = 0; i < inputFiles.length; i++) {
      const file = inputFiles[i];
      const fileData = {
        user_id,
        post_id,
      };

      const formData = FilesService.getFormData(file, fileData);

      promises.push(
        new Promise((resolve, reject) => {
          FilesService.postFile(formData)
            .then((res) => {
              fileUploaded(res.data.file);
              resolve();
            })
            .catch(reject);
        })
      );
    }

    await Promise.all(promises);

    handleCallback();
  };

  const handleSave = async () => {
    let currentUserId;

    if (validateName()) {
      setSpinner(true);
      if (storage.userId === null || storage.userId === undefined) {
        currentUserId = await handleSignUp();
      } else {
        currentUserId = storage.userId;
      }

      const currentPost = await handleCreatePost(currentUserId);
      await handleUpload(currentUserId, currentPost.post_id);

      setSpinner(false);
    }
  };

  const handleCancel = () => {
    clearModal();
  };

  const handleChangeName = (event) => {
    const value = event.target.value;
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

  const renderUserName = () => {
    if(
      storage.userId !== null 
      && storage.userId !== undefined
      && storage.name?.length > 0
    ) {
      return (
        <p className="fz-5">{storage.name}</p>
      )
    } else {
      return(
        <IonInput 
          onIonInput={handleChangeName}
          value={name}
          label="Nombre del Invitado" 
          labelPlacement="floating" 
          type="text"
          size={24}
        />
      )
    }
  }

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
          {title && title !== "" ? (
            <h2 className="text-primary text-center mt-3">{title}</h2>
          ) : (
            ""
          )}

          <div className="p-3 pt-0 overflow-scroll" style={{ flex: 1 }}>
            {component}

            <IonList>
              <IonItem>
                {renderUserName()}
              </IonItem>

              <IonItem>
                <IonTextarea
                  onIonInput={handleChangeContent}
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
