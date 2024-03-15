import React, { createContext, useReducer, useContext } from "react";
import PostsService from "../services/PostsService";
import PostsReducer from "../reducers/PostsReducer";
import {
  SET_POST,
  CREATE_POST,
  POSTS_RECEIVED,
  SET_PROPERTY_POST,
} from "../types/posts";
import { ModalContext } from "./ModalContext";
import { HIDE_SPINNER, SHOW_SPINNER } from "../types";

const initialState = {
  posts: null,
  post: null,
};

export const PostsContext = createContext(initialState);

export const PostsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(PostsReducer, initialState);

  const { alert, success, clearModal } = useContext(ModalContext);

  const getPosts = () => {
    PostsService.getPosts()
      .then((response) => {
        const { posts } = response.data;
        dispatch({ type: POSTS_RECEIVED, payload: posts });
      })
      .catch((error) => {
        alert(error);
      });
  };

  const getSinglePost = (post_id) => {
    PostsService.getSinglePost(post_id)
      .then((response) => {
        const { post } = response.data;
        dispatch({ type: SET_POST, payload: post });
      })
      .catch((error) => {
        alert(error);
      });
  };

  const setPost = (post) => {
    dispatch({ type: SET_POST, payload: post });
  };

  const createPost = () => {
    dispatch({ type: CREATE_POST });
  };

  const setPropertyPost = (key, value) => {
    dispatch({ type: SET_PROPERTY_POST, payload: { key, value } });
  };

  const savePost = async (post, callback) => {
    dispatch({ type: SHOW_SPINNER });
    let service = PostsService.putPost;

    if (isNaN(parseInt(post.post_id))) {
      service = PostsService.postPost;
    }

    return await service(post)
      .then((res) => {
        success("Post saved.");
        dispatch({ type: HIDE_SPINNER });
        clearModal();
        if (typeof callback === "function") {
          callback();
        }
        return res.data.post;
      })
      .catch((error) => {
        dispatch({ type: HIDE_SPINNER });
        alert(error);
      });
  };

  const deletePost = (post_id, callback) => {
    dispatch({ type: SHOW_SPINNER });
    PostsService.deletePost(post_id)
      .then(() => {
        success("Post deleted.");
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
    <PostsContext.Provider
      value={{
        ...state,
        setPost,
        getPosts,
        savePost,
        deletePost,
        createPost,
        getSinglePost,
        setPropertyPost,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};
