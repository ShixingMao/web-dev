// import { Form, Row, Col, Button } from "react-bootstrap";

// export default function AssignmentEditor() {
//     return (
//         <div id="wd-assignments-editor" className="p-4">
//             <Form>
//                 {/* Full width: Assignment Name */}
//                 <Form.Group className="mb-3" controlId="wd-name">
//                     <Form.Label>Assignment Name</Form.Label>
//                     <Form.Control type="text" defaultValue="A1 - ENV + HTML" />
//                 </Form.Group>

//                 {/* Full width: Description */}
//                 <Form.Group className="mb-4" controlId="wd-description">
                   
//                     <Form.Control
//                         as="textarea"
//                         rows={3}
//                         defaultValue="The assignment is available online Submit a link to the landing page of"
//                     />
//                 </Form.Group>

//                 {/* Centered section for points and settings */}
//                 <div className="mx-auto mb-4" style={{ maxWidth: "600px" }}>
//                     {/* Points */}
//                     <Row className="mb-3 align-items-center">
//                         <Col sm={4} className="text-end">
//                             <Form.Label htmlFor="wd-points">Points</Form.Label>
//                         </Col>
//                         <Col sm={8}>
//                             <Form.Control type="number" id="wd-points" defaultValue={100} />
//                         </Col>
//                     </Row>

//                     {/* Assignment Group */}
//                     <Row className="mb-3 align-items-center">
//                         <Col sm={4} className="text-end">
//                             <Form.Label htmlFor="wd-group">Assignment Group</Form.Label>
//                         </Col>
//                         <Col sm={8}>
//                             <Form.Select id="wd-group" defaultValue="ASSIGNMENTS">
//                                 <option>ASSIGNMENTS</option>
//                                 <option>QUIZZES</option>
//                                 <option>EXAMS</option>
//                                 <option>PROJECT</option>
//                             </Form.Select>
//                         </Col>
//                     </Row>

//                     {/* Display Grade As */}
//                     <Row className="mb-4 align-items-center">
//                         <Col sm={4} className="text-end">
//                             <Form.Label htmlFor="wd-display-grade-as">Display Grade as</Form.Label>
//                         </Col>
//                         <Col sm={8}>
//                             <Form.Select id="wd-display-grade-as" defaultValue="Percentage">
//                                 <option>Percentage</option>
//                                 <option>Points</option>
//                                 <option>Complete/Incomplete</option>
//                             </Form.Select>
//                         </Col>
//                     </Row>

//                     <div className="mx-auto mb-4" style={{ maxWidth: "600px" }}>
//                         <Row className="align-items-start">
//                             <Col sm={4} className="text-end">
//                                 <Form.Label className="mt-2">Submission Type</Form.Label>
//                             </Col>
//                             <Col sm={8}>
//                                 <div className="border rounded p-3">
//                                     <Form.Group className="mb-3" controlId="wd-submission-type">
//                                         <Form.Select defaultValue="Online">
//                                             <option>Online</option>
//                                             <option>On Paper</option>
//                                             <option>No Submission</option>
//                                         </Form.Select>
//                                     </Form.Group>

//                                     <Form.Label className="fw-bold">Online Entry Options</Form.Label>
//                                     <div>
//                                         <Form.Check label="Text Entry" id="wd-text-entry" />
//                                         <Form.Check label="Website URL" id="wd-website-url" />
//                                         <Form.Check label="Media Recordings" id="wd-media-recordings" />
//                                         <Form.Check label="Student Annotation" id="wd-student-annotation" />
//                                         <Form.Check label="File Upload" id="wd-file-upload" />
//                                     </div>
//                                 </div>
//                             </Col>
//                         </Row>
//                     </div>

//                     {/* Assign Section Row */}
//                     <div className="mx-auto mb-4" style={{ maxWidth: "600px" }}>
//                         <Row className="align-items-start">
//                             <Col sm={4} className="text-end">
//                                 <Form.Label className="mt-2">Assign</Form.Label>
//                             </Col>
//                             <Col sm={8}>
//                                 <div className="border rounded p-3">
//                                     <Form.Group className="mb-3" controlId="wd-assign-to">
//                                         <Form.Label className="fw-bold">Assign to</Form.Label>
//                                         <Form.Control type="text" defaultValue="Everyone" />
//                                     </Form.Group>

//                                     <Form.Group className="mb-3" controlId="wd-due-date">
//                                         <Form.Label className="fw-bold">Due</Form.Label>
//                                         <Form.Control type="date" defaultValue="2025-05-01" />
//                                     </Form.Group>

//                                     <Row>
//                                         <Col>
//                                             <Form.Group className="mb-3" controlId="wd-available-from">
//                                                 <Form.Label className="fw-bold">Available from</Form.Label>
//                                                 <Form.Control type="date" defaultValue="2025-05-01" />
//                                             </Form.Group>
//                                         </Col>
//                                         <Col>
//                                             <Form.Group className="mb-3" controlId="wd-available-until">
//                                                 <Form.Label className="fw-bold">Until</Form.Label>
//                                                 <Form.Control type="date" defaultValue="2025-05-01" />
//                                             </Form.Group>
//                                         </Col>
//                                     </Row>
//                                 </div>
//                             </Col>
//                         </Row>
//                     </div>
//                 </div>
//                 <hr />
//                 {/* Buttons */}
//                 <div className="d-flex justify-content-end gap-2">
//                     <Button variant="secondary">Cancel</Button>
//                     <Button variant="danger">Save</Button>
//                 </div>
//             </Form>
//         </div>
//     );
// }
import { useParams, Link } from "react-router-dom";
import { Form, Row, Col, Button } from "react-bootstrap";
import * as db from "../../Database";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const assignment = db.assignments.find((a) => a._id === aid);

  if (!assignment) return <div>Assignment not found.</div>;

  return (
    <div id="wd-assignments-editor" className="p-4">
      <Form>
        {/* Assignment Title */}
        <Form.Group className="mb-3" controlId="wd-name">
          <Form.Label>Assignment Name</Form.Label>
          <Form.Control type="text" defaultValue={assignment.title} />
        </Form.Group>

        {/* Description */}
        <Form.Group className="mb-4" controlId="wd-description">
          <Form.Control
            as="textarea"
            rows={3}
            defaultValue={assignment.description || ""}
          />
        </Form.Group>

        {/* Points */}
        <div className="mx-auto mb-4" style={{ maxWidth: "600px" }}>
          <Row className="mb-3 align-items-center">
            <Col sm={4} className="text-end">
              <Form.Label htmlFor="wd-points">Points</Form.Label>
            </Col>
            <Col sm={8}>
              <Form.Control
                type="number"
                id="wd-points"
                defaultValue={assignment.points}
              />
            </Col>
          </Row>

          {/* Assignment Group */}
          <Row className="mb-3 align-items-center">
            <Col sm={4} className="text-end">
              <Form.Label htmlFor="wd-group">Assignment Group</Form.Label>
            </Col>
            <Col sm={8}>
              <Form.Select id="wd-group" defaultValue="ASSIGNMENTS">
                <option>ASSIGNMENTS</option>
                <option>QUIZZES</option>
                <option>EXAMS</option>
                <option>PROJECT</option>
              </Form.Select>
            </Col>
          </Row>

          {/* Grade Display */}
          <Row className="mb-4 align-items-center">
            <Col sm={4} className="text-end">
              <Form.Label htmlFor="wd-display-grade-as">Display Grade as</Form.Label>
            </Col>
            <Col sm={8}>
              <Form.Select id="wd-display-grade-as" defaultValue="Percentage">
                <option>Percentage</option>
                <option>Points</option>
                <option>Complete/Incomplete</option>
              </Form.Select>
            </Col>
          </Row>

          {/* Submission Type */}
          <Row className="align-items-start mb-4">
            <Col sm={4} className="text-end">
              <Form.Label className="mt-2">Submission Type</Form.Label>
            </Col>
            <Col sm={8}>
              <div className="border rounded p-3">
                <Form.Group className="mb-3" controlId="wd-submission-type">
                  <Form.Select defaultValue="Online">
                    <option>Online</option>
                    <option>On Paper</option>
                    <option>No Submission</option>
                  </Form.Select>
                </Form.Group>
                <Form.Label className="fw-bold">Online Entry Options</Form.Label>
                <div>
                  <Form.Check label="Text Entry" />
                  <Form.Check label="Website URL" />
                  <Form.Check label="Media Recordings" />
                  <Form.Check label="Student Annotation" />
                  <Form.Check label="File Upload" />
                </div>
              </div>
            </Col>
          </Row>

          {/* Assign Dates */}
          <Row className="align-items-start mb-4">
            <Col sm={4} className="text-end">
              <Form.Label className="mt-2">Assign</Form.Label>
            </Col>
            <Col sm={8}>
              <div className="border rounded p-3">
                <Form.Group className="mb-3" controlId="wd-assign-to">
                  <Form.Label className="fw-bold">Assign to</Form.Label>
                  <Form.Control type="text" defaultValue="Everyone" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="wd-due-date">
                  <Form.Label className="fw-bold">Due</Form.Label>
                  <Form.Control
                    type="date"
                    defaultValue={assignment.dueDate}
                  />
                </Form.Group>

                <Row>
                  <Col>
                    <Form.Group className="mb-3" controlId="wd-available-from">
                      <Form.Label className="fw-bold">Available from</Form.Label>
                      <Form.Control
                        type="date"
                        defaultValue={assignment.availableFrom}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3" controlId="wd-available-until">
                      <Form.Label className="fw-bold">Until</Form.Label>
                      <Form.Control type="date" defaultValue={assignment.dueDate} />
                    </Form.Group>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </div>

        <hr />
        {/* Footer Buttons */}
        <div className="d-flex justify-content-end gap-2">
          <Link to={`/Kambaz/Courses/${cid}/Assignments`}>
            <Button variant="secondary">Cancel</Button>
          </Link>
          <Link to={`/Kambaz/Courses/${cid}/Assignments`}>
            <Button variant="danger">Save</Button>
          </Link>
        </div>
      </Form>
    </div>
  );
}
