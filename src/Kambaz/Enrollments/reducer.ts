import { createSlice } from "@reduxjs/toolkit";
import { enrollments as dbEnrollments } from "../Database";

const initialState = {
  enrollments: dbEnrollments,
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    enroll: (state, { payload }) => {
      state.enrollments.push(payload);
    },
    unenroll: (state, { payload }) => {
      state.enrollments = state.enrollments.filter(
        (e) => e.user !== payload.user || e.course !== payload.course
      );
    },
    // Add the setEnrollments reducer
    setEnrollments: (state, { payload }) => {
      state.enrollments = payload;
    },
  },
});

export const { enroll, unenroll, setEnrollments } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;