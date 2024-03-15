import api from "./api";

const route = "/files";

const FilesService = {
  getFiles: () => api.get(route),
  getSingleFile: (file_id) => api.get(`${route}/${file_id}`),
  getFormData: (file, data) => {
    const formData = new FormData();
    formData.append("file", file);

    const fileData = JSON.stringify(data);
    formData.append("file_data", fileData);

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
