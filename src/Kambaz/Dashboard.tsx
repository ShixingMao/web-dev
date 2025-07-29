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
  enroll,
  unenroll
} from "./Enrollments/reducer";
import { useState } from "react";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { courses, course } = useSelector((state: any) => state.coursesReducer);
  const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);
  const isFaculty = currentUser?.role === "FACULTY";

  const [showAll, setShowAll] = useState(false);

  const userEnrollments = enrollments.filter(
    (e: any) => e.user === currentUser._id
  ).map((e: any) => e.course);

  const visibleCourses = showAll ? courses : courses.filter((c: any) =>
    userEnrollments.includes(c._id)
  );

  const handleEnroll = (courseId: string) => {
    dispatch(enroll({ user: currentUser._id, course: courseId }));
  };

  const handleUnenroll = (courseId: string) => {
    dispatch(unenroll({ user: currentUser._id, course: courseId }));
  };

  const handleAddCourse = () => dispatch(addCourse());
  const handleDeleteCourse = (id: string) => dispatch(deleteCourse(id));
  const handleUpdateCourse = () => dispatch(updateCourse());
  const handleEditCourse = (course: any) => dispatch(setCourse(course));
console.log("Current user ID:", currentUser?._id);
console.log("All enrollments:", enrollments);
  return (
    <div id="wd-dashboard" className="p-4">
      <h1 id="wd-dashboard-title">
        Dashboard
        <Button
          variant="primary"
          className="float-end"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "My Courses" : "Enrollments"}
        </Button>
      </h1>
      <hr />

      {isFaculty && (
        <>
          <h5>
            New Course
            <button className="btn btn-primary float-end"
              onClick={handleAddCourse}
              id="wd-add-new-course-click">
              Add
            </button>
            <button className="btn btn-warning float-end me-2"
              onClick={handleUpdateCourse}
              id="wd-update-course-click">
              Update
            </button>
          </h5>
          <br />
          <FormControl
            value={course.name}
            className="mb-2"
            onChange={(e) =>
              dispatch(setCourse({ ...course, name: e.target.value }))
            }
          />
          <FormControl
            as="textarea"
            value={course.description}
            rows={3}
            onChange={(e) =>
              dispatch(setCourse({ ...course, description: e.target.value }))
            }
          />
          <hr />
        </>
      )}

      <h2 id="wd-dashboard-published">
        Published Courses ({visibleCourses.length})
      </h2>
      <hr />

      <Row xs={1} md={5} className="g-4">
        {visibleCourses.map((c: any) => {
          const isEnrolled = userEnrollments.includes(c._id);
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
                      >
                        {isEnrolled ? "Unenroll" : "Enroll"}
                      </Button>
                    )}
                  </Card.Body>
                </Link>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}
