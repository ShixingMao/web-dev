import { useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useParams, useNavigate } from "react-router";
import * as client from "../../Account/client";
import { FaPencil } from "react-icons/fa6";
import { FaCheck, FaUserCircle } from "react-icons/fa";
import { FormControl, FormSelect } from "react-bootstrap";
export default function PeopleDetails() {
    const { uid } = useParams();
    const [user, setUser] = useState<any>({});
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [editing, setEditing] = useState(false);
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [editingRole, setEditingRole] = useState(false);
    const [editingEmail, setEditingEmail] = useState(false);

    const saveUser = async () => {
        const [firstName, lastName] = name.split(" ");
        const updatedUser = { ...user, firstName, lastName };
        await client.updateUser(updatedUser);
        setUser(updatedUser);
        setEditing(false);
        navigate(-1);
    };
    const saveEmail = async () => {
        const updatedUser = { ...user, email };
        await client.updateUser(updatedUser);
        setUser(updatedUser);
        setEditingEmail(false);
        navigate(-1);
    };
    const saveRole = async () => {
        const updatedUser = { ...user, role };
        await client.updateUser(updatedUser);
        setUser(updatedUser);
        setEditingRole(false);
        navigate(-1);
    };
    const deleteUser = async (uid: string) => {
        await client.deleteUser(uid);
        navigate(-1);
    };

    const fetchUser = async () => {
        if (!uid) return;
        const user = await client.findUserById(uid);
        setUser(user);
    };
    useEffect(() => {
        if (uid) fetchUser();
    }, [uid]);
    if (!uid) return null;
    return (
        <div className="wd-people-details position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow w-25">
            {/* Close button */}
            <button onClick={() => navigate(-1)} className="btn position-fixed end-0 top-0 wd-close-details">
                <IoCloseSharp className="fs-1" />
            </button>

            <div className="text-center mt-4 pt-3">
                <FaUserCircle className="text-secondary me-2 fs-1" />
            </div>
            <hr />

            {/* Name editing section - moved down after the user icon */}
            <div className="text-danger fs-4 mt-2">
                {!editing && (
                    <FaPencil onClick={() => setEditing(true)}
                        className="float-end fs-5 mt-2 me-3 wd-edit" />
                )}
                {editing && (
                    <FaCheck onClick={() => saveUser()}
                        className="float-end fs-5 mt-2 me-3 wd-save" />
                )}
                {!editing && (
                    <div className="wd-name"
                        onClick={() => setEditing(true)}>
                        {user.firstName} {user.lastName}
                    </div>
                )}
                {user && editing && (
                    <FormControl className="w-75 wd-edit-name"
                        defaultValue={`${user.firstName || ''} ${user.lastName || ''}`}
                        onChange={(e) => setName(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") { saveUser(); }
                        }} />
                )}
            </div>

            {/* Roles section with editing */}
            <div className="mt-3">
                <b>Roles:</b>
                {!editingRole && (
                    <>
                        <span className="wd-roles ms-2">
                            {user.role}
                        </span>
                        <FaPencil onClick={() => setEditingRole(true)}
                            className="text-danger ms-2 fs-6 wd-edit-role" />
                    </>
                )}
                {editingRole && (
                    <>
                        <FormSelect
                            className="d-inline-block ms-2 w-50"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}>
                            <option value="USER">USER</option>
                            <option value="STUDENT">STUDENT</option>
                            <option value="FACULTY">FACULTY</option>
                            <option value="ADMIN">ADMIN</option>
                        </FormSelect>
                        <FaCheck onClick={() => saveRole()}
                            className="text-danger ms-2 fs-6 wd-save-role" />
                    </>
                )}
            </div>

            {/* Email section with editing */}
            <div className="mt-2">
                <b>Email:</b>
                {!editingEmail && (
                    <>
                        <span className="wd-email ms-2">
                            {user.email}
                        </span>
                        <FaPencil onClick={() => setEditingEmail(true)}
                            className="text-danger ms-2 fs-6 wd-edit-email" />
                    </>
                )}
                {editingEmail && (
                    <>
                        <FormControl
                            type="email"
                            className="d-inline-block ms-2 w-50"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") { saveEmail(); }
                            }} />
                        <FaCheck onClick={() => saveEmail()}
                            className="text-danger ms-2 fs-6 wd-save-email" />
                    </>
                )}
            </div>

            {/* Remaining user details */}
            <div className="mt-2">
                <b>Login ID:</b>
                <span className="wd-login-id ms-2">
                    {user.loginId}
                </span>
            </div>
            <div className="mt-2">
                <b>Section:</b>
                <span className="wd-section ms-2">
                    {user.section}
                </span>
            </div>
            <div className="mt-2">
                <b>Total Activity:</b>
                <span className="wd-total-activity ms-2">
                    {user.totalActivity}
                </span>
            </div>

            <hr />
            <button onClick={() => deleteUser(uid)} className="btn btn-danger float-end wd-delete">
                Delete
            </button>
            <button onClick={() => navigate(-1)}
                className="btn btn-secondary float-start float-end me-2 wd-cancel">
                Cancel
            </button>
        </div>
    );
}
