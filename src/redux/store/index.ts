import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../createSlice/authSlice";
import flowerReducer from "../createSlice/flowerSlice";
// import starBackgroundColorReducer from "../createSlice/starBackgroundColorSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    flower: flowerReducer,
    // starBackgroundColor: starBackgroundColorReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
