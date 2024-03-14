
import {
  SET_POST,
  CREATE_POST,
  POSTS_RECEIVED,
  SET_PROPERTY_POST,
} from "../types/posts";

const schema = {

}

const postsReducer = (state, { type, payload }) => {
  switch (type) {
    case POSTS_RECEIVED:
      return { ...state, posts: payload };
    case SET_POST:
      return { ...state, post: payload };
    case CREATE_POST:
      return { ...state, post: schema };
    case SET_PROPERTY_POST: {
      const { key, value } = payload;
      const post = { ...state.post };
      post[key] = value;
      return { ...state, post };
    }
    default:
      return { ...state};
  }
};

export default postsReducer;
