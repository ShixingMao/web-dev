import { Routes, Route, Navigate } from "react-router";
import Account from "./Account";
import Dashboard from "./Dashboard";
import KambazNavigation from "./Navigation";
import Courses from "./Courses";
import Assignments from "./Courses/Assignments";
import "./styles.css";
import ProtectedRoute from "./Account/ProtectedRoute";
import ProtectedCourseRoute from "./ProtectedCourseRoute";
import Session from "../Account/Session";
import * as userClient from "./Account/client";
import { useEffect, useState } from "react";
import { useSelector} from "react-redux";
import * as courseClient from "./Courses/client";

export default function Kambaz() {
  const [courses, setCourses] = useState<any[]>([]);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { course } = useSelector((state: any) => state.coursesReducer);
  
  const fetchCourses = async () => {
    try {
      console.log("Fetching enrolled courses for user:", currentUser?._id);
      const courses = await userClient.findMyCourses();
      console.log("Fetched enrolled courses:", courses);
      setCourses(courses);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };
  useEffect(() => {
    if (currentUser) {
      console.log("Current user detected, fetching courses");
      fetchCourses();
    } else {
      console.log("No current user, clearing courses");
      setCourses([]);
    }
  }, [currentUser]);
  
  // Add a new course
  const addNewCourse = async () => {
    try {
      console.log("Adding new course:", course);
      const newCourse = await userClient.createCourse(course);
      console.log("Added course response:", newCourse);
      setCourses([...courses, newCourse]);
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };
  
  const deleteCourse = async (courseId: string) => {
    await courseClient.deleteCourse(courseId);
    setCourses(courses.filter((course) => course._id !== courseId));
};

    const updateCourse = async () => {
    try {
      if (!course._id) {
        console.error("Cannot update course without an ID");
        return;
      }
      
      console.log("Updating course:", course);
      await courseClient.updateCourse(course);
      setCourses(courses.map((c) => {
        if (c._id === course._id) {
          return course;
        } else {
          return c;
        }
      }));
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  
  return (
    <Session>
      <div id="wd-kambaz">
        <KambazNavigation />
        <div className="wd-main-content-offset p-3">
          <Routes>
            <Route path="/" element={<Navigate to="/Kambaz/Account" />} />
            <Route path="/Account/*" element={<Account />} />
            <Route
              path="Dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard 
                    courses={courses}
                    addNewCourse={addNewCourse}
                    updateCourse={updateCourse}
                    deleteCourse={deleteCourse}
                  />
                </ProtectedRoute>
              }
            />
            <Route path="Assignments" element={<Assignments />} />
            <Route
              path="Courses/:cid/*"
              element={
                <ProtectedCourseRoute>
                  <Courses />
                </ProtectedCourseRoute>
              }
            />
            <Route path="/Calendar" element={<h1>Calendar</h1>} />
            <Route path="/Inbox" element={<h1>Inbox</h1>} />
          </Routes>
        </div>
      </div>
    </Session>
  );
}