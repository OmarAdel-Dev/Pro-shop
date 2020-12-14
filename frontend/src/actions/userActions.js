import axios from "axios";

export const userLogin = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: "USER_LOGIN_REQUEST" });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/users/login",
      { email, password },
      config
    );

    dispatch({ type: "USER_LOGIN_SUCCESS", payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: "USER_LOGIN_FAIL",
      payload:
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.response,
    });
  }
};

export const userLogout = () => async (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: "USER_LOGOUT" });
};

export const userRegister = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: "USER_REGISTER_REQUEST" });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/users",
      { name, email, password },
      config
    );

    dispatch({ type: "USER_REGISTER_SUCCESS", payload: data });

    dispatch({ type: "USER_LOGIN_SUCCESS", payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: "USER_REGISTER_FAIL",
      payload:
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.response,
    });
  }
};
