import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice, { authSliceActions } from "./slices/AuthSlice";

const authMiddleware = () => (next) => (action) => {
  if (authSliceActions.login.match(action)) {
    localStorage.setItem('Authorization', action.payload);
    localStorage.setItem('ExpirationTime', new Date().getTime() + 600000);
  } else if (authSliceActions.logout.match(action)) {
    localStorage.clear();
  }
  return next(action);
};

const store = configureStore({
  reducer: combineReducers({ 
      authentication: authSlice.reducer
  }),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authMiddleware)
});

export default store;