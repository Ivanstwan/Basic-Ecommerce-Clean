import { URL_API } from "../../helper";
import { GET_POSTS, GET_POSTS_FAILURE, GET_POSTS_SUCCESS } from "../types";
import Axios from "axios";

export const chgMsg = () => ({
  type: "MESSAGE_CHANGE",
});

export const loading = (data) => ({ type: "LOADING", payload: data });

export const changeMessage = () => {
  console.log("redux chg msg");
  return async (dispatch) => {
    dispatch(chgMsg());
    console.log("chg msg");
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
  console.log("masuk REDUX 1.login");
  console.log(data);
  return async (dispatch) => {
    console.log("masuk REDUX 1.1 hold");
    console.log(data);
    dispatch(loading(data));
    console.log("masuk REDUX 1.3 localStorage");
    console.log(`[REDUX data.token, set localStorage]`, data.token);
    localStorage.setItem("token", data.token);
    console.log("masuk REDUX 2.loading");
    console.log(data, "[check 'data' redux]");
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
      console.log("masuk REDUX 1.get token");
      const token = localStorage.getItem("token");
      const header = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      console.log("1.1 token get", token);
      console.log("1.2 header get", header);

      const response = await Axios.post(
        `${URL_API}/user/keeploggedin`,
        {},
        header
      );
      console.log(response, "[response]");
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
  console.log("[user action] user logout");
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
