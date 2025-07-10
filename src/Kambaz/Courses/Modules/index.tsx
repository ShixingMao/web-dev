import ModulesControls from "./ModulesControls";
import { ListGroup } from "react-bootstrap";
import ModuleControlButtons from "./ModuleControlButtons";
import { BsGripVertical } from "react-icons/bs";
import LessonControlButtons from "./LessonControlButtons";
export default function Modules() {
  return (
    // <div>
    //   {/* Implement Collapse All button, View Progress button, etc. */}
    //   <button>Collapse All</button> <button>View Progress</button> <button>Publish All</button> <button>Module</button>
    //   <ul id="wd-modules">
    //     <li className="wd-module">
    //       <div className="wd-title">Week 1, Lecture 1 - Course IIntroduction, Syllabus</div>
    //       <ul className="wd-lessons">
    //         <li className="wd-lesson">
    //           <span className="wd-title">LEARNING OBJECTIVES</span>
    //           <ul className="wd-content">
    //             <li className="wd-content-item">Introduction to the course</li>
    //             <li className="wd-content-item">Learn what is Web Development</li>
    //           </ul>
    //         </li>
    //         <li className="wd-lesson">
    //           <span className="wd-title">READING</span>
    //           <ul className="wd-content">
    //             <li className="wd-content-item">Full Stack Developer - Chapter 1</li>
    //             <li className="wd-content-item">Full Stack Developer - Chapter 2</li>
    //           </ul>
    //         </li>
    //         <li className="wd-lesson">
    //           <span className="wd-title">SLIDES</span>
    //           <ul className="wd-content">
    //             <li className="wd-content-item">Introduction to Web Development</li>
    //             <li className="wd-content-item">Creating a React Web Application</li>
    //             <li className="wd-content-item">Deploying to Netlify</li>
    //           </ul>
    //         </li>
    //       </ul>
    //     </li>
    //     <li className="wd-module">
    //       <div className="wd-title">Week 2, Lecture 2 - Prototyping the React Kambaz User Interface with HTML</div>
    //       <ul className="wd-lessons">
    //         <li className="wd-lesson">
    //           <span className="wd-title">LEARNING OBJECTIVES</span>
    //           <ul className="wd-content">
    //             <li className="wd-content-item">Learn how to create user interfaces with HTML</li>
    //             <li className="wd-content-item">Deploy the assignment to Netlify</li>
    //           </ul>
    //           <li className="wd-lesson">
    //           <span className="wd-title">READING</span>
    //           <ul className="wd-content">
    //             <li className="wd-content-item">Full Stack Developer - Chapter 3</li>
    //           </ul>
    //         </li>
    //         <li className="wd-lesson">
    //           <span className="wd-title">SLIDES</span>
    //           <ul className="wd-content">
    //             <li className="wd-content-item">Implementing the Kambaz Account Screens</li>
    //             <li className="wd-content-item">Implementing the Kambaz Courses Screen</li>
    //           </ul>
    //         </li>
    //         </li>
    //       </ul>
    //     </li>
    //     <li className="wd-module">
    //       <div className="wd-title">Week 3</div>
    //       <ul className="wd-lessons">
    //         <li className="wd-lesson">
    //           <span className="wd-title">LEARNING OBJECTIVES</span>
    //           <ul className="wd-content">
    //             <li className="wd-content-item">Introduction to CSS</li>
    //             <li className="wd-content-item">Styling Web Pages with CSS</li>
    //           </ul>
    //         </li>
    //       </ul>
    //     </li>
    //   </ul>
    // </div>


    <div>
      <ModulesControls /><br /><br /><br /><br />
      <ListGroup className="rounded-0" id="wd-modules">
        <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" /> Week 1 <ModuleControlButtons />
          </div>
          <ListGroup className="wd-lessons rounded-0">
            <ListGroup.Item className="wd-lesson p-3 ps-1">
              <BsGripVertical className="me-2 fs-3" /> LEARNING OBJECTIVES <LessonControlButtons />
            </ListGroup.Item>
            <ListGroup.Item className="wd-lesson p-3 ps-1">
              <BsGripVertical className="me-2 fs-3" /> Introduction to the course <LessonControlButtons />
            </ListGroup.Item>
            <ListGroup.Item className="wd-lesson p-3 ps-1">
              <BsGripVertical className="me-2 fs-3" /> Learn what is Web Development<LessonControlButtons />
            </ListGroup.Item>
          </ListGroup>
        </ListGroup.Item>
        <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" /> Week 2 <ModuleControlButtons />
          </div>
          <ListGroup className="wd-lessons rounded-0">
            <ListGroup.Item className="wd-lesson p-3 ps-1">
              <BsGripVertical className="me-2 fs-3" />LESSON 1 <LessonControlButtons /></ListGroup.Item>
            <ListGroup.Item className="wd-lesson p-3 ps-1">
              <BsGripVertical className="me-2 fs-3" />LESSON 2 <LessonControlButtons /></ListGroup.Item>
          </ListGroup>
        </ListGroup.Item>
      </ListGroup>
    </div>


  );
}

