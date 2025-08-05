import axios from "axios";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const USERS_API = `${REMOTE_SERVER}/api/users`;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;

// Fetch all enrollments for a user
export const fetchUserEnrollments = async (userId: string) => {
  const { data } = await axios.get(`${USERS_API}/${userId}/enrollments`);
  return data;
};

// Fetch all enrollments for a course
export const fetchCourseEnrollments = async (courseId: string) => {
  const { data } = await axios.get(`${COURSES_API}/${courseId}/enrollments`);
  return data;
};

// Enroll a user in a course
export const enrollStudentInCourse = async (userId: string, courseId: string) => {
  const { data } = await axios.post(`${USERS_API}/${userId}/enrollments/${courseId}`);
  return data;
};

// Unenroll a user from a course
export const unenrollStudentFromCourse = async (userId: string, courseId: string) => {
  const { data } = await axios.delete(`${USERS_API}/${userId}/enrollments/${courseId}`);
  return data;
};

// Check if a user is enrolled in a specific course
export const checkEnrollmentStatus = async (userId: string, courseId: string) => {
  try {
    const { data } = await axios.get(`${USERS_API}/${userId}/enrollments/${courseId}`);
    return { enrolled: true, data };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return { enrolled: false };
    }
    throw error;
  }
};