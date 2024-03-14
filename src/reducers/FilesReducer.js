import {
  SET_FILE,
  CREATE_FILE,
  FILES_RECEIVED,
  SET_PROPERTY_FILE,
  SET_TOTAL_FILES,
  FILE_UPLOADED,
  CLEAR_UPLOADS,
} from "../types/files";

const schema = {};

const filesReducer = (state, { type, payload }) => {
  switch (type) {
    case CLEAR_UPLOADS:
      return { ...state, uploaded: [], uploadedCount: 0, total: 0 };
    case SET_TOTAL_FILES: {
      let total = payload;
      if (Array.isArray(total) || total.length) {
        total = total.length;
      }
      return { ...state, total };
    }
    case FILE_UPLOADED:
      let { uploaded, uploadedCount } = state;
      if (!Array.isArray(uploaded)) {
        uploaded = [];
      }
      if (typeof payload === "object") {
        uploaded.push(payload);
      }
      if (isNaN(parseInt(uploadedCount))) {
        uploadedCount = 0;
      }
      uploadedCount++;
      return { ...state, uploaded, uploadedCount };
    case FILES_RECEIVED:
      return { ...state, files: payload };
    case SET_FILE:
      return { ...state, file: payload };
    case CREATE_FILE:
      return { ...state, file: schema };
    case SET_PROPERTY_FILE: {
      const { key, value } = payload;
      const file = { ...state.file };
      file[key] = value;
      return { ...state, file };
    }
    default:
      return { ...state };
  }
};

export default filesReducer;
