
import { Link } from "react-router-dom";
export default function Signup() {
  return (
    <div id="wd-signup-screen">
      <h3>Sign up</h3>
      <input defaultValue="alice" placeholder="username" className="wd-username" /><br/>
      <input defaultValue="123" placeholder="password" type="password" className="wd-password" /><br/>
      <input defaultValue="123" placeholder="verify password"
             type="password" className="wd-password-verify" /><br/>
      <Link  to="/Kambaz/Account/Profile" > Sign up </Link><br />
      <Link  to="/Kambaz/Account/Signin" >Sign in</Link>
    </div>
);}
