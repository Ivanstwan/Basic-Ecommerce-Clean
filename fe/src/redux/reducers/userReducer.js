const INITIAL_STATE = {
  id: 0,
  full_name: "",
  email: "",
  alamat: "",
  role: null,
  verified: null,
  loading: false,
  error: "",
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "GREET_ME":
      return { ...state, message: "greet me" };
    case "GREET_WORLD":
      return { ...state, message: "greet WORLD" };
    case "MESSAGE_CHANGE":
      return {
        ...state,
        loading: true,
      };
    case "MESSAGE_CHANGED_1":
      return {
        ...state,
        ...action.payload,
      };
    case "LOADING":
      return {
        ...state,
        loading: true,
      };
    case "USER_LOGIN":
      return {
        ...state,
        ...action.payload,
        loading: false,
      };
    case "USER_LOGOUT":
      return {
        ...INITIAL_STATE,
      };
    default:
      return state;
  }
};

export default userReducer;
