// src/Kambaz/Courses/Quizzes/TakeQuiz.tsx
import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Card, Button, Form, Spinner } from "react-bootstrap";
// import { useSelector } from "react-redux";
import { BsBookmark } from "react-icons/bs";
import * as qclient from "./client";

type Answer =
    | { question: string; selectedChoiceIndex: number }
    | { question: string; selectedTrueFalse: boolean }
    | { question: string; filledText: string };

export default function TakeQuiz() {
    const { cid, qid } = useParams();
    const navigate = useNavigate();
    // const { currentUser } = useSelector((s: any) => s.accountReducer);

    const [loading, setLoading] = useState(true);
    const [quiz, setQuiz] = useState<any>(null);
    const [questions, setQuestions] = useState<any[]>([]);
    const [answers, setAnswers] = useState<Record<string, Answer>>({});
    const [startedAt] = useState<Date>(new Date());
    const [savedAt, setSavedAt] = useState<Date | null>(null);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        (async () => {
            if (!qid) return;
            try {
                setLoading(true);
                const q = await qclient.getQuiz(qid);
                setQuiz(q);
                const qs = await qclient.listQuestions(qid);
                setQuestions(Array.isArray(qs) ? qs : []);
            } finally {
                setLoading(false);
            }
        })();
    }, [qid]);

    // default to one-question-at-a-time unless explicitly false
    const oneAtATime = useMemo(() => quiz?.oneQuestionAtATime !== false, [quiz]);

    const total = questions.length;
    const current = questions[index];

    const markSaved = () => setSavedAt(new Date());

    const updateAnswer = (q: any, next: Answer) => {
        setAnswers((prev) => ({ ...prev, [q._id]: next }));
        markSaved();
    };

    const handlePrev = () => {
        if (index > 0) {
            setIndex(index - 1);
            markSaved();
        }
    };

    const handleNext = () => {
        if (index < total - 1) {
            setIndex(index + 1);
            markSaved();
        }
    };

    const handleSubmit = async () => {
        if (!qid) return;
        const payload: Answer[] = Object.values(answers);
        try {
            await qclient.submitAttempt(qid, payload);
            navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}/Review`); // <— go to review
        } catch (e: any) {
            if (e?.response?.status === 403) {
                alert("You have exhausted your allowed attempts.");
            } else {
                alert("Failed to submit quiz. Please try again.");
            }
        }
    };

    if (loading) {
        return (
            <div className="p-3 d-flex align-items-center gap-2">
                <Spinner animation="border" size="sm" /> Loading…
            </div>
        );
    }
    if (!quiz) return <div className="p-3">Quiz not found.</div>;

    return (
        <div className="p-3">
            {/* Title + start time */}
            <h3 className="mb-1">{quiz.title}</h3>
            <div className="text-muted mb-2">Started at: {startedAt.toLocaleString()}</div>

            <h3 className="mb-1">Quiz Instructions
            </h3>
            <hr className="mb-3" />

            {/* Bookmark left + Question box (no rounded corners) */}
            <div className="d-flex align-items-start gap-3">
                <div className="pt-2">
                    <BsBookmark className="fs-2 text-muted" />
                </div>

                <div className="flex-grow-1">
                    <Card className="rounded-0">
                        <Card.Body>
                            {oneAtATime ? (
                                current ? (
                                    <QuestionBlock
                                        q={current}
                                        value={answers[current._id]}
                                        onChange={(ans) => updateAnswer(current, ans)}
                                        number={index + 1}
                                        total={total}
                                    />
                                ) : (
                                    <div className="text-muted">No questions.</div>
                                )
                            ) : questions.length === 0 ? (
                                <div className="text-muted">No questions.</div>
                            ) : (
                                questions.map((q, i) => (
                                    <div key={q._id} className="mb-4">
                                        <QuestionBlock
                                            q={q}
                                            value={answers[q._id]}
                                            onChange={(ans) => updateAnswer(q, ans)}
                                            number={i + 1}
                                            total={total}
                                        />
                                        {i < questions.length - 1 && <hr />}
                                    </div>
                                ))
                            )}
                        </Card.Body>
                    </Card>
                </div>
            </div>

            {/* Prev / Next controls outside the box, bottom-right */}
            {oneAtATime && total > 0 && (
                <div className="d-flex justify-content-end mt-3 gap-2">
                    {index > 0 && (
                        <Button variant="outline-secondary" onClick={handlePrev}>
                            Previous Question
                        </Button>
                    )}
                    {index < total - 1 && (
                        <Button variant="outline-secondary" onClick={handleNext}>
                            Next Question
                        </Button>
                    )}
                </div>
            )}

            {/* Status + Submit in a separate box */}
            <Card className="mt-3">
                <Card.Body className="d-flex justify-content-between align-items-center">
                    <div>
                        Quiz saved at {savedAt ? savedAt.toLocaleTimeString() : "—"}
                    </div>
                    <Button variant="primary" onClick={handleSubmit}>
                        Submit Quiz
                    </Button>
                </Card.Body>
            </Card>

            <div className="mt-3">
                <Link to={`/Kambaz/Courses/${cid}/Quizzes/${qid}`} className="text-decoration-none">
                    ← Back to Details
                </Link>
            </div>
        </div>
    );
}

function QuestionBlock({
    q,
    value,
    onChange,
    number,
    total,
}: {
    q: any;
    value: any;
    onChange: (a: Answer) => void;
    number: number;
    total: number;
}) {
    return (
        <div>
            {/* Header: left = Question X of Y, right = ? pts */}
            <div className="d-flex justify-content-between align-items-center mb-2">
                <div className="fw-semibold">
                    Question {number} of {total}
                </div>
                <div className="text-muted">{q.points ?? 1} pts</div>
            </div>

            {q.prompt && <div className="mb-3">{q.prompt}</div>}

            {q.type === "MULTIPLE_CHOICE" && (
                <Form>
                    {(q.choices || []).map((ch: any, idx: number) => (
                        <Form.Check
                            key={idx}
                            type="radio"
                            name={`mc-${q._id}`}
                            id={`mc-${q._id}-${idx}`}
                            className="mb-2"
                            label={ch.text || `Choice ${idx + 1}`}
                            checked={value?.selectedChoiceIndex === idx}
                            onChange={() =>
                                onChange({ question: q._id, selectedChoiceIndex: idx })
                            }
                        />
                    ))}
                </Form>
            )}

            {q.type === "TRUE_FALSE" && (
                <Form>
                    <Form.Check
                        type="radio"
                        id={`tf-${q._id}-true`}
                        name={`tf-${q._id}`}
                        label="True"
                        className="mb-2"
                        checked={value?.selectedTrueFalse === true}
                        onChange={() =>
                            onChange({ question: q._id, selectedTrueFalse: true })
                        }
                    />
                    <Form.Check
                        type="radio"
                        id={`tf-${q._id}-false`}
                        name={`tf-${q._id}`}
                        label="False"
                        checked={value?.selectedTrueFalse === false}
                        onChange={() =>
                            onChange({ question: q._id, selectedTrueFalse: false })
                        }
                    />
                </Form>
            )}

            {q.type === "FILL_IN_BLANK" && (
                <Form.Group>
                    <Form.Label>Answer</Form.Label>
                    <Form.Control
                        value={value?.filledText || ""}
                        onChange={(e) =>
                            onChange({ question: q._id, filledText: e.target.value })
                        }
                    />
                </Form.Group>
            )}
        </div>
    );
}

<h3 className="mb-1">Quiz Instructions
</h3>