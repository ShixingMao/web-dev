export default function AssignmentEditor() {
    return (
        <div id="wd-assignments-editor">
            <label htmlFor="wd-name">Assignment Name</label><br />
            <input id="wd-name" value="A1 - ENV + HTML" /><br /><br />
            <textarea id="wd-description">
                The assignment is available online Submit a link to the landing page of
            </textarea>
            <br />
            <table>
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-points">Points</label>
                    </td>
                    <td>
                        <input id="wd-points" value={100} />
                    </td>
                </tr>

                {/* ✅ Completed below as requested */}
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-group">Assignment Group</label>
                    </td>
                    <td>
                        <select id="wd-group">
                            <option>ASSIGNMENTS</option>
                            <option>QUIZZES</option>
                            <option>EXAMS</option>
                            <option>PROJECT</option>
                        </select>
                    </td>
                </tr>

                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-display-grade-as">Display Grade as</label>
                    </td>
                    <td>
                        <select id="wd-display-grade-as">
                            <option>Percentage</option>
                            <option>Points</option>
                            <option>Complete/Incomplete</option>
                        </select>
                    </td>
                </tr>

                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-submission-type">Submission Type</label>
                    </td>
                    <td>
                        <select id="wd-submission-type">
                            <option>Online</option>
                            <option>On Paper</option>
                            <option>No Submission</option>
                        </select><br /><br />
                        <label>Online Entry Options</label><br />
                        <label>
                            <input type="checkbox" id="wd-text-entry" /> Text Entry
                        </label><br />
                        <label>
                            <input type="checkbox" id="wd-website-url" /> Website URL
                        </label><br />
                        <label>
                            <input type="checkbox" id="wd-media-recordings" /> Media Recordings
                        </label><br />
                        <label>
                            <input type="checkbox" id="wd-student-annotation" /> Student Annotation
                        </label><br />
                        <label>
                            <input type="checkbox" id="wd-file-upload" /> File Upload
                        </label>
                    </td>
                </tr>

                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-assign-to">Assign</label><br />
                    </td>
                    <td>
                        <label htmlFor="wd-assign-to">Assign to</label><br />
                        <input id="wd-assign-to" value="Everyone" /><br /><br />

                        <label htmlFor="wd-due-date">Due</label><br />
                        <input defaultValue="2025-05-01" type="date" id="wd-due-date" /><br /><br />


                        <div style={{ display: "flex", gap: "16px" }}>
                            <div>
                                <label htmlFor="wd-available-from">Available from</label><br />
                                <input defaultValue="2025-05-01" type="date" id="wd-available-from" />
                            </div>
                            <div>
                                <label htmlFor="wd-available-until">Until</label><br />
                                <input defaultValue="2025-05-01" type="date" id="wd-available-until" />
                            </div>
                        </div>
                    </td>
                </tr>
            </table>
            <hr />

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "16px" }}>
                <button>Cancel</button>
                <button>Save</button>
            </div>
        </div>
    );
}

