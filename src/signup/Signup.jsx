import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./auth.css";

export default function Signup({ onSignup }) {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "user" });
  const navigate = useNavigate();
  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) { alert("Please fill in all fields."); return; }
    console.log("Signup:", form);
    onSignup(form);
    navigate(form.role === "admin" ? "/dashboard/admin" : "/dashboard/user");
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

        <h1 className="page-title">Create account</h1>
        <p className="page-sub">Join Haven and start managing with care</p>

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label>Full Name</label>
            <input type="text" placeholder="Jane Doe" value={form.name} onChange={set("name")} />
          </div>
          <div className="field">
            <label>Email Address</label>
            <input type="email" placeholder="you@example.com" value={form.email} onChange={set("email")} />
          </div>
          <div className="field">
            <label>Password</label>
            <input type="password" placeholder="Min. 8 characters" value={form.password} onChange={set("password")} />
          </div>
          <div className="field">
            <label>Register as</label>
            <div className="role-row">
              {["user", "admin"].map((r) => (
                <button type="button" key={r}
                  className={`role-pill ${form.role === r ? "active" : ""}`}
                  onClick={() => setForm((f) => ({ ...f, role: r }))}>
                  {r === "user" ? "👤 User" : "🛡️ Admin"}
                </button>
              ))}
            </div>
          </div>
          <button type="submit" className="btn-primary">Create Account →</button>
        </form>

        <div className="divider">
          <div className="divider-line" />
          <span className="divider-text">already have one?</span>
          <div className="divider-line" />
        </div>
        <p className="switch-text">
          Already have an account? <Link className="switch-link" to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}

