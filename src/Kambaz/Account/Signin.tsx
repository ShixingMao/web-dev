import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";
import { Button, Card, FormControl, Nav } from "react-bootstrap";
import * as client from "./client";

export default function Signin() {
  const [credentials, setCredentials] = useState<any>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signin = async () => {
    const user =  await client.signin(credentials);
    if (!user) return;
    dispatch(setCurrentUser(user));
    navigate("/Kambaz/Dashboard");
  };


  return (
    <div id="wd-signin-screen">
      <h1>Sign in</h1>
      <FormControl defaultValue={credentials.username}
        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
        className="mb-2" placeholder="username" id="wd-username" />
      <FormControl defaultValue={credentials.password}
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        className="mb-2" placeholder="password" type="password" id="wd-password" />
      <Button onClick={signin} id="wd-signin-btn" className="w-100" > Sign in </Button>
      <Link id="wd-signup-link" to="/Kambaz/Account/Signup"> Sign up </Link>

      <Card>
        <Card.Header>Team & Project Info</Card.Header>
        <Card.Body>
          <h6 className="mb-2">Team Member</h6>
          <ul className="mb-3">
              <li>
                <strong>Shixing Mao</strong>
              </li>
          </ul>

          <h6 className="mb-2">Links</h6>
          <Nav className="flex-column">
            <Nav.Item>
              <Nav.Link href="https://github.com/ShixingMao/web-dev/" target="_blank" rel="noreferrer">
                Frontend GitHub
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="https://github.com/ShixingMao/kambaz-node-server-app" target="_blank" rel="noreferrer">
                Server GitHub
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="https://kambaz-node-server-app-project-jcse.onrender.com" target="_blank" rel="noreferrer">
                Render Server
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Card.Body>
      </Card>
      
    </div>
  );
}
