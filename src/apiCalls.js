export const loginCall = async (userCredentials, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await fetch(`http://localhost:8800/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userCredentials),
    });
    const data = await res.json();
    dispatch({ type: "LOGIN_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "LOGIN_FAILURE", payload: error });
  }
};
