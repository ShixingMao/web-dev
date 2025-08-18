import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Card, Row, Col, Button, Badge } from "react-bootstrap";
import { useSelector } from "react-redux";
import { FaPencilAlt } from "react-icons/fa";
import * as qclient from "./client";

export default function QuizDetails() {
  const { cid, qid } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [lastAttempt, setLastAttempt] = useState<any>(null);
  const [attemptSummary, setAttemptSummary] = useState<{
    used: number; limit: number; remaining: number; canAttempt: boolean;
  } | null>(null);

  const { currentUser } = useSelector((s: any) => s.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY";

  // Load quiz, questions, and student's last attempt (if student)
  useEffect(() => {
    (async () => {
      if (!qid) return;
      const q = await qclient.getQuiz(qid);
      setQuiz(q);
      const qs = await qclient.listQuestions(qid);
      setQuestions(Array.isArray(qs) ? qs : []);
      if (!isFaculty) {
        const la = await qclient.getLastAttempt(qid);
        setLastAttempt(la || null);
      }
    })();
  }, [qid, isFaculty]);

  // Load attempts count for the student (non-conditional hook)
  useEffect(() => {
    (async () => {
      if (!qid || !quiz || !currentUser?._id || isFaculty) {
        setAttemptSummary(null);
        return;
      }
      try {
        const { count } = await qclient.getAttemptsCount(qid);
        const limit = quiz.multipleAttempts ? (quiz.allowedAttempts ?? 1) : 1;
        const used = count ?? 0;
        const remaining = Math.max(0, limit - used);
        const canAttempt = used < limit;
        setAttemptSummary({ used, limit, remaining, canAttempt });
      } catch (e) {
        console.error("Failed to load attempts count", e);
        setAttemptSummary(null);
      }
    })();
  }, [qid, quiz, currentUser?._id, isFaculty]);

  if (!quiz) return <div className="p-3">Loading…</div>;

  const totalPoints = questions.reduce((s, x) => s + (x.points || 0), 0);
  const showCorrect = String(quiz.showCorrectAnswers || "").trim().toUpperCase() === "YES";

  const v = {
    quizType:
      quiz.quizType === "PRACTICE_QUIZ" ? "Practice Quiz" :
      quiz.quizType === "GRADED_SURVEY" ? "Graded Survey" :
      quiz.quizType === "UNGRADED_SURVEY" ? "Ungraded Survey" :
      "Graded Quiz",
    assignmentGroup:
      quiz.assignmentGroup === "EXAMS" ? "Exams" :
      quiz.assignmentGroup === "ASSIGNMENTS" ? "Assignments" :
      quiz.assignmentGroup === "PROJECT" ? "Project" :
      "Quizzes",
    shuffleAnswers: quiz.shuffleAnswers ? "Yes" : "No",
    timeLimit: `${quiz.timeLimitMinutes ?? 20} Minutes`,
    multipleAttempts: quiz.multipleAttempts ? "Yes" : "No",
    allowedAttempts: String(quiz.allowedAttempts ?? 1),
    showCorrectAnswers: quiz.showCorrectAnswers || "If and when correct answers are shown to students",
    accessCode: quiz.accessCode ? "Set" : "",
    oneAtATime: quiz.oneQuestionAtATime ? "Yes" : "No",
    webcamRequired: quiz.webcamRequired ? "Yes" : "No",
    lockAfterAnswering: quiz.lockQuestionsAfterAnswering ? "Yes" : "No",
    dueDate: quiz.dueDate ? new Date(quiz.dueDate).toLocaleString() : "—",
    availableDate: quiz.availableDate ? new Date(quiz.availableDate).toLocaleString() : "—",
    untilDate: quiz.untilDate ? new Date(quiz.untilDate).toLocaleString() : "—",
    forWhom: "Everyone",
  };

  const availability = (() => {
    const now = new Date();
    const avail = quiz.availableDate ? new Date(quiz.availableDate) : undefined;
    const until = quiz.untilDate ? new Date(quiz.untilDate) : undefined;
    if (avail && now < avail) return `Not available until ${avail.toLocaleString()}`;
    if (until && now > until) return "Closed";
    return "Available";
  })();

  // Answers mapped by question id
  const ansByQ = (() => {
    const map = new Map<string, any>();
    (lastAttempt?.answers || []).forEach((a: any) => map.set(a.question, a));
    return map;
  })();

  const studentHasResults = !isFaculty && !!lastAttempt && showCorrect;

  return (
    <div className="p-3">
      {/* Centered actions */}
      <div className="d-flex justify-content-center gap-2 mb-3">
        <Link
          to={`/Kambaz/Courses/${cid}/Quizzes/${qid}/Preview`}
          className="btn btn-outline-secondary"
        >
          Preview
        </Link>

        {isFaculty ? (
          <Link
            to={`/Kambaz/Courses/${cid}/Quizzes/${qid}/Edit`}
            className="btn btn-primary d-inline-flex align-items-center gap-2"
          >
            <FaPencilAlt /> Edit
          </Link>
        ) : (
          <Button
            className="btn btn-primary"
            onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}/Take`)}
            disabled={attemptSummary ? !attemptSummary.canAttempt : false}
            title={attemptSummary && !attemptSummary.canAttempt ? "No attempts remaining" : ""}
          >
            {lastAttempt ? "Retake Quiz" : "Start Quiz"}
          </Button>
        )}
      </div>

      {/* Attempts info for students */}
      {!isFaculty && attemptSummary && (
        <div className="alert alert-light border mb-3">
          <strong>Attempts:</strong> {attemptSummary.used} of {attemptSummary.limit}
          {attemptSummary.remaining > 0
            ? <> · {attemptSummary.remaining} remaining</>
            : <> · No attempts remaining</>}
        </div>
      )}

      {/* Details box */}
      <Card>
        <Card.Body>
          {/* Header row */}
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h4 className="mb-0">{quiz.title}</h4>
            <div className="d-flex gap-2">
              <Badge bg={quiz.published ? "success" : "secondary"}>
                {quiz.published ? "Published" : "Unpublished"}
              </Badge>
              <Badge bg="info">{availability}</Badge>
            </div>
          </div>

          {/* Properties */}
          <div className="mb-4">
            <DetailRow label="Quiz Type" value={v.quizType} />
            <DetailRow label="Points" value={String(totalPoints)} />
            <DetailRow label="Assignment Group" value={v.assignmentGroup} />
            <DetailRow label="Shuffle Answers" value={v.shuffleAnswers} />
            <DetailRow label="Time Limit" value={v.timeLimit} />
            <DetailRow label="Multiple Attempts" value={v.multipleAttempts} />
            <DetailRow label="How Many Attempts" value={v.allowedAttempts} />
            <DetailRow label="Show Correct Answers" value={v.showCorrectAnswers} />
            <DetailRow label="Access Code" value={v.accessCode || " "} />
            <DetailRow label="One Question at a Time" value={v.oneAtATime} />
            <DetailRow label="Webcam Required" value={v.webcamRequired} />
            <DetailRow label="Lock Questions After Answering" value={v.lockAfterAnswering} />
          </div>

          {/* Student results section (if allowed) */}
          {studentHasResults && (
            <>
              <h5 className="mb-2">Your Last Attempt</h5>
              <div className="mb-3">
                <Row className="fw-semibold text-muted small">
                  <Col md={3}>Score</Col>
                  <Col md={3}>Submitted</Col>
                  <Col md={3}>Questions</Col>
                  <Col md={3}></Col>
                </Row>
                <Row className="mt-1">
                  <Col md={3}>{lastAttempt.score}</Col>
                  <Col md={3}>{new Date(lastAttempt.submittedAt).toLocaleString()}</Col>
                  <Col md={3}>{questions.length}</Col>
                  <Col md={3}></Col>
                </Row>
              </div>

              <div className="d-flex flex-column gap-3">
                {questions.map((q, i) => {
                  const a = ansByQ.get(q._id);
                  const correct = !!a?.isCorrect;
                  return (
                    <div
                      key={q._id}
                      className="p-3 border"
                      style={{
                        borderColor: correct ? "#28a745" : "#dc3545",
                        background: correct ? "#f6fff8" : "#fff6f6",
                      }}
                    >
                      <div className="d-flex justify-content-between align-items-start mb-1">
                        <div className="fw-semibold">
                          {correct ? "✅" : "❌"} Question {i + 1}: {q.title || "(Untitled)"}
                        </div>
                        <div className="text-muted">{q.points ?? 0} pts</div>
                      </div>

                      {q.prompt && <div className="mb-2">{q.prompt}</div>}

                      {q.type === "MULTIPLE_CHOICE" && (
                        <ul className="mb-0">
                          {(q.choices || []).map((choice: any, idx: number) => {
                            const picked = a?.selectedChoiceIndex === idx;
                            const isCorrect = !!choice.isCorrect;
                            return (
                              <li key={idx}>
                                <span className={isCorrect ? "text-success" : ""}>
                                  {choice.text || "(empty)"}{" "}
                                  {isCorrect && <strong>(correct)</strong>}
                                  {picked && " — your answer"}
                                </span>
                              </li>
                            );
                          })}
                        </ul>
                      )}

                      {q.type === "TRUE_FALSE" && (
                        <div className="mb-0">
                          <div>
                            Your answer:{" "}
                            <strong>{String(!!a?.selectedTrueFalse).toUpperCase()}</strong>
                          </div>
                          <div>
                            Correct answer:{" "}
                            <strong>{String(!!q.correct).toUpperCase()}</strong>
                          </div>
                        </div>
                      )}

                      {q.type === "FILL_IN_BLANK" && (
                        <div className="mb-0">
                          <div>
                            Your answer: <strong>{a?.filledText ?? "—"}</strong>
                          </div>
                          <div>
                            Acceptable answers:{" "}
                            <strong>
                              {(q.blanks || []).length > 0 ? q.blanks.join(", ") : "—"}
                            </strong>
                          </div>
                          {!q.caseSensitive && (
                            <div className="text-muted small">
                              Comparison is case-insensitive
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {/* Bottom 4 columns */}
          <div className="mt-4">
            <Row className="fw-semibold text-muted small">
              <Col md={3}>Due</Col>
              <Col md={3}>For</Col>
              <Col md={3}>Available From</Col>
              <Col md={3}>Until</Col>
            </Row>
            <Row className="mt-1">
              <Col md={3}>{v.dueDate}</Col>
              <Col md={3}>{v.forWhom}</Col>
              <Col md={3}>{v.availableDate}</Col>
              <Col md={3}>{v.untilDate}</Col>
            </Row>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="d-flex">
      <div style={{ minWidth: 260 }} className="text-muted">
        {label}
      </div>
      <div className="flex-fill">{value}</div>
    </div>
  );
}
