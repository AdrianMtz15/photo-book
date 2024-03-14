import api from "./api";

const route = "/users";

const UserService = {
  getCurrentUser: () => api.get(route),
  postUser: (user) => api.post(route, { ...user }),
};

export default UserService;
