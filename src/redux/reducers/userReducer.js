function userReducer(user = null, action) {
  switch (action.type) {
    case "LOGIN_USER":
      return action.payload;
    case "LOGOUT_USER":
      return null;
    default:
      return user;
  }
}

export default userReducer;
