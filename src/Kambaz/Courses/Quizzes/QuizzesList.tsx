import { 
  ListGroup, Button, FormControl, InputGroup, Modal, Dropdown
} from "react-bootstrap";
import { BsGripVertical, BsThreeDotsVertical } from "react-icons/bs";
import { FaSearch, FaPlus } from "react-icons/fa";
import { RxTriangleDown } from "react-icons/rx";
import { LuNotebookPen } from "react-icons/lu";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import * as qclient from "./client";

export default function QuizzesList() {
  const { cid } = useParams();
  const navigate = useNavigate();

  const { currentUser } = useSelector((s: any) => s.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY";

  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [confirmId, setConfirmId] = useState<string | null>(null);

  const load = async () => {
    if (!cid) return;
    try {
      setIsLoading(true);
      const list = await qclient.listQuizzes(cid);
      setQuizzes(Array.isArray(list) ? list : []);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => { load(); /* eslint-disable-next-line */ }, [cid]);

  const filtered = useMemo(
    () => quizzes.filter((q) => (q.title || "").toLowerCase().includes(search.toLowerCase())),
    [quizzes, search]
  );

  const addQuiz = async () => {
    if (!cid) return;
    const created = await qclient.createQuiz(cid, { title: "New Quiz" });
    // On create, go to Editor (Canvas behavior often goes to settings)
    navigate(`/Kambaz/Courses/${cid}/Quizzes/${created._id}/Edit`);
  };

  const togglePublish = async (quiz: any) => {
    await qclient.setPublished(quiz._id, !quiz.published);
    await load();
  };

  const remove = async (id: string) => {
    await qclient.deleteQuiz(id);
    await load();
  };

  const availabilityText = (q: any) => {
    const now = new Date();
    const avail = q.availableDate ? new Date(q.availableDate) : undefined;
    const until = q.untilDate ? new Date(q.untilDate) : undefined;
    if (avail && now < avail) return `Not available until ${avail.toLocaleString()}`;
    if (until && now > until) return "Closed";
    return "Available";
  };

  return (
    <div id="wd-quizzes" className="p-3">
      {/* Top Controls (match Assignments) */}
      <div className="d-flex justify-content-between mb-4">
        <InputGroup style={{ maxWidth: "300px" }}>
          <InputGroup.Text><FaSearch /></InputGroup.Text>
          <FormControl
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </InputGroup>
        {isFaculty && (
          <div>
            <Button variant="secondary" className="me-2" disabled>
              <FaPlus className="me-2" /> Group
            </Button>
            <Button variant="danger" onClick={addQuiz}>
              <FaPlus className="me-2" /> Quiz
            </Button>
          </div>
        )}
      </div>

      {/* Quizzes Group header (styled like Assignments) */}
      <ListGroup className="rounded-0" id="wd-quiz-list">
        <ListGroup.Item className="p-0 mb-5 fs-5 border-gray">
          <div className="p-3 ps-2 bg-light d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <BsGripVertical className="me-1 fs-3" />
              <RxTriangleDown className="me-1 fs-3" />
              <span className="fw-bold">QUIZZES</span>
            </div>
            <div className="d-flex align-items-center">
              <span className="ms-2 badge rounded-pill bg-light text-muted border fs-6">
                {filtered.length} total
              </span>
            </div>
          </div>

          {/* Body */}
          {isLoading ? (
            <div className="p-3">Loading quizzes...</div>
          ) : filtered.length === 0 ? (
            <div className="p-3 text-center text-muted">
              No quizzes found. {isFaculty && <>Click <b>+ Quiz</b> to add one.</>}
            </div>
          ) : (
            <ListGroup className="rounded-0">
              {filtered.map((q: any, idx: number) => {
                const due = q.dueDate ? new Date(q.dueDate).toLocaleString() : "—";
                return (
                  <ListGroup.Item
                    key={q._id}
                    className="p-3 d-flex align-items-center justify-content-between"
                  >
                    <div className="d-flex align-items-center">
                      <BsGripVertical className="me-2 fs-3" />
                      <LuNotebookPen className={`fs-3 ${q.published ? "text-success" : "text-danger"}`} />
                      <div className="ms-3">
                        {/* Clicking title goes to PREVIEW */}
                        <Link
                          to={`/Kambaz/Courses/${cid}/Quizzes/${q._id}`}
                          className="text-muted fw-bold text-decoration-none"
                        >
                          {`Q${idx + 1} - ${q.title}`}
                        </Link>
                        <div className="text-muted">
                          <span className={q.published ? "text-success" : "text-danger"}>
                            {q.published ? "Published" : "Unpublished"}
                          </span>{" "}
                          | <b>{availabilityText(q)}</b>
                          {" | "}<b>Due</b> {due}
                          {" | "}{q.points ?? 0} pts
                        </div>
                      </div>
                    </div>

                    {/* Canvas-like 3-dot context menu (faculty); students get minimal menu */}
                    <Dropdown align="end">
                      <Dropdown.Toggle
                        variant="light"
                        size="sm"
                        className="border-0"
                        aria-label="Quiz options"
                      >
                        <BsThreeDotsVertical />
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        {isFaculty ? (
                          <>
                            {/* Edit -> Quiz Details screen (not editor) */}
                            <Dropdown.Item
                              onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes/${q._id}`)}
                            >
                              Edit
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => setConfirmId(q._id)}>
                              Delete
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => togglePublish(q)}>
                              {q.published ? "Unpublish" : "Publish"}
                            </Dropdown.Item>
                          </>
                        ) : (
                          <Dropdown.Item
                            onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes/${q._id}/Preview`)}
                          >
                            Open
                          </Dropdown.Item>
                        )}
                      </Dropdown.Menu>
                    </Dropdown>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          )}
        </ListGroup.Item>
      </ListGroup>

      {/* Confirm Delete */}
      <Modal show={!!confirmId} onHide={() => setConfirmId(null)} centered>
        <Modal.Header closeButton><Modal.Title>Confirm Delete</Modal.Title></Modal.Header>
        <Modal.Body>Delete this quiz?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setConfirmId(null)}>Cancel</Button>
          <Button
            variant="danger"
            onClick={() => { if (confirmId) remove(confirmId); setConfirmId(null); }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
