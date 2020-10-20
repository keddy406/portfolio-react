import React from "react";
import { auth } from "./firebase";
import { useHistory } from "react-router-dom";
function Login() {
  const history = useHistory();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const submit = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => history.push("/projects"))
      .catch((error) => alert(error.message));
  };
  return (
    <div className="login">
      <form className>
        <div className="login__form">
          <h1>輸入Admin帳號密碼</h1>
          <input
            className="login__options"
            placeholder="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="login__options"
            placeholder="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="login__button"
            disabled={!email || !password}
            onClick={submit}
          >
            登入
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
