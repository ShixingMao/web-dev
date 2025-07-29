// import {
//   ListGroup, Button, FormControl, InputGroup
// } from "react-bootstrap";
// import { BsGripVertical } from "react-icons/bs";
// import { FaSearch, FaPlus } from "react-icons/fa";
// import ModuleControlButtons from "./ModuleControlButtons";
// import LessonControlButtons from "./LessonControlButtons";
// import { RxTriangleDown } from "react-icons/rx";
// import { LuNotebookPen } from "react-icons/lu";
// import { useParams, Link, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";

// export default function Assignments() {
//   const { cid } = useParams();
//   const navigate = useNavigate();

//   // Pull assignments from Redux state
//   const assignments = useSelector(
//     (state: any) => state.assignmentsReducer.assignments
//   );

//   // Filter by course
//   const courseAssignments = assignments.filter(
//     (a: any) => a.course === cid
//   );

//   return (
//     <div id="wd-assignments" className="p-3">
//       {/* Top Controls */}
//       <div className="d-flex justify-content-between mb-4">
//         <InputGroup style={{ maxWidth: "300px" }}>
//           <InputGroup.Text><FaSearch /></InputGroup.Text>
//           <FormControl placeholder="Search..." id="wd-search-assignment" />
//         </InputGroup>
//         <div>
//           <Button
//             variant="secondary"
//             className="me-2"
//             id="wd-add-assignment-group"
//           >
//             <FaPlus className="me-2" /> Group
//           </Button>
//           <Button
//             variant="danger"
//             id="wd-add-assignment"
//             onClick={() =>
//               navigate(`/Kambaz/Courses/${cid}/Assignments/New`)
//             }
//           >
//             <FaPlus className="me-2" /> Assignment
//           </Button>
//         </div>
//       </div>

//       {/* Assignment Group */}
//       <ListGroup className="rounded-0" id="wd-assignment-list">
//         <ListGroup.Item className="p-0 mb-5 fs-5 border-gray">
//           <div className="p-3 ps-2 bg-light d-flex justify-content-between align-items-center">
//             <div className="d-flex align-items-center">
//               <BsGripVertical className="me-1 fs-3" />
//               <RxTriangleDown className="me-1 fs-3" />
//               <span id="wd-assignments-title" className="fw-bold">
//                 ASSIGNMENTS
//               </span>
//             </div>
//             <div className="d-flex align-items-center">
//               <span className="ms-2 badge rounded-pill bg-light text-muted border fs-6">
//                 {courseAssignments.length * 10}% of Total
//               </span>
//               <ModuleControlButtons />
//             </div>
//           </div>

//           <ListGroup className="rounded-0">
//             {courseAssignments.map((assignment: any, index: number) => (
//               <ListGroup.Item
//                 key={assignment._id}
//                 className="wd-assignment-list-item p-3 d-flex align-items-center"
//               >
//                 <div className="d-flex align-items-center me-3">
//                   <BsGripVertical className="me-2 fs-3" />
//                   <LuNotebookPen className="fs-3 text-success" />
//                 </div>
//                 <div className="flex-grow-1">
//                   <div className="d-flex align-items-center mb-2">
//                     <Link
//                       to={`/Kambaz/Courses/${cid}/Assignments/${assignment._id}`}
//                       className="wd-assignment-link me-3 text-muted fw-bold"
//                     >
//                       {`A${index + 1} - ${assignment.title}`}
//                     </Link>
//                   </div>
//                   <div className="wd-assignment-details text-muted">
//                     <span className="text-danger">Multiple Modules</span> |{" "}
//                     <b>Not Available Until</b> {assignment.availableFrom} |{" "}
//                     <b>Due</b> {assignment.dueDate} | {assignment.points} pts
//                   </div>
//                 </div>
//                 <LessonControlButtons />
//               </ListGroup.Item>
//             ))}
//           </ListGroup>
//         </ListGroup.Item>
//       </ListGroup>
//     </div>
//   );
// }
import {
  ListGroup, Button, FormControl, InputGroup, Modal
} from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { FaSearch, FaPlus, FaTrash } from "react-icons/fa";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";
import { RxTriangleDown } from "react-icons/rx";
import { LuNotebookPen } from "react-icons/lu";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteAssignment } from "./reducer";
import { useState } from "react";

export default function Assignments() {
  const { cid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const assignments = useSelector((state: any) => state.assignmentsReducer.assignments);
  const courseAssignments = assignments.filter((a: any) => a.course === cid);
const { currentUser } = useSelector((state: any) => state.accountReducer);
const isFaculty = currentUser?.role === "FACULTY";
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  const handleDeleteClick = (id: string) => {
    setPendingDeleteId(id);
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    if (pendingDeleteId) {
      dispatch(deleteAssignment(pendingDeleteId));
    }
    setShowConfirm(false);
    setPendingDeleteId(null);
  };

  const cancelDelete = () => {
    setShowConfirm(false);
    setPendingDeleteId(null);
  };

  return (
    <div id="wd-assignments" className="p-3">
      {/* Top Controls */}
      <div className="d-flex justify-content-between mb-4">
        <InputGroup style={{ maxWidth: "300px" }}>
          <InputGroup.Text><FaSearch /></InputGroup.Text>
          <FormControl placeholder="Search..." id="wd-search-assignment" />
        </InputGroup>
        {isFaculty && (
        <div>
          <Button variant="secondary" className="me-2" id="wd-add-assignment-group">
            <FaPlus className="me-2" /> Group
          </Button>
          <Button variant="danger" id="wd-add-assignment"
            onClick={() => navigate(`/Kambaz/Courses/${cid}/Assignments/New`)}>
            <FaPlus className="me-2" /> Assignment
          </Button>
        </div>
        )}
      </div>

      {/* Assignment Group */}
      <ListGroup className="rounded-0" id="wd-assignment-list">
        <ListGroup.Item className="p-0 mb-5 fs-5 border-gray">
          <div className="p-3 ps-2 bg-light d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <BsGripVertical className="me-1 fs-3" />
              <RxTriangleDown className="me-1 fs-3" />
              <span id="wd-assignments-title" className="fw-bold">ASSIGNMENTS</span>
            </div>
            <div className="d-flex align-items-center">
              <span className="ms-2 badge rounded-pill bg-light text-muted border fs-6">
                {courseAssignments.length * 10}% of Total
              </span>
              <ModuleControlButtons />
            </div>
          </div>

          <ListGroup className="rounded-0">
            {courseAssignments.map((assignment: any, index: any) => (
              <ListGroup.Item key={assignment._id}
                className="wd-assignment-list-item p-3 d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <BsGripVertical className="me-2 fs-3" />
                  <LuNotebookPen className="fs-3 text-success" />
                  <div className="ms-3">
                    <Link
                      to={`/Kambaz/Courses/${cid}/Assignments/${assignment._id}`}
                      className="wd-assignment-link text-muted fw-bold"
                    >
                      {`A${index + 1} - ${assignment.title}`}
                    </Link>
                    <div className="wd-assignment-details text-muted">
                      <span className="text-danger">Multiple Modules</span> | 
                      <b> Not Available Until</b> {assignment.availableFrom} | 
                      <b> Due</b> {assignment.dueDate} | {assignment.points} pts
                    </div>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <LessonControlButtons />
                  {isFaculty && (
                  <FaTrash
                    className="ms-3 text-danger cursor-pointer"
                    onClick={() => handleDeleteClick(assignment._id)}
                    style={{ cursor: "pointer" }}
                    title="Delete Assignment"
                  />)}
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </ListGroup.Item>
      </ListGroup>

      {/* Confirmation Modal */}
      <Modal show={showConfirm} onHide={cancelDelete} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this assignment?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelDelete}>Cancel</Button>
          <Button variant="danger" onClick={confirmDelete}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
