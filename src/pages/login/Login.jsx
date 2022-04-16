import axios from "axios";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../contex/auth-contex";
import "./login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const context = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    context.func.start();
    try {
      const result = await axios.post("auth/login", { email, password });
      if (!result.data.isAdmin) {
        return context.func.success(null);
      }
      localStorage.setItem("user", JSON.stringify(result.data));
      context.func.success(result.data);
    } catch (err) {
      context.func.failure();
      console.log(err);
    }
  };

  return (
    <div className="login">
      <form className="loginForm">
        <input
          type="text"
          placeholder="email"
          className="loginInput"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          className="loginInput"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="loginButton"
          onClick={handleLogin}
          disabled={context.state.isFetching}
        >
          Login
        </button>
      </form>
    </div>
  );
}
