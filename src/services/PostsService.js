
import api from './api';

const route = '/posts';

export default {
  getPosts: () => api.get(route),
  getSinglePost: (post_id) => api.get(`${route}/${post_id}`),
  postPost: (post) => api.post(route, { ...post}),
  putPost: (post) => api.put(route, { ...post}),
  deletePost: (Post) => api.delete(`${route}/${Post}`),
};
