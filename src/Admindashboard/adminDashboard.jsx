import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";

const children = [
  { id: 1, name: "Arjun Mehta", age: 8, status: "In Care", since: "2021" },
  { id: 2, name: "Priya Nair", age: 11, status: "In Care", since: "2019" },
  { id: 3, name: "Rohan Das", age: 6, status: "Adopted", since: "2022" },
  { id: 4, name: "Sneha Pillai", age: 13, status: "In Care", since: "2018" },
  { id: 5, name: "Kiran Rao", age: 9, status: "In Process", since: "2023" },
];

const donations = [
  { donor: "Ravi Shankar", amount: "₹15,000", date: "Apr 10", type: "Monthly" },
  { donor: "Ananya Trust", amount: "₹50,000", date: "Apr 8", type: "One-time" },
  { donor: "Vikram Iyer", amount: "₹5,000", date: "Apr 5", type: "Monthly" },
  { donor: "CSR — Infosys", amount: "₹2,00,000", date: "Apr 1", type: "Annual" },
];

const statusColor = { "In Care": "tag-event", "Adopted": "tag-news", "In Process": "tag-need" };

export default function AdminDashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState("children");
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  return (
    <div className="dash-wrapper admin-theme">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-brand">
          <span className="sidebar-icon">🏠</span>
          <div>
            <div className="sidebar-name">Haven</div>
            <div className="sidebar-role">Admin Panel</div>
          </div>
        </div>

        <nav className="sidebar-nav">
          <a className={`nav-item ${activeTab === "children" ? "active" : ""}`}
            href="#" onClick={(e) => { e.preventDefault(); setActiveTab("children"); }}>
            <span>👧</span> Manage Children
          </a>
          <a className={`nav-item ${activeTab === "donations" ? "active" : ""}`}
            href="#" onClick={(e) => { e.preventDefault(); setActiveTab("donations"); }}>
            <span>💰</span> Donations
          </a>
          <a className="nav-item" href="#">
            <span>🧑‍🤝‍🧑</span> Staff
          </a>
          <a className="nav-item" href="#">
            <span>📊</span> Reports
          </a>
          <a className="nav-item" href="#">
            <span>⚙️</span> Settings
          </a>
        </nav>

        <button className="logout-btn" onClick={handleLogout}>
          ← Logout
        </button>
      </aside>

      {/* Main */}
      <main className="dash-main">
        {/* Header */}
        <header className="dash-header">
          <div>
            <p className="dash-greeting">Admin Dashboard,</p>
            <h1 className="dash-username">{user?.name} 🛡️</h1>
          </div>
          <div className="dash-badge admin-badge">🛡️ Admin</div>
        </header>

        {/* Stats */}
        <div className="stats-row">
          {[
            { label: "Total Children", value: "48", icon: "👧" },
            { label: "Adopted", value: "6", icon: "🏠" },
            { label: "Donations (Apr)", value: "₹2.7L", icon: "💰" },
            { label: "Pending Cases", value: "3", icon: "📋" },
          ].map((s) => (
            <div className="stat-card" key={s.label}>
              <span className="stat-icon">{s.icon}</span>
              <span className="stat-value">{s.value}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="tab-row">
          <button className={`tab-btn ${activeTab === "children" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("children")}>👧 Manage Children</button>
          <button className={`tab-btn ${activeTab === "donations" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("donations")}>💰 Donations</button>
        </div>

        {/* Children Table */}
        {activeTab === "children" && (
          <section className="section-card">
            <div className="section-header">
              <h2 className="section-title">👧 Children Registry</h2>
              <button className="action-btn">+ Add Child</button>
            </div>
            <div className="table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>#</th><th>Name</th><th>Age</th><th>Status</th><th>Since</th><th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {children.map((c) => (
                    <tr key={c.id}>
                      <td>{c.id}</td>
                      <td><strong>{c.name}</strong></td>
                      <td>{c.age} yrs</td>
                      <td><span className={`update-tag ${statusColor[c.status]}`}>{c.status}</span></td>
                      <td>{c.since}</td>
                      <td><button className="row-btn">View</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Donations Table */}
        {activeTab === "donations" && (
          <section className="section-card">
            <div className="section-header">
              <h2 className="section-title">💰 Recent Donations</h2>
              <button className="action-btn">+ Record Donation</button>
            </div>
            <div className="table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Donor</th><th>Amount</th><th>Date</th><th>Type</th><th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {donations.map((d, i) => (
                    <tr key={i}>
                      <td><strong>{d.donor}</strong></td>
                      <td className="amount-cell">{d.amount}</td>
                      <td>{d.date}</td>
                      <td><span className="update-tag tag-event">{d.type}</span></td>
                      <td><button className="row-btn">Receipt</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
