import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  applicants: [],

  error: null,
};

const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    setApplicants: (state, action) => {
      state.applicants = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setApplicants,setError } = applicationSlice.actions;
export default applicationSlice.reducer;