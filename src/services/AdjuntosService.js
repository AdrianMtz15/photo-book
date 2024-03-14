import api from "./api";

const route = "/files";

const FilesService = {
  getFile: () => api.get(route),
  getFormData: (file) => {
    const formData = new FormData();
    formData.append("file", file);
    return formData;
  },
  postFile: (formData) =>
    api.post(route, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
};

export default FilesService;
