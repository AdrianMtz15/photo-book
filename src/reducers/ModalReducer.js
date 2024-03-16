import {
  SHOW_MODAL,
  SET_RESPONSE,
  HIDE_MODAL,
  CLEAR,
  MODAL_COMPONENT,
  SHOW_ALERT,
  SHOW_SUCCESS,
  CLEAR_ALERT,
  CLEAR_SUCCESS,
  CLEAR_MODAL,
} from "../types";
import { hideModal } from "../utils";

const ModalReducer = function (state, { type, payload }) {
  switch (type) {
    case SHOW_MODAL:
      return {
        ...state,
        title: "Precaución",
        showModal: true,
        content: payload.content,
        callback: payload.callback,
      };
    case HIDE_MODAL:
      return { ...state, show: false, showModal: false };
    case SET_RESPONSE:
      return { ...state, response: payload };
    case MODAL_COMPONENT:
      // console.log(payload);
      return {
        ...state,
        showModal: true,
        ...payload,
      };
    case CLEAR_MODAL:
      if (state.show || state.showModal) {
        // hideModal();
      }
      
      return {
        ...state,
        show: false,
        no_padding: false,
        size: "",
        centered: false,
        showModal: false,
        content: "",
        component: "",
        title: "",
        onClose: "",
        callback: "",
      };
    case SHOW_ALERT:
      return { ...state, showAlert: true, alertContent: payload };
    case CLEAR_ALERT:
      return { ...state, showAlert: false, alertContent: "" };
    case CLEAR:
      return {
        ...state,
        show: false,
        no_padding: false,
        size: "",
        centered: false,
        showModal: false,
        content: "",
        component: "",
        title: "",
        onClose: "",
        callback: "",
      };
    case SHOW_SUCCESS:
      return { ...state, showSuccess: true, successContent: payload };
    case CLEAR_SUCCESS:
      return { ...state, showSuccess: false, successContent: "" };
    default:
      return { ...state };
  }
};

export default ModalReducer;
