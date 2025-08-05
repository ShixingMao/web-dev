import { useState } from "react";
import { FormControl, FormCheck } from "react-bootstrap";
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
export default function WorkingWithObjects() {
    const [assignment, setAssignment] = useState({
        id: 1, title: "NodeJS Assignment",
        description: "Create a NodeJS server with ExpressJS",
        due: "2021-10-10", completed: false, score: 0,
    });
    const [module, setModule] = useState({
        name: "React Basics",
        description: "Intro to React",
    });
    const ASSIGNMENT_API_URL = `${REMOTE_SERVER}/lab5/assignment`
    const MODULE_API_URL = `${REMOTE_SERVER}/lab5/module`;

    return (
        <div id="wd-working-with-objects">
            <h3>Working With Objects</h3>
            <h4>Modifying Properties</h4>
            <a id="wd-update-assignment-title"
                className="btn btn-primary float-end"
                href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}>
                Update Title
            </a>
            <FormControl className="w-75" id="wd-assignment-title"
                defaultValue={assignment.title} onChange={(e) =>
                    setAssignment({ ...assignment, title: e.target.value })} />
            <hr />
            <a id="wd-update-assignment-score"
                className="btn btn-primary float-end"
                href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}>
                Update Score
            </a>
            <FormControl className="w-75" id="wd-assignment-score"
                defaultValue={assignment.score} onChange={(e) =>
                    setAssignment({ ...assignment, score: parseInt(e.target.value) })} />
            <hr />
            <FormCheck
                id="wd-assignment-completed"
                type="checkbox"
                className="mb-2"
                label="Completed"
                checked={assignment.completed}
                onChange={(e) => setAssignment({ ...assignment, completed: e.target.checked })}
            />
            <a
                href={`${ASSIGNMENT_API_URL}/completed/${assignment.completed}`}
                className="btn btn-success mb-2"
                id="wd-update-assignment-completed"
            >
                Update Completed
            </a>
            <h4>Retrieving Objects</h4>
            <a id="wd-retrieve-assignments" className="btn btn-primary"
                href={`${REMOTE_SERVER}/lab5/assignment`}>
                Get Assignment
            </a><hr />
            <h4>Retrieving Properties</h4>
            <a id="wd-retrieve-assignment-title" className="btn btn-primary"
                href={`${REMOTE_SERVER}/lab5/assignment/title`}>
                Get Title
            </a><hr />
            <h4>Retrieving Module</h4>
            <a href={`${MODULE_API_URL}`} className="btn btn-primary mb-2" id="wd-get-module">
                Get Module
            </a>
            <a href={`${MODULE_API_URL}/name`} className="btn btn-primary mb-2" id="wd-get-module-name">
                Get Module Name
            </a>

            <h4>Modifying Module</h4>
            <FormControl
                className="mb-2 w-75"
                value={module.name}
                onChange={(e) => setModule({ ...module, name: e.target.value })}
            />
            <a
                href={`${MODULE_API_URL}/name/${module.name}`}
                className="btn btn-success mb-2"
                id="wd-update-module-name"
            >
                Update Module Name
            </a>

            <FormControl
                className="mb-2 w-75"
                value={module.description}
                onChange={(e) => setModule({ ...module, description: e.target.value })}
            />
            <a
                href={`${MODULE_API_URL}/description/${module.description}`}
                className="btn btn-success mb-2"
                id="wd-update-module-description"
            >
                Update Module Description
            </a>

        </div>
    );
}

