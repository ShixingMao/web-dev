// export default function AssignmentEditor() {
//     return (
//         <div id="wd-assignments-editor">
//             <label htmlFor="wd-name">Assignment Name</label><br />
//             <input id="wd-name" value="A1 - ENV + HTML" /><br /><br />
//             <textarea id="wd-description">
//                 The assignment is available online Submit a link to the landing page of
//             </textarea>
//             <br />
//             <table>
//                 <tr>
//                     <td align="right" valign="top">
//                         <label htmlFor="wd-points">Points</label>
//                     </td>
//                     <td>
//                         <input id="wd-points" value={100} />
//                     </td>
//                 </tr>

//                 {/* ✅ Completed below as requested */}
//                 <tr>
//                     <td align="right" valign="top">
//                         <label htmlFor="wd-group">Assignment Group</label>
//                     </td>
//                     <td>
//                         <select id="wd-group">
//                             <option>ASSIGNMENTS</option>
//                             <option>QUIZZES</option>
//                             <option>EXAMS</option>
//                             <option>PROJECT</option>
//                         </select>
//                     </td>
//                 </tr>

//                 <tr>
//                     <td align="right" valign="top">
//                         <label htmlFor="wd-display-grade-as">Display Grade as</label>
//                     </td>
//                     <td>
//                         <select id="wd-display-grade-as">
//                             <option>Percentage</option>
//                             <option>Points</option>
//                             <option>Complete/Incomplete</option>
//                         </select>
//                     </td>
//                 </tr>

//                 <tr>
//                     <td align="right" valign="top">
//                         <label htmlFor="wd-submission-type">Submission Type</label>
//                     </td>
//                     <td>
//                         <select id="wd-submission-type">
//                             <option>Online</option>
//                             <option>On Paper</option>
//                             <option>No Submission</option>
//                         </select><br /><br />
//                         <label>Online Entry Options</label><br />
//                         <label>
//                             <input type="checkbox" id="wd-text-entry" /> Text Entry
//                         </label><br />
//                         <label>
//                             <input type="checkbox" id="wd-website-url" /> Website URL
//                         </label><br />
//                         <label>
//                             <input type="checkbox" id="wd-media-recordings" /> Media Recordings
//                         </label><br />
//                         <label>
//                             <input type="checkbox" id="wd-student-annotation" /> Student Annotation
//                         </label><br />
//                         <label>
//                             <input type="checkbox" id="wd-file-upload" /> File Upload
//                         </label>
//                     </td>
//                 </tr>

//                 <tr>
//                     <td align="right" valign="top">
//                         <label htmlFor="wd-assign-to">Assign</label><br />
//                     </td>
//                     <td>
//                         <label htmlFor="wd-assign-to">Assign to</label><br />
//                         <input id="wd-assign-to" value="Everyone" /><br /><br />

//                         <label htmlFor="wd-due-date">Due</label><br />
//                         <input defaultValue="2025-05-01" type="date" id="wd-due-date" /><br /><br />


//                         <div style={{ display: "flex", gap: "16px" }}>
//                             <div>
//                                 <label htmlFor="wd-available-from">Available from</label><br />
//                                 <input defaultValue="2025-05-01" type="date" id="wd-available-from" />
//                             </div>
//                             <div>
//                                 <label htmlFor="wd-available-until">Until</label><br />
//                                 <input defaultValue="2025-05-01" type="date" id="wd-available-until" />
//                             </div>
//                         </div>
//                     </td>
//                 </tr>
//             </table>
//             <hr />

//             <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "16px" }}>
//                 <button>Cancel</button>
//                 <button>Save</button>
//             </div>
//         </div>
//     );
// }

import { Form, Row, Col, Button } from "react-bootstrap";

export default function AssignmentEditor() {
    return (
        <div id="wd-assignments-editor" className="p-4">
            <Form>
                {/* Full width: Assignment Name */}
                <Form.Group className="mb-3" controlId="wd-name">
                    <Form.Label>Assignment Name</Form.Label>
                    <Form.Control type="text" defaultValue="A1 - ENV + HTML" />
                </Form.Group>

                {/* Full width: Description */}
                <Form.Group className="mb-4" controlId="wd-description">
                   
                    <Form.Control
                        as="textarea"
                        rows={3}
                        defaultValue="The assignment is available online Submit a link to the landing page of"
                    />
                </Form.Group>

                {/* Centered section for points and settings */}
                <div className="mx-auto mb-4" style={{ maxWidth: "600px" }}>
                    {/* Points */}
                    <Row className="mb-3 align-items-center">
                        <Col sm={4} className="text-end">
                            <Form.Label htmlFor="wd-points">Points</Form.Label>
                        </Col>
                        <Col sm={8}>
                            <Form.Control type="number" id="wd-points" defaultValue={100} />
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

                    {/* Display Grade As */}
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

                    <div className="mx-auto mb-4" style={{ maxWidth: "600px" }}>
                        <Row className="align-items-start">
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
                                        <Form.Check label="Text Entry" id="wd-text-entry" />
                                        <Form.Check label="Website URL" id="wd-website-url" />
                                        <Form.Check label="Media Recordings" id="wd-media-recordings" />
                                        <Form.Check label="Student Annotation" id="wd-student-annotation" />
                                        <Form.Check label="File Upload" id="wd-file-upload" />
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>

                    {/* Assign Section Row */}
                    <div className="mx-auto mb-4" style={{ maxWidth: "600px" }}>
                        <Row className="align-items-start">
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
                                        <Form.Control type="date" defaultValue="2025-05-01" />
                                    </Form.Group>

                                    <Row>
                                        <Col>
                                            <Form.Group className="mb-3" controlId="wd-available-from">
                                                <Form.Label className="fw-bold">Available from</Form.Label>
                                                <Form.Control type="date" defaultValue="2025-05-01" />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group className="mb-3" controlId="wd-available-until">
                                                <Form.Label className="fw-bold">Until</Form.Label>
                                                <Form.Control type="date" defaultValue="2025-05-01" />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
                <hr />
                {/* Buttons */}
                <div className="d-flex justify-content-end gap-2">
                    <Button variant="secondary">Cancel</Button>
                    <Button variant="danger">Save</Button>
                </div>
            </Form>
        </div>
    );
}
