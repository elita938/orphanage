import { useNavigate } from "react-router-dom";
import "./dashboard.css";

const orphanageDetails = [
  { icon: "🏡", label: "Orphanage Name", value: "Haven Home for Children" },
  { icon: "📍", label: "Location", value: "Bengaluru, Karnataka" },
  { icon: "👧", label: "Children Housed", value: "48 children" },
  { icon: "🧑‍🤝‍🧑", label: "Staff Members", value: "12 caretakers" },
  { icon: "📅", label: "Established", value: "March 2004" },
  { icon: "📞", label: "Contact", value: "+91 98765 43210" },
];

const updates = [
  { tag: "Event", text: "Annual Sports Day on 20th April — all sponsors welcome." },
  { tag: "Need", text: "Seeking donations of school stationery for the new term." },
  { tag: "News", text: "3 children successfully placed with adoptive families this month." },
];

export default function UserDashboard({ user, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  return (
    <div className="dash-wrapper user-theme">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-brand">
          <span className="sidebar-icon">🏠</span>
          <div>
            <div className="sidebar-name">Haven</div>
            <div className="sidebar-role">User Portal</div>
          </div>
        </div>

        <nav className="sidebar-nav">
          <a className="nav-item active" href="#">
            <span>🏛️</span> Orphanage Details
          </a>
          <a className="nav-item" href="#">
            <span>📢</span> Updates
          </a>
          <a className="nav-item" href="#">
            <span>❤️</span> Donate
          </a>
          <a className="nav-item" href="#">
            <span>📋</span> My Profile
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
            <p className="dash-greeting">Good day,</p>
            <h1 className="dash-username">{user?.name} 👋</h1>
          </div>
          <div className="dash-badge user-badge">👤 User</div>
        </header>

        {/* Stats strip */}
        <div className="stats-row">
          {[
            { label: "Children", value: "48", icon: "👧" },
            { label: "Staff", value: "12", icon: "🧑‍🤝‍🧑" },
            { label: "Donors", value: "134", icon: "💛" },
            { label: "Years Active", value: "21", icon: "📅" },
          ].map((s) => (
            <div className="stat-card" key={s.label}>
              <span className="stat-icon">{s.icon}</span>
              <span className="stat-value">{s.value}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Orphanage Details */}
        <section className="section-card">
          <div className="section-header">
            <h2 className="section-title">🏡 View Orphanage Details</h2>
            <span className="section-tag">Read-only</span>
          </div>
          <div className="details-grid">
            {orphanageDetails.map((d) => (
              <div className="detail-item" key={d.label}>
                <span className="detail-icon">{d.icon}</span>
                <div>
                  <div className="detail-label">{d.label}</div>
                  <div className="detail-value">{d.value}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Updates */}
        <section className="section-card">
          <div className="section-header">
            <h2 className="section-title">📢 Latest Updates</h2>
          </div>
          <div className="updates-list">
            {updates.map((u, i) => (
              <div className="update-item" key={i}>
                <span className={`update-tag tag-${u.tag.toLowerCase()}`}>{u.tag}</span>
                <p className="update-text">{u.text}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
