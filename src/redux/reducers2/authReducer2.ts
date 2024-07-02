// import { REMOVE_USER_DETAILS, SET_USER_DETAILS } from "../types";
// import { UserActionTypes, UserDetails } from "../actions/authAction";

// export interface UserState {
//   userDetails: UserDetails | null;
// }

// const initialState: UserState = {
//   userDetails: null,
// };

// const userReducer = (state = initialState,action: UserActionTypes): UserState => {
//   switch (action.type) {
//     case SET_USER_DETAILS:
//       return { ...state, userDetails: action.payload };
//     case REMOVE_USER_DETAILS:
//       return { ...state, userDetails: null };
//     default:
//       return state;
//   }
// };

// export default userReducer;
