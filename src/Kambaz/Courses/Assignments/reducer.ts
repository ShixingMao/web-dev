// src/Kambaz/Courses/Assignments/reducer.ts
import { createSlice } from "@reduxjs/toolkit";
import { assignments as dbAssignments } from "../../Database";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  assignments: dbAssignments,
  currentAssignment: null,
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    addAssignment: (state, { payload }) => {
      const newAssignment = {
        _id: uuidv4(),
        title: payload.title || "Untitled Assignment",
        description: payload.description || "",
        points: payload.points ?? 100,
        dueDate: payload.dueDate || "",
        availableFrom: payload.availableFrom || "",
        availableUntil: payload.availableUntil || "",
        course: payload.course,
      };
      state.assignments.push(newAssignment);
    },
    deleteAssignment: (state, { payload: id }) => {
      state.assignments = state.assignments.filter(a => a._id !== id);
    },
    updateAssignment: (state, { payload }) => {
      state.assignments = state.assignments.map(a =>
        a._id === payload._id ? payload : a
      );
    },
    setCurrentAssignment: (state, { payload }) => {
      state.currentAssignment = payload;
    },
    clearCurrentAssignment: (state) => {
      state.currentAssignment = null;
    },
  },
});

export const {
  addAssignment,
  deleteAssignment,
  updateAssignment,
  setCurrentAssignment,
  clearCurrentAssignment,
} = assignmentsSlice.actions;

export default assignmentsSlice.reducer;
