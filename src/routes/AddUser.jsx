import React, { useState } from "react";
import Logo from "../images/logo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    phoneNumber: "",
    role: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleChange = async (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        process.env.REACT_APP_ADD_USERS,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        setMessage("User Added Successfully");
        setStatus("success");

        setTimeout(() => {
          navigate("/employeelist");
        }, 1000);
      }
    } catch (error) {
      console.log(error);

      setMessage("Failed to add a new user!");
      setStatus("error");
    }
  };
  return (
    <div className="container d-flex align-items-center justify-content-center my-5">
      <form
        className="border p-4 shadow rounded"
        style={{ maxWidth: "400px", width: "100%", margin: "1rem" }}
        onSubmit={handleSubmit}
      >
        <div className="text-center mb-4">
          <img
            src={Logo}
            alt="logo"
            className="mb-4"
            style={{ maxWidth: "150px", width: "100%" }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="fname" className="form-label">
            First Name
          </label>
          <input
            type="text"
            className="form-control"
            id="fname"
            name="fname"
            required
            placeholder="First Name"
            value={formData.fname}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lname" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            className="form-control"
            id="lname"
            name="lname"
            required
            placeholder="Last Name"
            value={formData.lname}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phoneNumber" className="form-label">
            Phone Number
          </label>
          <input
            type="tel"
            className="form-control"
            id="phoneNumber"
            name="phoneNumber"
            required
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="role" className="form-label">
            Role
          </label>
          <select
            name="role"
            id="role"
            className="form-select"
            onChange={handleChange}
            value={formData.role}
          >
            <option>Select One</option>
            <option value="admin">Admin</option>
            <option value="dispatcher">Dispatcher</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email Address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            required
            placeholder="Email Address"
            value={formData.email}
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
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            name="confirmPassword"
            required
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Add User
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
      </form>
    </div>
  );
};

export default AddUser;
