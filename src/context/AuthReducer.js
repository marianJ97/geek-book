const AuthRecuder = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return { user: null, isFetching: true, error: false };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        isFetching: false,
        error: false,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        isFetching: false,
        error: action.payload,
      };
    case "FOLLOW":
      return {
        ...state,
        user: {
          ...state.user,
          following: [...state.user.following, action.payload],
        },
      };
    case "UNFOLLOW":
      return {
        ...state,
        user: {
          ...state.user,
          following: state.user.following.filter(
            (following) => following !== action.payload
          ),
        },
      };
    case "AVATAR_UPDATE":
      return {
        ...state,
        user: {
          ...state.user,
          profilePicture: action.payload,
        },
      };
    case "COVER_UPDATE":
      return {
        ...state,
        user: {
          ...state.user,
          coverPicture: action.payload,
        },
      };
    // case "INFO_UPDATE":
    //   return {
    //     ...state,
    //     user: {
    //       ...state.user,
    //       coverPicture: action.payload,
    //     },
    //   };
    default:
      return state;
  }
};

export default AuthRecuder;
