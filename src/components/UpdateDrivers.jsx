import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UpdateDrivers = () => {
  const navigate = useNavigate();
  const { driverId } = useParams();
  const [formData, setFormData] = useState({
    dot: "",
    puc: "",
    cbi: "",
    dlExpiry: "",
  });
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    // Create an update object with only the non-empty fields
    const updateFields = {};
    Object.keys(formData).forEach((key) => {
      if (formData[key]) {
        updateFields[key] = formData[key];
      }
    });

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${process.env.REACT_APP_UPDATE_DRIVER}/${driverId}`,
        updateFields,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setMessage("Driver info updated successfully!");
        setStatus("success");
        setTimeout(() => {
          navigate("/alldrivers");
        }, 1000);
      } else {
        setMessage("Failed to update driver info.");
        setStatus("error");
      }
    } catch (error) {
      console.log(error);
      setMessage("An error occurred while updating driver info.");
      setStatus("error");
    }
  };

  return (
    <div className="container py-5">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h3>Update Driver's Info</h3>
        </div>
        <div className="card-body">
          <form onSubmit={handleUpdate}>
            <div className="mb-3">
              <label className="form-label">DOT Expiration Date</label>
              <input
                type="date"
                className="form-control"
                name="dot"
                value={formData.dot}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">
                PUC Fingerprints Expiration Date
              </label>
              <input
                type="date"
                className="form-control"
                name="puc"
                value={formData.puc}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">CBI Expiration Date</label>
              <input
                type="date"
                className="form-control"
                name="cbi"
                value={formData.cbi}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">
                Driver's License Expiration Date
              </label>
              <input
                type="date"
                className="form-control"
                name="dlExpiry"
                value={formData.dlExpiry}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Update
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
      </div>
    </div>
  );
};

export default UpdateDrivers;
