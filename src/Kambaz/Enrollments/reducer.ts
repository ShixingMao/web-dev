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
  },
});

export const { enroll, unenroll } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;