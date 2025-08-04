import { useState } from "react";
import apiFetch from "../api/Api";
import { useNavigate } from "react-router-dom";
import "../Login.css"; 

export default function Login({ setToken }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setType("");

    try {
      const data = await apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.user.id);
        setToken?.(data.token);
        navigate("/feed");
      } else {
        setType("error");
        setMessage(data?.message || "Login failed");
      }
    } catch {
      setType("error");
      setMessage("Login failed. Please try again.");
    }
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">Welcome Back 👋</h2>

        <input
          className="login-input"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <input
          className="login-input"
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        <button className="login-button" type="submit">Login</button>

        {message && (
          <p className={`login-message ${type === "error" ? "error" : "success"}`}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
