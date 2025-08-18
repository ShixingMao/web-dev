import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, Card, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import * as qclient from "./client";

export default function QuestionEditor() {
  const { qid, qnid, cid } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useSelector((s: any) => s.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY";
  const [question, setQuestion] = useState<any>(null);

  const load = async () => {
    if (!qnid) return;
    const list = await qclient.listQuestions(qid!);
    setQuestion(list.find((x: any) => x._id === qnid) || null);
  };
  useEffect(() => { load(); }, [qnid]);

  if (!isFaculty) return <div className="alert alert-danger">Only faculty can edit questions.</div>;
  if (!question) return <div className="alert alert-secondary">Loading…</div>;

  const save = async () => {
    await qclient.updateQuestionDirect(question._id, question);
    navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}/Edit`);
  };

  return (
    <Card>
      <Card.Body>
        <Row className="mb-3">
          <Col md={8}>
            <Form.Group className="mb-2">
              <Form.Label>Title</Form.Label>
              <Form.Control value={question.title || ""} onChange={(e) => setQuestion({ ...question, title: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Question</Form.Label>
              <Form.Control as="textarea" rows={4} value={question.prompt || ""} onChange={(e) => setQuestion({ ...question, prompt: e.target.value })} />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-2">
              <Form.Label>Points</Form.Label>
              <Form.Control type="number" value={question.points ?? 1} onChange={(e) => setQuestion({ ...question, points: Number(e.target.value) })} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Type</Form.Label>
              <Form.Select value={question.type} onChange={(e) => setQuestion({ ...question, type: e.target.value })}>
                <option value="MULTIPLE_CHOICE">Multiple Choice</option>
                <option value="TRUE_FALSE">True / False</option>
                <option value="FILL_IN_BLANK">Fill in the Blank</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        {question.type === "MULTIPLE_CHOICE" && (
          <div className="mb-3">
            <Form.Label>Choices</Form.Label>
            {(question.choices || []).map((ch: any, idx: number) => (
              <div key={idx} className="d-flex align-items-center gap-2 mb-2">
                <Form.Check
                  type="radio"
                  name="correctChoice"
                  checked={!!ch.isCorrect}
                  onChange={() => {
                    const next = (question.choices || []).map((c: any, i: number) => ({ ...c, isCorrect: i === idx }));
                    setQuestion({ ...question, choices: next });
                  }}
                />
                <Form.Control
                  value={ch.text || ""}
                  onChange={(e) => {
                    const next = [...(question.choices || [])];
                    next[idx] = { ...next[idx], text: e.target.value };
                    setQuestion({ ...question, choices: next });
                  }}
                />
                <Button size="sm" variant="outline-danger" onClick={() => {
                  const next = [...(question.choices || [])];
                  next.splice(idx,1);
                  setQuestion({ ...question, choices: next });
                }}>Remove</Button>
              </div>
            ))}
            <Button size="sm" onClick={() => setQuestion({ ...question, choices: [ ...(question.choices || []), { text: "", isCorrect: false } ] })}>Add Choice</Button>
          </div>
        )}

        {question.type === "TRUE_FALSE" && (
          <Form.Group className="mb-3">
            <Form.Label>Correct Answer</Form.Label>
            <Form.Select value={String(!!question.correct)} onChange={(e) => setQuestion({ ...question, correct: e.target.value === "true" })}>
              <option value="true">True</option>
              <option value="false">False</option>
            </Form.Select>
          </Form.Group>
        )}

        {question.type === "FILL_IN_BLANK" && (
          <div className="mb-3">
            <Form.Label>Accepted Answers</Form.Label>
            {(question.blanks || []).map((ans: string, idx: number) => (
              <div key={idx} className="d-flex align-items-center gap-2 mb-2">
                <Form.Control value={ans} onChange={(e) => {
                  const next = [...(question.blanks || [])];
                  next[idx] = e.target.value;
                  setQuestion({ ...question, blanks: next });
                }} />
                <Button size="sm" variant="outline-danger" onClick={() => {
                  const next = [...(question.blanks || [])];
                  next.splice(idx,1);
                  setQuestion({ ...question, blanks: next });
                }}>Remove</Button>
              </div>
            ))}
            <Button size="sm" onClick={() => setQuestion({ ...question, blanks: [ ...(question.blanks || []), "" ] })}>Add Answer</Button>
            <Form.Check
              className="mt-2"
              type="checkbox"
              label="Case sensitive"
              checked={!!question.caseSensitive}
              onChange={(e) => setQuestion({ ...question, caseSensitive: e.target.checked })}
            />
          </div>
        )}

        <div className="d-flex gap-2">
          <Button variant="secondary" onClick={() => navigate(-1)}>Cancel</Button>
          <Button variant="primary" onClick={save}>Save / Update Question</Button>
        </div>
      </Card.Body>
    </Card>
  );
}