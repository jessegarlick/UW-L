// src/redux/reducer.js

const initialState = {
    username: "",
    role: null,
    isAuthenticated: false,
    permissions: [],
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case "USER_AUTH":
        return {
          ...state,
          username: action.payload.username,
          role: action.payload.role,
          isAuthenticated: true,
          permissions: action.payload.permissions,
        };
  
      case "LOGOUT":
        return {
          ...state,
          username: "",
          role: null,
          isAuthenticated: false,
          permissions: [],
        };
  
      default:
        return state;
    }
  };
  
  export default reducer;
  