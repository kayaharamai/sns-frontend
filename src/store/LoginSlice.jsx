import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "loginUser",
  initialState: {
    coverPicture: "",
    desc: "",
    email: "",
    id: "",
    isAdmin: "",
    password: "",
    profilePicture: "",
    userId: "user_sns",
    username: "user",
  },
  reducers: {
    loginCoverPicture: (state, action) => {
      state.coverPicture = action.payload;
    },
    loginDesc: (state, action) => {
      state.desc = action.payload;
    },
    loginEmail: (state, action) => {
      state.email = action.payload;
    },
    loginId: (state, action) => {
      state.id = action.payload;
    },
    loginIsAdmin: (state, action) => {
      state.isAdmin = action.payload;
    },
    loginPassword: (state, action) => {
      state.password = action.payload;
    },
    loginProfilePicture: (state, action) => {
      state.profilePicture = action.payload;
    },
    loginUserId: (state, action) => {
      state.userId = action.payload;
    },
    loginUsername: (state, action) => {
      state.username = action.payload;
    },
  },
});

export const {
  loginCoverPicture,
  loginDesc,
  loginEmail,
  loginId,
  loginIsAdmin,
  loginPassword,
  loginProfilePicture,
  loginUserId,
  loginUsername,
} = loginSlice.actions;
export default loginSlice.reducer;
