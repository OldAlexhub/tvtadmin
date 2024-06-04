import React, { useState } from "react";
import Logo from "../images/logo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddDrivers = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    phoneNumber: "",
    dob: "",
    cbi: "",
    puc: "",
    dot: "",
    dlNumber: "",
    dlExpiry: "",
    homeAddress: "",
    homeCity: "",
    zipCode: "",
    llcName: "",
    ein: "",
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
        process.env.REACT_APP_ADD_DRIVER,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 201) {
        setMessage("Driver Added Successfully");
        setStatus("success");

        setTimeout(() => {
          navigate("/addvehicles");
        }, 2000);
      }
    } catch (error) {
      const errorMessage =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : "Failed to add a new driver!";
      setMessage(errorMessage);
      setStatus("error");
    }
  };
  return (
    <div className="container py-5">
      <form className="border p-4 shadow rounded" onSubmit={handleSubmit}>
        <h1 style={{ textAlign: "center" }}>Add Drivers</h1>

        <div className="text-center mb-4">
          <img
            src={Logo}
            alt="logo"
            className="mb-4"
            style={{ maxWidth: "150px", width: "100%" }}
          />
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
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
          <div className="col-md-6">
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
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
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
          <div className="col-md-6">
            <label htmlFor="dob" className="form-label">
              Date of Birth
            </label>
            <input
              type="date"
              className="form-control"
              id="dob"
              name="dob"
              required
              value={formData.dob}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="cbi" className="form-label">
              CBI Expiration Date
            </label>
            <input
              type="date"
              className="form-control"
              id="cbi"
              name="cbi"
              required
              value={formData.cbi}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="puc" className="form-label">
              PUC Fingerprint Expiration Date
            </label>
            <input
              type="date"
              className="form-control"
              id="puc"
              name="puc"
              value={formData.puc}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="dot" className="form-label">
              DOT Expiration Date
            </label>
            <input
              type="date"
              className="form-control"
              id="dot"
              name="dot"
              required
              value={formData.dot}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="dlNumber" className="form-label">
              Driver License Number
            </label>
            <input
              type="text"
              className="form-control"
              id="dlNumber"
              name="dlNumber"
              required
              placeholder="Driver's License Number"
              value={formData.dlNumber}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="dlExpiry" className="form-label">
              Driver's License Expiration Date
            </label>
            <input
              type="date"
              className="form-control"
              id="dlExpiry"
              name="dlExpiry"
              value={formData.dlExpiry}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-12">
            <label htmlFor="homeAddress" className="form-label">
              Home Address
            </label>
            <input
              type="text"
              className="form-control"
              id="homeAddress"
              name="homeAddress"
              required
              placeholder="Home Address"
              value={formData.homeAddress}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="homeCity" className="form-label">
              City
            </label>
            <input
              type="text"
              className="form-control"
              id="homeCity"
              name="homeCity"
              required
              placeholder="City"
              value={formData.homeCity}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="zipCode" className="form-label">
              Zipcode
            </label>
            <input
              type="text"
              className="form-control"
              id="zipCode"
              name="zipCode"
              required
              placeholder="Zipcode"
              value={formData.zipCode}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="llcName" className="form-label">
              LLC Name
            </label>
            <input
              type="text"
              className="form-control"
              id="llcName"
              name="llcName"
              required
              placeholder="Enter Registered LLC Name"
              value={formData.llcName}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="ein" className="form-label">
              LLC EIN Number
            </label>
            <input
              type="text"
              className="form-control"
              id="ein"
              name="ein"
              required
              placeholder="EIN Number"
              value={formData.ein}
              onChange={handleChange}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Add Driver
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

export default AddDrivers;
