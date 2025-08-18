import CourseNavigation from "./Navigation";
import { Navigate, Route, Routes, useParams, useLocation } from "react-router";
import Modules from "./Modules";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import Home from "./Home";
import { FaAlignJustify } from "react-icons/fa";
import PeopleTable from "./People";
import { useSelector } from "react-redux";
import QuizDetails from "./Quizzes/QuizDetails";
import QuizEditor from "./Quizzes/QuizEditor";
import QuizPreview from "./Quizzes/Preview";
import QuizzesList from "./Quizzes/QuizzesList";
import QuestionEditor from "./Quizzes/QuestionEditor";
import TakeQuiz from "./Quizzes/TakeQuiz";
import QuizReview from "./Quizzes/Review";
export default function Courses() {
  const { cid } = useParams();
  const { pathname } = useLocation();

  const courses = useSelector((state: any) => state.coursesReducer.courses);
  const course = courses.find((course: any) => course._id === cid);

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        {course?.name} &gt; {pathname.split("/")[4]}
      </h2>
      <hr />

      <div className="d-flex">
        <div className="d-none d-md-block">
          <CourseNavigation />
        </div>
        <div className="flex-fill">
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="Home" element={<Home />} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Assignments" element={<Assignments />} />
            <Route path="Assignments/:aid" element={<AssignmentEditor />} />
            <Route path="Piazza" element={<h2>Piazza</h2>} />
            <Route path="Zoom" element={<h2>Zoom</h2>} />
            {/* <Route path="Quizzes" element={<h2>Quizzes</h2>} /> */}
            <Route path="Quizzes" element={<QuizzesList />} />
            <Route path="Quizzes/:qid" element={<QuizDetails />} />
            <Route path="Quizzes/:qid/Preview" element={<QuizPreview />} />
            <Route path="Quizzes/:qid/Edit" element={<QuizEditor />} />
            <Route path="Quizzes/:qid/Edit/questions/:qnid" element={<QuestionEditor />} />
            <Route path="Quizzes/:qid/Take" element={<TakeQuiz />} /> 
            <Route path="Quizzes/:qid/Review" element={<QuizReview />} />

            <Route path="Grades" element={<h2>Grades</h2>} />
            <Route path="People/*" element={<PeopleTable />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
