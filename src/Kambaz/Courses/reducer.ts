// src/Kambaz/Courses/reducer.ts
import { createSlice } from "@reduxjs/toolkit";
import { courses as initialCourses } from "../Database";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  courses: initialCourses,
  course: {
    _id: uuidv4(),
    name: "New Course",
    number: "",
    startDate: "",
    endDate: "",
    department: "",
    credits: 0,
    description: "",
  },
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setCourse: (state, action) => {
      state.course = action.payload;
    },
    addCourse: (state) => {
      const newCourse = {
        ...state.course,
        _id: uuidv4(),
      };
      state.courses.push(newCourse);
    },
    updateCourse: (state) => {
      state.courses = state.courses.map((c) =>
        c._id === state.course._id ? state.course : c
      );
    },
    deleteCourse: (state, action) => {
      state.courses = state.courses.filter(
        (course) => course._id !== action.payload
      );
    },
  },
});

export const {
  setCourse,
  addCourse,
  updateCourse,
  deleteCourse,
} = coursesSlice.actions;

export default coursesSlice.reducer;
