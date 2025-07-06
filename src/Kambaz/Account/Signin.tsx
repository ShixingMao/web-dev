import { Link } from "react-router-dom";
export default function Signin() {
  return (
    <div id="wd-signin-screen">
      <h3>Sign in</h3>
      <input defaultValue="alice" placeholder="username" className="wd-username" /> <br />
      <input defaultValue="123" placeholder="password" type="password" className="wd-password" /> <br />
      <Link  to="/Kambaz/Account/Profile" id="wd-signin-btn"> Sign in </Link> <br />
      <Link  to="/Kambaz/Account/Signup"  id="wd-signup-link">Sign up</Link>
    </div>
);}
