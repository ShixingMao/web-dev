import axios from "axios";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const ASSIGNMENTS_API = `${REMOTE_SERVER}/api/assignments`;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;

// Fetch all assignments
export const fetchAllAssignments = async () => {
  const { data } = await axios.get(ASSIGNMENTS_API);
  return data;
};

// Fetch assignment by ID
export const fetchAssignmentById = async (assignmentId: string) => {
  const { data } = await axios.get(`${ASSIGNMENTS_API}/${assignmentId}`);
  return data;
};

// Fetch assignments for a course
export const fetchAssignmentsForCourse = async (courseId: string) => {
  const { data } = await axios.get(`${COURSES_API}/${courseId}/assignments`);
  return data;
};

// Create a new assignment for a course
export const createAssignment = async (courseId: string, assignment: any) => {
  const { data } = await axios.post(`${COURSES_API}/${courseId}/assignments`, assignment);
  return data;
};

// Update an assignment
export const updateAssignment = async (assignmentId: string, assignment: any) => {
  const { data } = await axios.put(`${ASSIGNMENTS_API}/${assignmentId}`, assignment);
  return data;
};

// Delete an assignment
export const deleteAssignment = async (assignmentId: string) => {
  const { data } = await axios.delete(`${ASSIGNMENTS_API}/${assignmentId}`);
  return data;
};