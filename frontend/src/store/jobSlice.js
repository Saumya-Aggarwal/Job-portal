import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allJobs: [],
  allAdminJobs: [],
  appliedJobs: [],
  singleJob: null,
  searchJobByText: "",
  jobError: null, 
  homeSearchJobByText: "",
};

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    setSingleJob: (state, action) => {
      state.singleJob = action.payload;
    },
    setAllAdminJobs: (state, action) => {
      state.allAdminJobs = action.payload;
    },
    setSearchJobByText: (state, action) => {
      state.searchJobByText = action.payload;
    },
    setJobError: (state, action) => {
      state.jobError = action.payload;
    },
    setAppliedJobs: (state, action) => {
      state.appliedJobs = action.payload;
    },
    setHomeSearchJobByText: (state, action) => {
      state.homeSearchJobByText = action.payload;
    },
  },
});

export const {
  setAllJobs,
  setSingleJob,
  setAllAdminJobs,
  setSearchJobByText,
  setJobError,
  setAppliedJobs,
  setHomeSearchJobByText
} = jobSlice.actions;
export default jobSlice.reducer;
