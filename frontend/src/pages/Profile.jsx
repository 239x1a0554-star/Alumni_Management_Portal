function Profile() {
  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="profile-avatar">SR</div>
        <div className="profile-main">
          <h2>Somu Roy</h2>
          <p className="muted">Alumni • CSE • Batch of 2027</p>
          <div style={{ marginTop: 12 }}>
            <button className="btn-primary">Edit Profile</button>
          </div>
        </div>
      </div>

      <div className="profile-grid">
        <div className="card">
          <h3>Personal Information</h3>
          <div className="profile-info-list">
            <div><strong>Name:</strong> Somu Roy</div>
            <div><strong>Email:</strong> somu@gmail.com</div>
            <div><strong>Phone:</strong> 7897544321324</div>
            <div><strong>Location:</strong> India</div>
          </div>
        </div>

        <div className="card">
          <h3>Academic Information</h3>
          <div className="profile-info-list">
            <div><strong>Roll No:</strong> CSE2027-01</div>
            <div><strong>Department:</strong> CSE</div>
            <div><strong>Graduation Year:</strong> 2027</div>
          </div>
        </div>

        <div className="card">
          <h3>Professional</h3>
          <div className="profile-info-list">
            <div><strong>Company:</strong> Student</div>
            <div><strong>Title:</strong> Intern</div>
            <div><strong>LinkedIn:</strong> <a href="#">linkedin.com/in/somu</a></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;