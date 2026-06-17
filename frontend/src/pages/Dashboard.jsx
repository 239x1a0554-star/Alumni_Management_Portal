import { Link } from "react-router-dom";
import { useMemo, useState } from "react";

const sampleUsers = [
  { id: 1, fullName: "Somu Kumar", email: "somu@example.com", rollNo: "CSE2027-01", department: "CSE", graduationYear: 2022 },
  { id: 2, fullName: "Rita Sharma", email: "rita@example.com", rollNo: "ECE2026-11", department: "ECE", graduationYear: 2021 },
  { id: 3, fullName: "Amit Patel", email: "amit@example.com", rollNo: "ME2025-04", department: "ME", graduationYear: 2020 },
  { id: 4, fullName: "Nisha Roy", email: "nisha@example.com", rollNo: "CSE2027-08", department: "CSE", graduationYear: 2023 },
];

function StatCard({ title, value, subtitle }) {
  return (
    <div className="stat-card">
      <div>
        <div className="stat-value">{value}</div>
        <div className="stat-title">{title}</div>
      </div>
      <div className="stat-sub">{subtitle}</div>
    </div>
  );
}

function Dashboard() {
  const [query, setQuery] = useState("");
  const users = sampleUsers; // replace with API call when available

  const filtered = useMemo(() => {
    if (!query) return users;
    return users.filter((u) =>
      `${u.fullName} ${u.email} ${u.rollNo} ${u.department}`.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, users]);

  return (
    <div className="dashboard-page">
      <div className="welcome-banner">
        <div>
          <h2>Welcome back</h2>
          <p>Manage alumni, view reports and connect with your network.</p>
        </div>
        <div>
          <Link to="/register" className="btn-primary">Add Alumni</Link>
        </div>
      </div>

      <section className="top-stats">
        <StatCard title="Total Alumni" value={users.length} subtitle="All registered users" />
        <StatCard title="New this month" value={3} subtitle="Recent signups" />
        <StatCard title="Active" value={users.length - 1} subtitle="Active this week" />
        <StatCard title="Pending" value={1} subtitle="Pending approvals" />
      </section>

      <div className="dashboard-grid-2">
        <div className="card chart-card">
          <h3>Engagement</h3>
          <div className="chart-placeholder">(Chart placeholder)</div>
        </div>

        <div className="card recent-card">
          <div className="recent-header">
            <h3>Recent Alumni</h3>
            <input className="search-bar" placeholder="Search..." value={query} onChange={(e)=>setQuery(e.target.value)} />
          </div>

          <ul className="recent-list">
            {filtered.map(u => (
              <li key={u.id} className="recent-item">
                <div className="recent-left">
                  <div className="avatar">{u.fullName.split(' ').map(n=>n[0]).slice(0,2).join('')}</div>
                  <div>
                    <div className="user-name">{u.fullName}</div>
                    <div className="user-email">{u.email}</div>
                  </div>
                </div>
                <div className="recent-right">
                  <Link to={`/profile?id=${u.id}`} className="link">View</Link>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="card events-card">
          <h3>Upcoming Events</h3>
          <div className="event">Alumni Meet — 25th July</div>
          <div className="event">Career Webinar — 2nd Aug</div>
          <div className="event">Fundraiser — 15th Sep</div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;