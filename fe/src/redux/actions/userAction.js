import { URL_API } from "../../helper";
import { GET_POSTS, GET_POSTS_FAILURE, GET_POSTS_SUCCESS } from "../types";
import Axios from "axios";

export const chgMsg = () => ({
  type: "MESSAGE_CHANGE",
});

export const loading = (data) => ({ type: "LOADING", payload: data });

export const changeMessage = () => {
  return async (dispatch) => {
    dispatch(chgMsg());
    try {
      dispatch({
        type: "MESSAGE_CHANGED_1",
        payload: {
          message: "message keganti niH ------------ !!!",
        },
      });
    } catch (err) {
      dispatch({
        type: "MESSAGE_ERROR",
        payload: err.message,
      });
    }
  };
};

export const userLogin = (data) => {
  return async (dispatch) => {
    dispatch(loading(data));
    localStorage.setItem("token", data.token);
    try {
      dispatch({
        type: "USER_LOGIN",
        payload: {
          email: data.email,
          password: data.password,
          role: data.role,
          id: data.id,
        },
      });
    } catch (err) {
      dispatch({
        type: "MESSAGE_ERROR",
        payload: err.message,
      });
    }
  };
};

export const userKeepLoggedIn = () => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      const header = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await Axios.post(
        `${URL_API}/user/keeploggedin`,
        {},
        header
      );

      dispatch({
        type: "USER_LOGIN",
        payload: {
          email: response.data.email,
          password: response.data.password,
          role: response.data.role,
          id: response.data.id,
        },
      });
    } catch (err) {
      dispatch({
        type: "MESSAGE_ERROR",
        payload: err.message,
      });
      localStorage.clear();
    }
  };
};

export const userLogout = () => {
  return async (dispatch) => {
    try {
      localStorage.removeItem("token");
      dispatch({
        type: "USER_LOGOUT",
      });
    } catch (err) {
      dispatch({
        type: "MESSAGE_ERROR",
        payload: err.message,
      });
      localStorage.clear();
    }
  };
};
