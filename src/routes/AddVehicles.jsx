import React, { useState } from "react";
import Logo from "../images/logo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddVehicles = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    cabNumber: "",
    make: "",
    model: "",
    year: "",
    color: "",
    lpexpiry: "",
    lpNumbers: "",
    vin: "",
    regExpiry: "",
    lpnumbers: "",
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
        process.env.REACT_APP_ADD_VEHICLE,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 201) {
        setMessage("Vehicle Added Successfully");
        setStatus("success");

        setTimeout(() => {
          navigate("/activate");
        }, 1000);
      }
    } catch (error) {
      console.log(error);
      const errorMessage =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : "Failed to add a new vehicle!";
      setMessage(errorMessage);
      setStatus("error");
    }
  };
  return (
    <div className="container py-5">
      <form className="border p-4 shadow rounded" onSubmit={handleSubmit}>
        <h1 style={{ textAlign: "center" }}>Add Vehicles</h1>
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
            <label htmlFor="cabNumber" className="form-label">
              Cab Number
            </label>
            <input
              type="text"
              className="form-control"
              id="cabNumber"
              name="cabNumber"
              required
              placeholder="Cab Number"
              value={formData.cabNumber}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="make" className="form-label">
              Make
            </label>
            <input
              type="text"
              className="form-control"
              id="make"
              name="make"
              required
              placeholder="Make"
              value={formData.make}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="model" className="form-label">
              Model
            </label>
            <input
              type="text"
              className="form-control"
              id="model"
              name="model"
              required
              placeholder="Model"
              value={formData.model}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="year" className="form-label">
              Year
            </label>
            <input
              type="number"
              className="form-control"
              id="year"
              name="year"
              placeholder="Year"
              required
              value={formData.year}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="color" className="form-label">
              Color
            </label>
            <input
              type="text"
              className="form-control"
              id="color"
              name="color"
              required
              placeholder="Color"
              value={formData.color}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="lpexpiry" className="form-label">
              License Plate Expiration Date
            </label>
            <input
              type="date"
              className="form-control"
              id="lpexpiry"
              name="lpexpiry"
              required
              value={formData.lpexpiry}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="lpNumbers" className="form-label">
              License Plate Numbers
            </label>
            <input
              type="text"
              className="form-control"
              id="lpNumbers"
              name="lpNumbers"
              required
              placeholder="License Plate Numbers"
              value={formData.lpNumbers}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="vin" className="form-label">
              VIN Number
            </label>
            <input
              type="text"
              className="form-control"
              id="vin"
              name="vin"
              required
              placeholder="VIN Numbers"
              value={formData.vin}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="regExpiry" className="form-label">
              Registration Expiration Date
            </label>
            <input
              type="date"
              className="form-control"
              id="regExpiry"
              name="regExpiry"
              required
              value={formData.regExpiry}
              onChange={handleChange}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Add Vehicle
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

export default AddVehicles;
