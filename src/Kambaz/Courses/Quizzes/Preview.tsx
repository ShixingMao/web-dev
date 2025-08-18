import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { BsBookmark } from "react-icons/bs";
import * as qclient from "./client";

type QA =
  | { question: string; selectedChoiceIndex?: number }
  | { question: string; selectedTrueFalse?: boolean }
  | { question: string; filledText?: string };

export default function QuizPreview() {
  const { cid, qid } = useParams();
  const { currentUser } = useSelector((s: any) => s.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY";

  const [quiz, setQuiz] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<Record<string, QA>>({});
  const [index, setIndex] = useState(0);

  // local “preview result” (not saved to DB)
  const [graded, setGraded] = useState(false);
  const [score, setScore] = useState(0);
  const [perQCorrect, setPerQCorrect] = useState<Record<string, boolean>>({});

  useEffect(() => {
    (async () => {
      if (!qid) return;
      const q = await qclient.getQuiz(qid);
      setQuiz(q);
      const qs = await qclient.listQuestions(qid);
      setQuestions(Array.isArray(qs) ? qs : []);
    })();
  }, [qid]);

  const currentQ = useMemo(() => questions[index], [questions, index]);
  const total = questions.length;

  // Faculty-only
  if (!isFaculty) {
    return (
      <div className="p-3">
        <div className="alert alert-warning mb-3">
          Preview is for faculty. Use <strong>Start Quiz</strong> to take the quiz.
        </div>
        <Link to={`/Kambaz/Courses/${cid}/Quizzes/${qid}`} className="btn btn-secondary">
          Back to Quiz Details
        </Link>
      </div>
    );
  }

  if (!quiz) return <div className="p-3">Loading…</div>;

  // Keep one source of truth; avoid duplicating "question" field
  const setAnswer = (patch: Partial<QA>) => {
    if (!currentQ) return;
    setAnswers(prev => {
      const prevQA = prev[currentQ._id] || {};
      const next: QA = { ...prevQA, ...patch, question: currentQ._id };
      return { ...prev, [currentQ._id]: next };
    });
    setGraded(false); // changing an answer invalidates previous grading
  };

  const gradeLocally = () => {
    let localScore = 0;
    const per: Record<string, boolean> = {};

    questions.forEach((q: any) => {
      const a = answers[q._id];
      let correct = false;

      if (q.type === "MULTIPLE_CHOICE") {
        const idx = (a as any)?.selectedChoiceIndex ?? -1;
        correct = !!q.choices?.[idx]?.isCorrect;
      } else if (q.type === "TRUE_FALSE") {
        correct = String(!!(a as any)?.selectedTrueFalse) === String(!!q.correct);
      } else if (q.type === "FILL_IN_BLANK") {
        const candidate = String((a as any)?.filledText || "").trim();
        const accepts = (q.blanks || []).some((b: string) => {
          if (q.caseSensitive) return b === candidate;
          return String(b).toLowerCase() === candidate.toLowerCase();
        });
        correct = accepts;
      }

      per[q._id] = correct;
      if (correct) localScore += q.points || 0;
    });

    setScore(localScore);
    setPerQCorrect(per);
    setGraded(true);
  };

  const totalPoints = questions.reduce((s, x) => s + (x.points || 0), 0);
  const showCorrectToStudents =
    String(quiz.showCorrectAnswers || "").trim().toUpperCase() === "YES";

  return (
    <div className="p-3">
      {/* Canvas-like top actions */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="mb-0">Preview: {quiz.title}</h3>
        <div className="d-flex gap-2">
          <span className="btn btn-outline-secondary disabled">Preview</span>
          <Link to={`/Kambaz/Courses/${cid}/Quizzes/${qid}/Edit`} className="btn btn-primary">
            Edit Quiz
          </Link>
        </div>
      </div>

      {/* Info note */}
      <div className="alert alert-info">
        You’re previewing as a student. Answers are <strong>not</strong> saved to the database.
        {showCorrectToStudents
          ? " Students will also see which answers are correct after submission."
          : " Students would NOT see correct answers after submission (per settings)."}
      </div>

      {/* Question box (no rounded corners), same look as TakeQuiz */}
      <Card className="border-1 rounded-0">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-start mb-2">
            <div className="d-flex align-items-center gap-2">
              <BsBookmark className="me-2" title="Bookmark" />
              <div className="fw-semibold">
                Question {index + 1} of {total}
              </div>
            </div>
            <div className="text-muted">{currentQ?.points ?? 0} pts</div>
          </div>

          {/* Prompt */}
          {currentQ?.prompt && <div className="mb-3">{currentQ.prompt}</div>}

          {/* Inputs like TakeQuiz */}
          {currentQ?.type === "MULTIPLE_CHOICE" && (
            <div className="d-flex flex-column gap-2">
              {(currentQ.choices || []).map((choice: any, i: number) => {
                const checked = (answers[currentQ._id] as any)?.selectedChoiceIndex === i;
                return (
                  <label key={i} className="d-flex align-items-center gap-2">
                    <input
                      type="radio"
                      name={`q_${currentQ._id}`}
                      checked={!!checked}
                      onChange={() => setAnswer({ selectedChoiceIndex: i })}
                    />
                    <span>{choice.text || "(empty)"}</span>
                  </label>
                );
              })}
            </div>
          )}

          {currentQ?.type === "TRUE_FALSE" && (
            <div className="d-flex flex-column gap-2">
              <label className="d-flex align-items-center gap-2">
                <input
                  type="radio"
                  name={`q_${currentQ._id}`}
                  checked={!!(answers[currentQ._id] as any)?.selectedTrueFalse === true}
                  onChange={() => setAnswer({ selectedTrueFalse: true })}
                />
                <span>True</span>
              </label>
              <label className="d-flex align-items-center gap-2">
                <input
                  type="radio"
                  name={`q_${currentQ._id}`}
                  checked={!!(answers[currentQ._id] as any)?.selectedTrueFalse === false}
                  onChange={() => setAnswer({ selectedTrueFalse: false })}
                />
                <span>False</span>
              </label>
            </div>
          )}

          {currentQ?.type === "FILL_IN_BLANK" && (
            <input
              className="form-control"
              value={(answers[currentQ._id] as any)?.filledText || ""}
              onChange={(e) => setAnswer({ filledText: e.target.value })}
            />
          )}
        </Card.Body>
      </Card>

      {/* Prev / Next outside the box */}
      <div className="d-flex justify-content-between mt-3">
        <Button
          variant="outline-secondary"
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          disabled={index === 0}
        >
          Previous
        </Button>
        <Button
          variant="outline-secondary"
          onClick={() => setIndex((i) => Math.min(total - 1, i + 1))}
          disabled={index >= total - 1}
        >
          Next
        </Button>
      </div>

      {/* Finish/Grade Preview */}
      <Card className="border-1 rounded-0 mt-3">
        <Card.Body className="d-flex justify-content-between align-items-center">
          <div className="text-muted">Preview mode — results are local only</div>
          <Button variant="primary" onClick={gradeLocally}>
            Grade Preview
          </Button>
        </Card.Body>
      </Card>

      {/* Results (local) */}
      {graded && (
        <div className="mt-3">
          <Card className="mb-3">
            <Card.Body>
              <strong>Preview Score:</strong> {score} / {totalPoints}
            </Card.Body>
          </Card>

          {/* Respect student setting: only show per-question correctness if students would see it */}
          {!showCorrectToStudents ? (
            <div className="alert alert-warning">
              Correct answers are hidden by settings (this matches what students would see).
            </div>
          ) : (
            <div className="d-flex flex-column gap-3">
              {questions.map((q: any, i: number) => {
                const a = answers[q._id];
                const correct = !!perQCorrect[q._id];
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
                          const picked = (a as any)?.selectedChoiceIndex === idx;
                          const isCorrect = !!choice.isCorrect;
                          return (
                            <li key={idx}>
                              <span className={isCorrect ? "text-success" : ""}>
                                {choice.text || "(empty)"} {isCorrect && <strong>(correct)</strong>}
                                {picked && " — your answer"}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    )}

                    {q.type === "TRUE_FALSE" && (
                      <div className="mb-0">
                        <div>Your answer: <strong>{String(!!(a as any)?.selectedTrueFalse).toUpperCase()}</strong></div>
                        <div>Correct answer: <strong>{String(!!q.correct).toUpperCase()}</strong></div>
                      </div>
                    )}

                    {q.type === "FILL_IN_BLANK" && (
                      <div className="mb-0">
                        <div>Your answer: <strong>{(a as any)?.filledText ?? "—"}</strong></div>
                        <div>
                          Acceptable answers:{" "}
                          <strong>{(q.blanks || []).length ? q.blanks.join(", ") : "—"}</strong>
                        </div>
                        {!q.caseSensitive && (
                          <div className="text-muted small">Comparison is case-insensitive</div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
