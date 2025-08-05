import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  Row, Col, Card, Button, FormControl
} from "react-bootstrap";
import {
  addCourse,
  deleteCourse,
  updateCourse,
  setCourse,
} from "./Courses/reducer";
import {
  setEnrollments
} from "./Enrollments/reducer";
import { useState, useEffect } from "react";
import * as courseClient from "./Courses/client";
import * as enrollmentClient from "./Enrollments/client";

// Define interfaces for type safety
interface Course {
  _id: string;
  name: string;
  description: string;
  [key: string]: any;
}

interface Enrollment {
  _id: string;
  user: string;
  course: string;
  [key: string]: any;
}

interface DashboardProps {
  courses?: Course[];
  addNewCourse?: () => Promise<void>;
  updateCourse?: () => Promise<void>;
  deleteCourse?: (id: string) => Promise<void>;
}

export default function Dashboard(props: DashboardProps = {}) {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { courses: reduxCourses, course } = useSelector((state: any) => state.coursesReducer);
  const isFaculty = currentUser?.role === "FACULTY";

  const [showAll, setShowAll] = useState(false);
  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [enrollmentLoading, setEnrollmentLoading] = useState(false);
  const [userEnrollments, setUserEnrollments] = useState<Enrollment[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);

  // Combine props.courses and reduxCourses to get all available courses
  const allAvailableCourses = [
    ...(props.courses || []),
    ...((reduxCourses || []) as Course[])
  ].reduce((unique: Course[], course: Course) => {
    // Remove duplicates based on _id
    if (!unique.some(c => c._id === course._id)) {
      unique.push(course);
    }
    return unique;
  }, [] as Course[]);

  // Server-side enrollment management
  const loadUserEnrollments = async () => {
    if (!currentUser?._id) return;
    
    try {
      setEnrollmentLoading(true);
      console.log("Fetching user enrollments from server...");
      const rawEnrollments = await enrollmentClient.fetchUserEnrollments(currentUser._id);
      console.log("Raw enrollments from server:", rawEnrollments);
      
      // Filter out any invalid enrollments
      const validEnrollments = Array.isArray(rawEnrollments) 
        ? rawEnrollments.filter((e: any) => 
            e && typeof e === 'object' && e._id && e.user && e.course
          )
        : [];
      
      console.log("Filtered valid enrollments:", validEnrollments);
      
      // Update both local state and Redux
      setUserEnrollments(validEnrollments);
      dispatch(setEnrollments(validEnrollments));
      
      return validEnrollments;
    } catch (error) {
      console.error("Error loading enrollments from server:", error);
      return [];
    } finally {
      setEnrollmentLoading(false);
    }
  };

  // Fetch enrolled courses specifically when toggling to My Courses view
  const fetchEnrolledCourses = async () => {
    console.log("Fetching enrolled courses...");
    await loadUserEnrollments();
  };

  // Load enrollments when component mounts or user changes or refresh is triggered
  useEffect(() => {
    loadUserEnrollments();
  }, [currentUser, refreshKey]);

  // Get course IDs the user is enrolled in
  const enrolledCourseIds = userEnrollments
    .filter(e => e.user === currentUser?._id)
    .map(e => e.course);

  // Toggle showAll and reload appropriate courses
  const toggleShowAll = () => {
    const newShowAll = !showAll;
    setShowAll(newShowAll);
    
    // If switching to "My Courses" view, fetch latest enrollments
    if (!newShowAll) {
      fetchEnrolledCourses();
    }
  };

  // Get visible courses based on current view and enrollments
  const getVisibleCourses = () => {
    if (showAll) {
      return allCourses.length > 0 ? allCourses : allAvailableCourses;
    } else {
      // Filter all available courses (both from props and Redux) by enrollment
      return allAvailableCourses.filter((c: Course) =>
        enrolledCourseIds.includes(c._id)
      );
    }
  };

  const visibleCourses = getVisibleCourses();

  const fetchAllCourses = async () => {
    try {
      setIsLoading(true);
      const fetchedCourses = await courseClient.fetchAllCourses();
      console.log("Fetched all courses:", fetchedCourses);
      setAllCourses(fetchedCourses);
    } catch (error) {
      console.error("Error fetching all courses:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (showAll) {
      fetchAllCourses();
    }
  }, [showAll]);

  // Debug logging
  useEffect(() => {
    console.log("Dashboard rendered with:");
    console.log("- Prop courses:", props.courses);
    console.log("- Redux courses:", reduxCourses);
    console.log("- All available courses:", allAvailableCourses);
    console.log("- Visible courses:", visibleCourses);
    console.log("- User enrollments:", userEnrollments);
    console.log("- Enrolled course IDs:", enrolledCourseIds);
  }, [props.courses, reduxCourses, allAvailableCourses, visibleCourses, userEnrollments, enrolledCourseIds]);

  // Handle enrollment with server API
  const handleEnroll = async (courseId: string) => {
    if (!currentUser?._id) {
      console.error("Cannot enroll: No current user");
      return;
    }
    
    try {
      setEnrollmentLoading(true);
      
      // Call server API to enroll user
      const enrollment = await enrollmentClient.enrollStudentInCourse(currentUser._id, courseId);
      console.log("Enrolled via server API:", enrollment);
      
      // Add the new enrollment to the local state for immediate UI update
      setUserEnrollments(prev => [...prev, enrollment]);
      
      // Trigger a refresh to ensure consistency with server
      setRefreshKey(prev => prev + 1);
    } catch (error) {
      console.error("Error enrolling in course:", error);
      alert("Failed to enroll in course. Please try again.");
    } finally {
      setEnrollmentLoading(false);
    }
  };

  // Handle unenrollment with server API
  const handleUnenroll = async (courseId: string) => {
    if (!currentUser?._id) {
      console.error("Cannot unenroll: No current user");
      return;
    }
    
    try {
      setEnrollmentLoading(true);
      
      // Call server API to unenroll
      await enrollmentClient.unenrollStudentFromCourse(currentUser._id, courseId);
      console.log("Unenrolled via server API");
      
      // Remove the enrollment from local state for immediate UI update
      setUserEnrollments(prev => 
        prev.filter(e => !(e.user === currentUser._id && e.course === courseId))
      );
      
      // Trigger a refresh to ensure consistency with server
      setRefreshKey(prev => prev + 1);
    } catch (error) {
      console.error("Error unenrolling from course:", error);
      alert("Failed to unenroll from course. Please try again.");
    } finally {
      setEnrollmentLoading(false);
    }
  };

  // Handle course creation with auto-enrollment and data refresh
const handleAddCourse = async () => {
  try {
    setIsLoading(true);
    
    if (props.addNewCourse) {
      // Use server API
      await props.addNewCourse();
      console.log("Course added via server API");
      
      // Fetch all courses to get the newly created one
      await fetchAllCourses();
      
      // Get the latest courses to find the newly created one
      const courses = await courseClient.fetchAllCourses();
      if (courses && courses.length > 0) {
        // Assume the newest course is the last one
        const newCourse = courses[courses.length - 1];
        
        // Auto-enroll the creator
        if (newCourse && newCourse._id) {
          await handleEnroll(newCourse._id);
        }
      }
    } else {
      // Use Redux for UI update
      dispatch(addCourse());
      
      // For Redux we need to wait a bit for the state to update
      setTimeout(async () => {
        if (reduxCourses && reduxCourses.length > 0) {
          const latestCourse = reduxCourses[reduxCourses.length - 1];
          if (latestCourse && latestCourse._id) {
            await handleEnroll(latestCourse._id);
          }
        }
        
        // Refresh data based on current view
        if (showAll) {
          await fetchAllCourses();
        }
      }, 100);
    }
    
    // Trigger a general refresh to ensure UI consistency
    setRefreshKey(prev => prev + 1);
  } catch (error) {
    console.error("Error adding course with auto-enrollment:", error);
    alert("Failed to create course. Please try again.");
  } finally {
    setIsLoading(false);
  }
};

  // Handle course deletion with data refresh
  const handleDeleteCourse = async (id: string) => {
    try {
      setIsLoading(true);
      
      if (props.deleteCourse) {
        // Delete using server API
        await props.deleteCourse(id);
        console.log("Course deleted via server API");
      } else {
        // Delete using Redux
        dispatch(deleteCourse(id));
      }
      
      // Refresh data based on current view
      if (showAll) {
        // If in "All Courses" view, fetch updated course list
        await fetchAllCourses();
      } else {
        // If in "My Courses" view, refresh enrollments to update the view
        await loadUserEnrollments();
      }
      
      // Trigger general refresh to ensure UI consistency
      setRefreshKey(prev => prev + 1);
    } catch (error) {
      console.error("Error deleting course:", error);
      alert("Failed to delete course. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateCourse = () => {
    if (props.updateCourse) {
      props.updateCourse().then(() => {
        console.log("Course updated via server API");
      }).catch(error => {
        console.error("Error updating course via server:", error);
      });
    } else {
      dispatch(updateCourse());
    }
  };

  const handleEditCourse = (course: Course) => {
    dispatch(setCourse(course));
  };

  console.log("Current user ID:", currentUser?._id);
  
  return (
    <div id="wd-dashboard" className="p-4">
      <h1 id="wd-dashboard-title">
        Dashboard
        <Button
          variant="primary"
          className="float-end"
          onClick={toggleShowAll}
          disabled={isLoading || enrollmentLoading}
        >
          {showAll ? "My Courses" : "All Courses"}
        </Button>
      </h1>
      <hr />

      {isFaculty && (
        <>
          <h5>
            New Course
            <button 
              className="btn btn-primary float-end"
              onClick={handleAddCourse}
              id="wd-add-new-course-click"
              disabled={isLoading || enrollmentLoading}
            >
              {isLoading ? "Adding..." : "Add"}
            </button>
            <button 
              className="btn btn-warning float-end me-2"
              onClick={handleUpdateCourse}
              id="wd-update-course-click"
              disabled={isLoading || enrollmentLoading}
            >
              Update
            </button>
          </h5>
          <br />
          <FormControl
            value={course.name || ""}
            className="mb-2"
            onChange={(e) =>
              dispatch(setCourse({ ...course, name: e.target.value }))
            }
          />
          <FormControl
            as="textarea"
            value={course.description || ""}
            rows={3}
            onChange={(e) =>
              dispatch(setCourse({ ...course, description: e.target.value }))
            }
          />
          <hr />
        </>
      )}

      <h2 id="wd-dashboard-published">
        {showAll ? "All Courses" : "My Courses"} ({visibleCourses.length})
      </h2>
      <hr />

      {(isLoading || enrollmentLoading) ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : visibleCourses.length === 0 ? (
        <div className="alert alert-info">
          {showAll ? "No courses available." : "You are not enrolled in any courses."}
        </div>
      ) : (
        <Row xs={1} md={5} className="g-4">
          {visibleCourses.map((c: Course) => {
            const isEnrolled = enrolledCourseIds.includes(c._id);
            return (
              <Col key={c._id} className="wd-dashboard-course" style={{ width: "300px" }}>
                <Card>
                  <Link
                    to={`/Kambaz/Courses/${c._id}/Home`}
                    className="wd-dashboard-course-link text-decoration-none text-dark"
                  >
                    <Card.Img
                      src="/images/reactjs.jpg"
                      variant="top"
                      width="100%"
                      height={160}
                    />
                    <Card.Body>
                      <Card.Title className="text-nowrap overflow-hidden">
                        {c.name}
                      </Card.Title>
                      <Card.Text
                        className="overflow-hidden"
                        style={{ height: "100px" }}
                      >
                        {c.description}
                      </Card.Text>

                      {isFaculty ? (
                        <>
                          <Button variant="primary">Go</Button>
                          <button
                            className="btn btn-danger float-end"
                            onClick={(e) => {
                              e.preventDefault();
                              handleDeleteCourse(c._id);
                            }}
                            id="wd-delete-course-click"
                            disabled={isLoading || enrollmentLoading}
                          >
                            Delete
                          </button>
                          <button
                            className="btn btn-warning me-2 float-end"
                            onClick={(e) => {
                              e.preventDefault();
                              handleEditCourse(c);
                            }}
                            id="wd-edit-course-click"
                            disabled={isLoading || enrollmentLoading}
                          >
                            Edit
                          </button>
                        </>
                      ) : (
                        <Button
                          variant={isEnrolled ? "danger" : "success"}
                          onClick={(e) => {
                            e.preventDefault();
                            isEnrolled
                              ? handleUnenroll(c._id)
                              : handleEnroll(c._id);
                          }}
                          disabled={isLoading || enrollmentLoading}
                        >
                          {enrollmentLoading ? "Processing..." : isEnrolled ? "Unenroll" : "Enroll"}
                        </Button>
                      )}
                    </Card.Body>
                  </Link>
                </Card>
              </Col>
            );
          })}
        </Row>
      )}
    </div>
  );
}