import { useMemo, useState } from "react";

const sampleAlumni = [
  { id: 1, name: "Rahul", company: "Google", year: 2020, dept: "CSE" },
  { id: 2, name: "Kiran", company: "Microsoft", year: 2021, dept: "ECE" },
  { id: 3, name: "Vamsi", company: "Amazon", year: 2022, dept: "CSE" },
  { id: 4, name: "Anita", company: "Infosys", year: 2023, dept: "ME" },
];

function AlumniDirectory() {
  const [query, setQuery] = useState("");
  const [dept, setDept] = useState("");
  const [batch, setBatch] = useState("");

  const filtered = useMemo(() => {
    return sampleAlumni.filter((a) => {
      if (dept && a.dept !== dept) return false;
      if (batch && String(a.year) !== String(batch)) return false;
      if (
        query &&
        !(`${a.name} ${a.company}`.toLowerCase().includes(query.toLowerCase()))
      )
        return false;
      return true;
    });
  }, [query, dept, batch]);

  return (
    <div className="alumni-page">
      <div className="alumni-controls">
        <input
          className="search-bar"
          placeholder="Search alumni..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select value={dept} onChange={(e) => setDept(e.target.value)}>
          <option value="">All Departments</option>
          <option value="CSE">CSE</option>
          <option value="ECE">ECE</option>
          <option value="ME">ME</option>
        </select>
        <select value={batch} onChange={(e) => setBatch(e.target.value)}>
          <option value="">All Batches</option>
          <option value="2020">2020</option>
          <option value="2021">2021</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
        </select>
      </div>

      <div className="alumni-grid">
        {filtered.map((a) => (
          <div className="alumni-card" key={a.id}>
            <div className="alumni-top">
              <div className="avatar">
                {a.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
              </div>
              <div>
                <h4>{a.name}</h4>
                <div className="muted">
                  {a.company} • Batch {a.year}
                </div>
              </div>
            </div>

            <div className="alumni-actions">
              <button className="btn-primary">Connect</button>
              <button className="btn-outline">View Profile</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AlumniDirectory;