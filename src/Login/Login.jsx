import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./auth.css";

export default function Login({ onLogin }) {
  const [form, setForm] = useState({ email: "", password: "", role: "user" });
  const navigate = useNavigate();
  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();
      console.log("Login response:", data);

      if (data.success) {
        alert("Login successful!");

        onLogin(form);

        navigate(form.role === "admin"
          ? "/dashboard/admin"
          : "/dashboard/user"
        );
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error(error);
      alert("Server error. Try again later.");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="brand">
          <div className="brand-icon">🏠</div>
          <div>
            <div className="brand-name">Haven</div>
            <div className="brand-sub">Orphanage Management</div>
          </div>
        </div>

        <h1 className="page-title">Welcome back</h1>
        <p className="page-sub">Sign in to your account to continue</p>

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label>Email Address</label>
            <input type="email" placeholder="you@example.com" value={form.email} onChange={set("email")} />
          </div>

          <div className="field">
            <label>Password</label>
            <input type="password" placeholder="••••••••" value={form.password} onChange={set("password")} />
          </div>

          <div className="field">
            <label>Sign in as</label>
            <div className="role-row">
              {["user", "admin"].map((r) => (
                <button
                  type="button"
                  key={r}
                  className={`role-pill ${form.role === r ? "active" : ""}`}
                  onClick={() => setForm((f) => ({ ...f, role: r }))}
                >
                  {r === "user" ? "👤 User" : "🛡️ Admin"}
                </button>
              ))}
            </div>
          </div>

          <button type="submit" className="btn-primary">Sign In →</button>
        </form>

        <div className="divider">
          <div className="divider-line" />
          <span className="divider-text">new here?</span>
          <div className="divider-line" />
        </div>

        <p className="switch-text">
          Don't have an account? <Link className="switch-link" to="/signup">Create one</Link>
        </p>
      </div>
    </div>
  );
}