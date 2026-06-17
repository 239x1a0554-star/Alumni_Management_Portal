import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    rollNo: "",
    department: "",
    graduationYear: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await api.post("/auth/register", {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        rollNo: formData.rollNo,
        department: formData.department,
        graduationYear: formData.graduationYear,
        password: formData.password,
      });

      alert("Registration Successful");

      navigate("/dashboard");
    } catch (err) {
      alert(
        err.response?.data?.message ||
        err.message ||
        "Registration Failed"
      );
    }
  };

  return (
    <div className="auth-split">
      <div className="auth-left">
        <div className="brand">
          <h1>Reconnect.</h1>
          <h1>Network.</h1>
          <h1>Grow.</h1>

          <p>
            Join thousands of alumni, mentors,
            recruiters and professionals from
            your college community.
          </p>

          <div className="auth-stats">
            <div className="auth-stat">
              <h2>15K+</h2>
              <span>Alumni</span>
            </div>

            <div className="auth-stat">
              <h2>2K+</h2>
              <span>Jobs</span>
            </div>

            <div className="auth-stat">
              <h2>500+</h2>
              <span>Mentors</span>
            </div>
          </div>
        </div>
      </div>

      <div className="auth-right">
        <div className="card auth-card fade-in">
          <h2>Create Account</h2>

          <p className="muted">
            Join the Alumni Portal
          </p>

          <form onSubmit={handleSubmit}>
            <label className="label">
              Full Name
            </label>

            <input
              type="text"
              name="fullName"
              placeholder="John Doe"
              onChange={handleChange}
              required
            />

            <label className="label">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              placeholder="john@gmail.com"
              onChange={handleChange}
              required
            />

            <label className="label">
              Phone Number
            </label>

            <input
              type="text"
              name="phone"
              placeholder="+91 XXXXX XXXXX"
              onChange={handleChange}
            />

            <label className="label">
              Roll Number
            </label>

            <input
              type="text"
              name="rollNo"
              placeholder="239X1A0554"
              onChange={handleChange}
            />

            <label className="label">
              Department
            </label>

            <input
              type="text"
              name="department"
              placeholder="Computer Science"
              onChange={handleChange}
            />

            <label className="label">
              Graduation Year
            </label>

            <input
              type="number"
              name="graduationYear"
              placeholder="2027"
              onChange={handleChange}
            />

            <label className="label">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              onChange={handleChange}
              required
            />

            <label className="label">
              Confirm Password
            </label>

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={handleChange}
              required
            />

            <button
              type="submit"
              className="btn-primary"
            >
              Create Account
            </button>
          </form>

          <p
            style={{
              textAlign: "center",
              marginTop: "16px",
            }}
          >
            Already have an account?{" "}
            <Link to="/">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;