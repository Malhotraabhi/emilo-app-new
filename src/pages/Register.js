import { useState } from "react";
import apiFetch from "../api/Api";
import "../Register.css"; 

export default function Register({ switchToLogin }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setType("");

    try {
      const data = await apiFetch("/auth/register", {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (data.success || data.token) {
        if (data.token && data.user?._id) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("userId", data.user._id);
        }

        setType("success");
        setMessage("Registered successfully! Redirecting to login...");
        setTimeout(() => switchToLogin(), 1500);
      } else {
        setType("error");
        setMessage(data?.message || "Registration failed");
      }
    } catch {
      setType("error");
      setMessage("Registration failed. Please try again.");
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <input
        className="auth-input"
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />
      <input
        className="auth-input"
        placeholder="Email"
        type="email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
      />
      <input
        className="auth-input"
        placeholder="Password"
        type="password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        required
      />
      <button className="auth-button" type="submit">Register</button>

      {message && (
        <p className={`auth-message ${type}`}>
          {message}
        </p>
      )}
    </form>
  );
}
