import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const UpdateVehicle = () => {
  const navigate = useNavigate();
  const { cabNumber } = useParams();

  const [formData, setFormData] = useState({
    lpexpiry: "",
    lpNumbers: "",
  });
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const handleChange = async (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${process.env.REACT_APP_UPDATE_VEHCILE}/${cabNumber}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setMessage("Vehicle info updated successfully!");
        setStatus("success");

        setTimeout(() => {
          navigate("/allvehicles");
        }, 1000);
      }
    } catch (error) {
      console.log(error);
      setMessage("An error occurred while updating vehicle info.");
      setStatus("error");
    }
  };

  return (
    <div className="container py-5">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h3>Edit Vehicle Info</h3>
        </div>
        <div className="card-body">
          <form onSubmit={handleUpdate}>
            <div className="mb-3">
              <label className="form-label">
                License Plate Expiration Date
              </label>
              <input
                type="date"
                className="form-control"
                name="lpexpiry"
                value={formData.lpexpiry}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Registration Expiration Date</label>
              <input
                type="date"
                className="form-control"
                name="regExpiry"
                value={formData.regExpiry}
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

export default UpdateVehicle;
