import React, { useState } from "react";
import Logo from "../images/logo.png";
import "../styles/Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    employeeId: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleChange = async (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(process.env.REACT_APP_LOGIN, user);

      if (response.status === 200) {
        const { employee, role, name, token } = response.data;

        localStorage.setItem("employeeId", employee);
        localStorage.setItem("role", role);
        localStorage.setItem("name", name);
        localStorage.setItem("token", token);

        setMessage("Login successful!");
        setStatus("success");

        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (error) {
      setMessage("Login failed. Please check your credentials and try again.");
      setStatus("error");
    }
  };

  return (
    <div className="login-container d-flex align-items-center justify-content-center">
      <form
        className="login-form border p-4 shadow rounded"
        onSubmit={handleSubmit}
      >
        <div className="text-center mb-4">
          <img src={Logo} alt="logo" className="mb-4" />
        </div>
        <div className="mb-3">
          <label htmlFor="employeeId" className="form-label">
            Employee ID
          </label>
          <input
            type="text"
            className="form-control"
            id="employeeId"
            name="employeeId"
            required
            placeholder="Enter Employee ID"
            value={user.employeeId}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            required
            placeholder="Enter Email"
            value={user.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            required
            placeholder="Enter Password"
            value={user.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
        {message && (
          <div
            className={`alert mt-3 ${
              status === "success" ? "alert-success" : "alert-danger"
            }`}
            role="alert"
          >
            {message}
          </div>
        )}
        <p className="mt-3 text-center">
          Forgot Password!?{" "}
          <span className="text-info">Please contact your admin</span>
        </p>
      </form>
    </div>
  );
};

export default Login;
