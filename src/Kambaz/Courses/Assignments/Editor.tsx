import { useParams, useNavigate } from "react-router-dom";
import { Form, Row, Col, Button } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addAssignment, updateAssignment } from "./reducer";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isNew = aid === "New";
  const allAssignments = useSelector(
    (state: any) => state.assignmentsReducer.assignments
  );

  const existingAssignment = allAssignments.find(
    (a: any) => a._id === aid
  );
  const [assignment, setAssignment] = useState<any>(
    isNew
      ? {
          _id: uuidv4(),
          title: "",
          description: "",
          points: 100,
          dueDate: "",
          availableFrom: "",
          availableUntil: "",
          course: cid,
        }
      : existingAssignment
  );

  if (!assignment) return <div>Assignment not found.</div>;

  const handleChange = (field: string, value: any) => {
    setAssignment({ ...assignment, [field]: value });
  };

  const handleSave = () => {
    if (isNew) {
      dispatch(addAssignment(assignment));
    } else {
      dispatch(updateAssignment(assignment));
    }
    navigate(`/Kambaz/Courses/${cid}/Assignments`);
  };

  return (
    <div id="wd-assignments-editor" className="p-4">
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Assignment Name</Form.Label>
          <Form.Control
            type="text"
            value={assignment.title}
            onChange={(e) => handleChange("title", e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Control
            as="textarea"
            rows={3}
            value={assignment.description}
            onChange={(e) => handleChange("description", e.target.value)}
          />
        </Form.Group>

        <div className="mx-auto mb-4" style={{ maxWidth: "600px" }}>
          <Row className="mb-3 align-items-center">
            <Col sm={4} className="text-end">
              <Form.Label>Points</Form.Label>
            </Col>
            <Col sm={8}>
              <Form.Control
                type="number"
                value={assignment.points}
                onChange={(e) => handleChange("points", Number(e.target.value))}
              />
            </Col>
          </Row>

          <Row className="mb-3 align-items-center">
            <Col sm={4} className="text-end">
              <Form.Label>Assignment Group</Form.Label>
            </Col>
            <Col sm={8}>
              <Form.Select>
                <option>ASSIGNMENTS</option>
                <option>QUIZZES</option>
                <option>EXAMS</option>
                <option>PROJECT</option>
              </Form.Select>
            </Col>
          </Row>

          <Row className="mb-4 align-items-center">
            <Col sm={4} className="text-end">
              <Form.Label>Display Grade as</Form.Label>
            </Col>
            <Col sm={8}>
              <Form.Select defaultValue="Percentage">
                <option>Percentage</option>
                <option>Points</option>
                <option>Complete/Incomplete</option>
              </Form.Select>
            </Col>
          </Row>

          <Row className="align-items-start mb-4">
            <Col sm={4} className="text-end">
              <Form.Label className="mt-2">Submission Type</Form.Label>
            </Col>
            <Col sm={8}>
              <div className="border rounded p-3">
                <Form.Select className="mb-3" defaultValue="Online">
                  <option>Online</option>
                  <option>On Paper</option>
                  <option>No Submission</option>
                </Form.Select>
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

          <Row className="align-items-start mb-4">
            <Col sm={4} className="text-end">
              <Form.Label className="mt-2">Assign</Form.Label>
            </Col>
            <Col sm={8}>
              <div className="border rounded p-3">
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Assign to</Form.Label>
                  <Form.Control type="text" value="Everyone" disabled />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Due</Form.Label>
                  <Form.Control
                    type="date"
                    value={assignment.dueDate}
                    onChange={(e) => handleChange("dueDate", e.target.value)}
                  />
                </Form.Group>

                <Row>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-bold">Available from</Form.Label>
                      <Form.Control
                        type="date"
                        value={assignment.availableFrom}
                        onChange={(e) =>
                          handleChange("availableFrom", e.target.value)
                        }
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-bold">Until</Form.Label>
                      <Form.Control
                        type="date"
                        value={assignment.availableUntil}
                        onChange={(e) =>
                          handleChange("availableUntil", e.target.value)
                        }
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </div>

        <hr />
        <div className="d-flex justify-content-end gap-2">
          <Button variant="secondary" onClick={() => navigate(`/Kambaz/Courses/${cid}/Assignments`)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleSave}>
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
}
