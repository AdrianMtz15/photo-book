import React, { createContext, useReducer, useContext } from "react";
import FilesService from "../services/FilesService";
import FilesReducer from "../reducers/FilesReducer";
import {
  SET_FILE,
  FILE_UPLOADED,
  FILES_RECEIVED,
  SET_TOTAL_FILES,
  CLEAR_UPLOADS,
} from "../types/files";
import { HIDE_SPINNER, SHOW_SPINNER } from "../types";
import { ModalContext } from "./ModalContext";

const initialState = {
  uploadedCount: 0,
  uploaded: [],
  files: null,
  file: null,
  total: 0,
};

export const FilesContext = createContext(initialState);

export const FilesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(FilesReducer, initialState);

  const { alert, success, clearModal } = useContext(ModalContext);

  const getFiles = () => {
    FilesService.getFiles()
      .then((response) => {
        const { files } = response.data;
        dispatch({ type: FILES_RECEIVED, payload: files });
      })
      .catch((error) => {
        alert(error);
      });
  };

  const getSingleFile = (file_id) => {
    FilesService.getSingleFile(file_id)
      .then((response) => {
        const { file } = response.data;
        dispatch({ type: SET_FILE, payload: file });
      })
      .catch((error) => {
        alert(error);
      });
  };

  const setFile = (file) => {
    dispatch({ type: SET_FILE, payload: file });
  };

  const setTotalFiles = (files) => {
    dispatch({ type: SET_TOTAL_FILES, payload: files });
  };

  const fileUploaded = (file) => {
    console.log(file);
    dispatch({ type: FILE_UPLOADED, payload: file });
  };

  const clearUploads = () => {
    dispatch({ type: CLEAR_UPLOADS });
  };

  const saveFile = (file, callback) => {
    dispatch({ type: SHOW_SPINNER });
    let service = FilesService.putFile;
    if (isNaN(parseInt(file.file_id))) {
      service = FilesService.postFile;
    }
    service(file)
      .then(() => {
        success("File saved.");
        dispatch({ type: HIDE_SPINNER });
        clearModal();
        if (typeof callback === "function") {
          callback();
        }
      })
      .catch((error) => {
        dispatch({ type: HIDE_SPINNER });
        alert(error);
      });
  };

  const deleteFile = (file_id, callback) => {
    dispatch({ type: SHOW_SPINNER });
    FilesService.deleteFile(file_id)
      .then(() => {
        success("File deleted.");
        dispatch({ type: HIDE_SPINNER });
        clearModal();
        if (typeof callback === "function") {
          callback();
        }
      })
      .catch((error) => {
        dispatch({ type: HIDE_SPINNER });
        alert(error);
      });
  };

  return (
    <FilesContext.Provider
      value={{
        ...state,
        setFile,
        getFiles,
        saveFile,
        deleteFile,
        clearUploads,
        fileUploaded,
        getSingleFile,
        setTotalFiles,
      }}
    >
      {children}
    </FilesContext.Provider>
  );
};
