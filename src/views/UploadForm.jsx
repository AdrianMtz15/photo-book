import { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import FilesService from "../services/FilesService";
import { PostsContext } from "../context/PostsContext";
import FilesPreview from "../components/FilesPreview";
import ProgressBar from "../components/ProgressBar";
import { FilesContext } from "../context/FilesContext";

const UploadForm = ({ files, srcSet, handleCancel, handleCallback }) => {
  const [needLogin, setNeedLogin] = useState(false);
  const [editName, setEditName] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [content, setContent] = useState("");
  const [name, setName] = useState("");

  const { total, uploadedCount, setTotalFiles, fileUploaded } =
    useContext(FilesContext);

  const { user, signUp } = useContext(UserContext);

  const { savePost } = useContext(PostsContext);

  useEffect(() => {
    if (user !== null && needLogin) {
      if (user.user_id && user.user_id !== null) {
        setNeedLogin(false);
        handleUpload();
      }
    }

    if (user !== null) {
      if (user.name !== null) {
        setName(user.name);
      }
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user === null) {
      setNeedLogin(true);
      return signUp();
    }
    handleUpload();
  };

  const handleUpload = () => {
    const filesResult = [];
    const promises = [];
    setSpinner(true);
    setTotalFiles(files);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const formData = FilesService.getFormData(file);
      
      promises.push(
        new Promise((resolve, reject) => {
          FilesService.postFile(formData)
            .then((res) => {
              const { file_id } = res.data;
              filesResult.push(file_id);
              fileUploaded(res.data.file);
              resolve();
            })
            .catch(reject);
        })
      );
    }

    Promise.all(promises).then(() => {
      setSpinner(false);
      const postPayload = {
        files: filesResult,
        content,
        name,
      };
      if (content !== "") {
        return savePost(postPayload, handleCallback);
      }
      handleCallback();
    });
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

  const renderFiles = () => {
    if (Array.isArray(srcSet) || srcSet.length > 0) {
      return <FilesPreview files={srcSet} />;
    }
  };

  const renderName = () => {
    if (user?.name === null || editName) {
      return (
        <div>
          <label>Nombre</label>
          <input
            type="text"
            value={name}
            className="form-control mb-3"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      );
    }
    return (
      <div className="row align-items-center">
        <div className="col-9">
          <span>{user?.name}</span>
        </div>
        <div className="col-3">
          <button
            type="button"
            onClick={() => setEditName(true)}
            className="btn text-primary"
          >
            <i className="fa fa-edit" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="card shadow p-3 text-start">
      {renderFiles()}
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          {renderName()}
          <label>Comentario (opcional)</label>
          <textarea
            rows="2"
            value={content}
            className="form-control mb-3"
            onChange={(e) => setContent(e.target.value)}
          />
          {renderProgress()}
          <button
            type="submit"
            disabled={spinner}
            className="btn btn-primary w-100"
          >
            {spinner ? <div className="spinner-border" /> : "Subir"}
          </button>
          <button
            type="button"
            disabled={spinner}
            onClick={handleCancel}
            className="btn text-muted w-100 my-3"
          >
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadForm;
