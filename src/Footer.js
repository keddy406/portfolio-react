import React from "react";

import db, { auth } from "./firebase";
import { Link } from "react-router-dom";
import { selectUser } from "./redux/userSlice";
import { useSelector } from "react-redux";

function Footer() {
  const user = useSelector(selectUser);

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  // console.log(user);
  return (
    <div className="footer">
      <p>Copyright @ chunyuan All Rights Reserved</p>

      <Link className="footer__admin" to="/login">
        Admin
      </Link>
      {user && (
        <p className="footer__logout" onClick={() => auth.signOut()}>
          登出
        </p>
      )}
    </div>
  );
}

export default Footer;
