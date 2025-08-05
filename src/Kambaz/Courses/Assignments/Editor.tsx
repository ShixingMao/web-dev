import { useParams, useNavigate } from "react-router-dom";
import { Form, Row, Col, Button } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addAssignment, updateAssignment } from "./reducer";
import * as assignmentClient from "./client";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const isNew = aid === "New";
  const [assignment, setAssignment] = useState<any>({
    _id: uuidv4(),
    title: "",
    description: "",
    points: 100,
    dueDate: "",
    availableFrom: "",
    availableUntil: "",
    course: cid,
  });

  // Load assignment if editing
  useEffect(() => {
    const loadAssignment = async () => {
      if (!isNew && aid) {
        try {
          setIsLoading(true);
          const fetchedAssignment = await assignmentClient.fetchAssignmentById(aid);
          setAssignment(fetchedAssignment);
        } catch (error) {
          console.error("Error loading assignment:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    loadAssignment();
  }, [isNew, aid]);

  const handleChange = (field: string, value: any) => {
    setAssignment({ ...assignment, [field]: value });
  };

  const handleSave = async () => {
    try {
      if (isNew && cid) {
        // Create new assignment
        const savedAssignment = await assignmentClient.createAssignment(cid, assignment);
        dispatch(addAssignment(savedAssignment));
      } else if (aid) {
        // Update existing assignment
        const updatedAssignment = await assignmentClient.updateAssignment(aid, assignment);
        dispatch(updateAssignment(updatedAssignment));
      }
      navigate(`/Kambaz/Courses/${cid}/Assignments`);
    } catch (error) {
      console.error("Error saving assignment:", error);
      alert("Failed to save assignment. Please try again.");
    }
  };

  if (isLoading) {
    return <div className="p-4">Loading assignment...</div>;
  }

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