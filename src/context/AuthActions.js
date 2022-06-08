export const loginStart = (userCredentials) => ({
  type: "LOGIN_START",
});

export const loginSuccess = (user) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
});

export const loginFailure = (error) => ({
  type: "LOGIN_FAILURE",
  payload: error,
});

export const follow = (userId) => ({
  type: "FOLLOW",
  payload: userId,
});

export const unfollow = (userId) => ({
  type: "UNFOLLOW",
  payload: userId,
});

export const avatarUpdate = (photoURL) => ({
  type: "AVATAR_UPDATE",
  payload: photoURL,
});

export const coverUpdate = (photoURL) => ({
  type: "COVER_UPDATE",
  payload: photoURL,
});

// export const infoUpdate = (profileInfo) => ({
//   type: "INFO_UPDATE",
//   payload: profileInfo,
// });
