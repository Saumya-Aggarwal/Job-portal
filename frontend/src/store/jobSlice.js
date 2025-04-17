import { createSlice } from "@reduxjs/toolkit";
import { all } from "axios";

const initialState = {
  allJobs: [],
  allAdminJobs: [],
  singleJob: null,
  searchJobByText: "",
  jobError: null, // Add this line
};

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    //actions
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
  },
});

export const { setAllJobs, setSingleJob, setAllAdminJobs, setSearchJobByText, setJobError } = jobSlice.actions;
export default jobSlice.reducer;
