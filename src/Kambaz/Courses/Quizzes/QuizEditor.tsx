import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Form, Nav, Row, Col, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import * as qclient from "./client";
import { NavLink } from "react-router-dom";
export default function QuizEditor() {
    const { cid, qid } = useParams();
    const navigate = useNavigate();
    const { currentUser } = useSelector((s: any) => s.accountReducer);
    const isFaculty = currentUser?.role === "FACULTY";

    const [quiz, setQuiz] = useState<any>(null);
    const [tab, setTab] = useState<"DETAILS" | "QUESTIONS">("DETAILS");
    const [questions, setQuestions] = useState<any[]>([]);

    const load = async () => {
        if (!qid) return;
        const q = await qclient.getQuiz(qid);
        setQuiz(q);
        const qs = await qclient.listQuestions(qid);
        setQuestions(Array.isArray(qs) ? qs : []);
    };
    useEffect(() => { load(); }, [qid]);

    if (!isFaculty) return <div className="alert alert-danger">Only faculty can edit quizzes.</div>;
    if (!quiz) return <div className="alert alert-secondary">Loading…</div>;

    const save = async (publish = false) => {
        if (!qid) return;
        await qclient.updateQuiz(qid, quiz);
        if (publish) await qclient.setPublished(qid, true);
        navigate(publish ? `/Kambaz/Courses/${cid}/Quizzes` : `/Kambaz/Courses/${cid}/Quizzes/${qid}`);
    };

    const cancel = () => navigate(`/Kambaz/Courses/${cid}/Quizzes`);

    const totalPoints = questions.reduce((s, x) => s + (x.points || 0), 0);

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3>Edit Quiz</h3>
                <div className="d-flex gap-2">
                    <Button variant="secondary" onClick={cancel}>Cancel</Button>
                    <Button variant="primary" onClick={() => save(false)}>Save</Button>
                    <Button variant="success" onClick={() => save(true)}>Save & Publish</Button>
                </div>
            </div>

            <Nav variant="tabs" activeKey={tab} onSelect={(k) => setTab((k as any) || "DETAILS")} className="mb-3">
                <Nav.Item>
                    <Nav.Link eventKey="DETAILS">Details</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="QUESTIONS">Questions</Nav.Link>
                </Nav.Item>
            </Nav>

            {tab === "DETAILS" ? (
                <Card>
                    <Card.Body>
                        <Form>
                            <Row className="mb-3">
                                <Col md={8}>
                                    <Form.Group className="mb-2">
                                        <Form.Label>Title</Form.Label>
                                        <Form.Control
                                            value={quiz.title || ""}
                                            onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-2">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={5}
                                            value={quiz.description || ""}
                                            onChange={(e) => setQuiz({ ...quiz, description: e.target.value })}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                    <div className="mb-2"><strong>Total Points:</strong> {totalPoints}</div>
                                    <Form.Group className="mb-2">
                                        <Form.Label>Quiz Type</Form.Label>
                                        <Form.Select
                                            value={quiz.quizType || "GRADED_QUIZ"}
                                            onChange={(e) => setQuiz({ ...quiz, quizType: e.target.value })}
                                        >
                                            <option value="GRADED_QUIZ">Graded Quiz</option>
                                            <option value="PRACTICE_QUIZ">Practice Quiz</option>
                                            <option value="GRADED_SURVEY">Graded Survey</option>
                                            <option value="UNGRADED_SURVEY">Ungraded Survey</option>
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group className="mb-2">
                                        <Form.Label>Assignment Group</Form.Label>
                                        <Form.Select
                                            value={quiz.assignmentGroup || "QUIZZES"}
                                            onChange={(e) => setQuiz({ ...quiz, assignmentGroup: e.target.value })}
                                        >
                                            <option value="QUIZZES">Quizzes</option>
                                            <option value="EXAMS">Exams</option>
                                            <option value="ASSIGNMENTS">Assignments</option>
                                            <option value="PROJECT">Project</option>
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group className="mb-2">
                                        <Form.Label>Shuffle Answers</Form.Label>
                                        <Form.Select
                                            value={quiz.shuffleAnswers ? "YES" : "NO"}
                                            onChange={(e) => setQuiz({ ...quiz, shuffleAnswers: e.target.value === "YES" })}
                                        >
                                            <option value="YES">Yes</option>
                                            <option value="NO">No</option>
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group className="mb-2">
                                        <Form.Label>Time Limit (Minutes)</Form.Label>
                                        <Form.Control
                                            type="number"
                                            value={quiz.timeLimitMinutes ?? 20}
                                            onChange={(e) => setQuiz({ ...quiz, timeLimitMinutes: Number(e.target.value) })}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-2">
                                        <Form.Label>Multiple Attempts</Form.Label>
                                        <Form.Select
                                            value={quiz.multipleAttempts ? "YES" : "NO"}
                                            onChange={(e) => setQuiz({ ...quiz, multipleAttempts: e.target.value === "YES" })}
                                        >
                                            <option value="NO">No</option>
                                            <option value="YES">Yes</option>
                                        </Form.Select>
                                    </Form.Group>
                                    {quiz.multipleAttempts && (
                                        <Form.Group className="mb-2">
                                            <Form.Label>How Many Attempts</Form.Label>
                                            <Form.Control
                                                type="number"
                                                value={quiz.allowedAttempts ?? 1}
                                                onChange={(e) => setQuiz({ ...quiz, allowedAttempts: Number(e.target.value) })}
                                            />
                                        </Form.Group>
                                    )}
                                    <Form.Group className="mb-2">
                                        <Form.Label>Show Correct Answers</Form.Label>
                                        <Form.Control
                                            value={quiz.showCorrectAnswers || "NEVER"}
                                            onChange={(e) => setQuiz({ ...quiz, showCorrectAnswers: e.target.value })}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-2">
                                        <Form.Label>Access Code</Form.Label>
                                        <Form.Control
                                            value={quiz.accessCode || ""}
                                            onChange={(e) => setQuiz({ ...quiz, accessCode: e.target.value })}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-2">
                                        <Form.Label>One Question at a Time</Form.Label>
                                        <Form.Select
                                            value={quiz.oneQuestionAtATime ? "YES" : "NO"}
                                            onChange={(e) => setQuiz({ ...quiz, oneQuestionAtATime: e.target.value === "YES" })}
                                        >
                                            <option value="YES">Yes</option>
                                            <option value="NO">No</option>
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group className="mb-2">
                                        <Form.Label>Webcam Required</Form.Label>
                                        <Form.Select
                                            value={quiz.webcamRequired ? "YES" : "NO"}
                                            onChange={(e) => setQuiz({ ...quiz, webcamRequired: e.target.value === "YES" })}
                                        >
                                            <option value="NO">No</option>
                                            <option value="YES">Yes</option>
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Lock Questions After Answering</Form.Label>
                                        <Form.Select
                                            value={quiz.lockQuestionsAfterAnswering ? "YES" : "NO"}
                                            onChange={(e) => setQuiz({ ...quiz, lockQuestionsAfterAnswering: e.target.value === "YES" })}
                                        >
                                            <option value="NO">No</option>
                                            <option value="YES">Yes</option>
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group className="mb-2">
                                        <Form.Label>Due Date</Form.Label>
                                        <Form.Control
                                            type="datetime-local"
                                            value={quiz.dueDate ? new Date(quiz.dueDate).toISOString().slice(0, 16) : ""}
                                            onChange={(e) => setQuiz({ ...quiz, dueDate: new Date(e.target.value) })}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-2">
                                        <Form.Label>Available Date</Form.Label>
                                        <Form.Control
                                            type="datetime-local"
                                            value={quiz.availableDate ? new Date(quiz.availableDate).toISOString().slice(0, 16) : ""}
                                            onChange={(e) => setQuiz({ ...quiz, availableDate: new Date(e.target.value) })}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-2">
                                        <Form.Label>Until Date</Form.Label>
                                        <Form.Control
                                            type="datetime-local"
                                            value={quiz.untilDate ? new Date(quiz.untilDate).toISOString().slice(0, 16) : ""}
                                            onChange={(e) => setQuiz({ ...quiz, untilDate: new Date(e.target.value) })}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Form>
                    </Card.Body>
                </Card>
            ) : (
                <QuestionsTab qid={qid!} questions={questions} setQuestions={setQuestions} />
            )}
        </div>
    );
}

function QuestionsTab({ qid, questions, setQuestions }: any) {
    const load = async () => {
        const qs = await qclient.listQuestions(qid);
        setQuestions(Array.isArray(qs) ? qs : []);
    };
    useEffect(() => { load(); }, [qid]);

    const add = async () => {
        await qclient.createQuestion(qid, {
            type: "MULTIPLE_CHOICE",
            title: "New Question",
            points: 1,
            choices: [
                { text: "Choice A", isCorrect: true },
                { text: "Choice B", isCorrect: false },
            ],
        });
        await load();
    };

    const remove = async (id: string) => {
        await qclient.deleteQuestion(id);
        await load();
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-2">
                <h5>Questions</h5>
                <Button onClick={add}>New Question</Button>
            </div>

            {questions.length === 0 ? (
                <div className="alert alert-info">No questions yet. Click <strong>New Question</strong>.</div>
            ) : (
                <div className="d-flex flex-column gap-2">
                    {questions.map((q: any) => (
                        <Card key={q._id}>
                            <Card.Body>
                                <div className="d-flex justify-content-between align-items-start">
                                    <div>
                                        <div className="fw-semibold">{q.title} <span className="text-muted">({q.points} pts)</span></div>
                                        <div className="small text-muted">{q.type.replaceAll("_", " ")}</div>
                                    </div>
                                    <div className="d-flex gap-2">
                                        <NavLink
                                            to={`questions/${q._id}`}
                                            className="btn btn-sm btn-outline-secondary"
                                        >
                                            Edit
                                        </NavLink>
                                        <Button
                                            size="sm"
                                            variant="outline-danger"
                                            onClick={() => remove(q._id)}
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}