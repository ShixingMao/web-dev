// export default function Assignments() {
//   return (
//     <div id="wd-assignments">
//       <input
//         placeholder="Search for Assignments"
//         id="wd-search-assignment"
//       />
//       <button id="wd-add-assignment-group">+ Group</button>
//       <button id="wd-add-assignment">+ Assignment</button>

//       <h3 id="wd-assignments-title">
//         ASSIGNMENTS 40% of Total <button>+</button>
//       </h3>

//       <ul id="wd-assignment-list">
//         <li className="wd-assignment-list-item">
//           <a
//             href="#/Kambaz/Courses/1234/Assignments/123"
//             className="wd-assignment-link"
//           >
//             A1 - ENV + HTML
//           </a>
//           <div className="wd-assignment-details">
//             Multiple Modules | <b>Not Available Until</b> May 6 at 12:00am | <b>Due</b> May 13 at 11:59pm | 100 pts
//           </div>
//         </li>

//         <li className="wd-assignment-list-item">
//           <a
//             href="#/Kambaz/Courses/1234/Assignments/124"
//             className="wd-assignment-link"
//           >
//             A2 - CSS + BOOTSTRAP
//           </a>
//           <div className="wd-assignment-details">
//             Multiple Modules | <b>Not Available Until</b> May 13 at 12:00am | <b>Due</b> May 20 at 11:59pm | 100 pts
//           </div>
//         </li>

//         <li className="wd-assignment-list-item">
//           <a
//             href="#/Kambaz/Courses/1234/Assignments/125"
//             className="wd-assignment-link"
//           >
//             A3 - JAVASCRIPT + REACT
//           </a>
//           <div className="wd-assignment-details">
//             Multiple Modules | <b>Not Available Until</b> May 20 at 12:00am | <b>Due</b> May 27 at 11:59pm | 100 pts
//           </div>
//         </li>
//       </ul>
//     </div>
//   );
// }
import { ListGroup, Button, FormControl, InputGroup } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { FaSearch, FaPlus } from "react-icons/fa";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";
import { RxTriangleDown } from "react-icons/rx";
import { LuNotebookPen } from "react-icons/lu";
export default function Assignments() {
  return (
    <div id="wd-assignments" className="p-3">
      {/* Top Controls */}
      <div className="d-flex justify-content-between mb-4">
        <InputGroup style={{ maxWidth: "300px" }}>
          <InputGroup.Text><FaSearch /></InputGroup.Text>
          <FormControl
            placeholder="Search..."
            id="wd-search-assignment"
          />
        </InputGroup>
        <div>
          <Button variant="secondary" className="me-2" id="wd-add-assignment-group">
            <FaPlus className="me-2" /> Group
          </Button>
          <Button variant="danger" id="wd-add-assignment">
            <FaPlus className="me-2" /> Assignment
          </Button>
        </div>
      </div>

      {/* Assignment Group */}
      <ListGroup className="rounded-0" id="wd-assignment-list">
        <ListGroup.Item className="p-0 mb-5 fs-5 border-gray">
          <div className="p-3 ps-2 bg-light d-flex justify-content-between align-items-center">
            <div className="d-felx align-items-center">
              <BsGripVertical className="me-1 fs-3" />
              <RxTriangleDown className="me-1 fs-3" />
              <span id="wd-assignments-title" className="fw-bold">
                ASSIGNMENTS
              </span>
            </div>


            <div className="d-flex align-items-center">
              <span className="ms-2 badge rounded-pill bg-light text-muted border fs-6">
                40% of Total
              </span>
              <ModuleControlButtons />
            </div>

          </div>


          <ListGroup className="rounded-0">
            <ListGroup.Item className="wd-assignment-list-item p-3 d-flex align-items-center">
              {/* Icons on the left */}
              <div className="d-flex align-items-center me-3">
                <BsGripVertical className="me-2 fs-3" />
                <LuNotebookPen className="fs-3 text-success" />
              </div>

              {/* Assignment details */}
              <div className="flex-grow-1">
                <div className="d-flex align-items-center mb-2">
                  <a
                    href="#/Kambaz/Courses/1234/Assignments/123"
                    className="wd-assignment-link me-3 text-muted fw-bold"
                  >
                    A1
                  </a>
                </div>
                <div className="wd-assignment-details text-muted">
                  <span className="text-danger">Multiple Modules</span> | <b>Not Available Until</b> May 6 at 12:00am | <b>Due</b> May 13 at 11:59pm | 100 pts
                </div>

              </div>
              <LessonControlButtons />
            </ListGroup.Item>
            <ListGroup.Item className="wd-assignment-list-item p-3 d-flex align-items-center">
              {/* Icons on the left */}
              <div className="d-flex align-items-center me-3">
                <BsGripVertical className="me-2 fs-3" />
                <LuNotebookPen className="fs-3 text-success" />
              </div>

              {/* Assignment details */}
              <div className="flex-grow-1">
                <div className="d-flex align-items-center mb-2">
                  <a
                    href="#/Kambaz/Courses/1234/Assignments/123"
                    className="wd-assignment-link me-3 text-muted fw-bold"
                  >
                    A2
                  </a>
                </div>
                <div className="wd-assignment-details text-muted">
                  <span className="text-danger">Multiple Modules</span> | <b>Not Available Until</b> May 13 at 12:00am | <b>Due</b> May 20 at 11:59pm | 100 pts
                </div>

              </div>
              <LessonControlButtons />
            </ListGroup.Item>
            <ListGroup.Item className="wd-assignment-list-item p-3 d-flex align-items-center">
              {/* Icons on the left */}
              <div className="d-flex align-items-center me-3">
                <BsGripVertical className="me-2 fs-3" />
                <LuNotebookPen className="fs-3 text-success" />
              </div>

              {/* Assignment details */}
              <div className="flex-grow-1">
                <div className="d-flex align-items-center mb-2">
                  <a
                    href="#/Kambaz/Courses/1234/Assignments/123"
                    className="wd-assignment-link me-3 text-muted fw-bold"
                  >
                    A3
                  </a>
                </div>
                <div className="wd-assignment-details text-muted">
                  <span className="text-danger">Multiple Modules</span> | <b>Not Available Until</b> May 20 at 12:00am | <b>Due</b> May 27 at 11:59pm | 100 pts
                </div>

              </div>
              <LessonControlButtons />
            </ListGroup.Item>
          </ListGroup>

        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}