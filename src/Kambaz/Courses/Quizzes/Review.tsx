import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Card, Badge, Button } from "react-bootstrap";
// import { useSelector } from "react-redux";
import { BsCheckCircle, BsXCircle } from "react-icons/bs";
import * as qclient from "./client";

export default function QuizReview() {
  const { cid, qid } = useParams();
  const navigate = useNavigate();
//   const { currentUser } = useSelector((s: any) => s.accountReducer);

  const [quiz, setQuiz] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [attempt, setAttempt] = useState<any>(null);
  const [gate, setGate] = useState<any>(null); // can retake?

  useEffect(() => {
    (async () => {
      if (!qid) return;
      const q = await qclient.getQuiz(qid);
      setQuiz(q);
      const qs = await qclient.listQuestions(qid);
      setQuestions(Array.isArray(qs) ? qs : []);
      const last = await qclient.getLastAttempt(qid);
      setAttempt(last || null);
      const g = await qclient.canStartQuiz(qid);
      setGate(g);
    })();
  }, [qid]);

  if (!quiz || !attempt) return <div className="p-3">Loading…</div>;

  const answerOf = (questionId: string) =>
    (attempt.answers || []).find((a: any) => a.question === questionId);

  return (
    <div className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h3 className="mb-0">{quiz.title}</h3>
        <div className="d-flex gap-2">
          <Badge bg="secondary">Last attempt: {new Date(attempt.submittedAt).toLocaleString()}</Badge>
          <Badge bg="info">Score: {attempt.score}</Badge>
        </div>
      </div>
      <hr />

      <Card className="rounded-0">
        <Card.Body>
          {questions.length === 0 ? (
            <div className="text-muted">No questions.</div>
          ) : (
            questions.map((q: any, idx: number) => {
              const ans = answerOf(q._id);
              const correct = !!ans?.isCorrect;

              return (
                <div key={q._id} className="mb-4">
                  {/* Header: title + points + correctness */}
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <div className="fw-semibold">
                      Question {idx + 1} of {questions.length}
                    </div>
                    <div className="d-flex align-items-center gap-3">
                      <span className="text-muted">{q.points ?? 1} pts</span>
                      {correct ? (
                        <span className="text-success d-flex align-items-center gap-1">
                          <BsCheckCircle /> Correct
                        </span>
                      ) : (
                        <span className="text-danger d-flex align-items-center gap-1">
                          <BsXCircle /> Incorrect
                        </span>
                      )}
                    </div>
                  </div>

                  {q.prompt && <div className="mb-2">{q.prompt}</div>}

                  {/* Render as read-only with highlighting */}
                  {q.type === "MULTIPLE_CHOICE" && (
                    <div>
                      {(q.choices || []).map((ch: any, i: number) => {
                        const picked = ans?.selectedChoiceIndex === i;
                        const isRight = !!ch.isCorrect;

                        const cls =
                          isRight
                            ? "border border-success bg-success bg-opacity-10"
                            : picked
                            ? "border border-danger bg-danger bg-opacity-10"
                            : "border";

                        return (
                          <div key={i} className={`p-2 mb-2 rounded ${cls}`}>
                            {ch.text || `Choice ${i + 1}`}
                            {isRight && <span className="ms-2 badge bg-success">Correct</span>}
                            {picked && !isRight && (
                              <span className="ms-2 badge bg-danger">Your answer</span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {q.type === "TRUE_FALSE" && (
                    <div className="d-flex gap-2">
                      <span className={`p-2 rounded border ${ans?.selectedTrueFalse === true ? "border-2" : ""}`}>
                        You answered: <strong>True</strong>
                      </span>
                      <span className="p-2 rounded border">
                        Correct: <strong>{q.correct ? "True" : "False"}</strong>
                      </span>
                    </div>
                  )}

                  {q.type === "FILL_IN_BLANK" && (
                    <div className="d-flex gap-2 flex-wrap">
                      <span className={`p-2 rounded ${ans?.isCorrect ? "border border-success bg-success bg-opacity-10" : "border border-danger bg-danger bg-opacity-10"}`}>
                        Your answer: <strong>{ans?.filledText ?? ""}</strong>
                      </span>
                      {Array.isArray(q.blanks) && q.blanks.length > 0 && (
                        <span className="p-2 rounded border">
                          Accepted answers: {q.blanks.join(", ")}
                        </span>
                      )}
                    </div>
                  )}
                  {idx < questions.length - 1 && <hr />}
                </div>
              );
            })
          )}
        </Card.Body>
      </Card>

      <div className="d-flex justify-content-between align-items-center mt-3">
        <Link to={`/Kambaz/Courses/${cid}/Quizzes/${qid}`} className="text-decoration-none">
          ← Back to Details
        </Link>
        <div>
          <Button
            disabled={gate && gate.ok === false}
            onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}/Take`)}
          >
            {gate && gate.ok === false ? "No attempts left" : "Retake Quiz"}
          </Button>
        </div>
      </div>
    </div>
  );
}
