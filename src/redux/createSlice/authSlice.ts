import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserDetails {
  first_name: string;
  last_name: string;
}

export interface UserInitialState {
  userDetails: UserDetails | null;
}

const initialState: UserInitialState = {
  userDetails: null,
};

export const userSlice = createSlice({
  name: "userDetails",
  initialState,
  reducers: {
    setUserDetails: (state, action: PayloadAction<UserDetails>) => {
      state.userDetails = action.payload;
    },
    removeUserDetails: (state) => {
      state.userDetails = null;
    },
  },
});

export const { setUserDetails, removeUserDetails } = userSlice.actions;
export default userSlice.reducer;
