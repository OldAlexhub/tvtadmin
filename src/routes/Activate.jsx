import React, { useEffect, useState } from "react";
import axios from "axios";
import ActiveDrivers from "../components/ActiveDrivers";

const Activate = () => {
  const [driversData, setDriversData] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [formData, setFormData] = useState({
    driverId: "",
    cabNumber: "",
  });
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const dresponse = await axios.get(process.env.REACT_APP_ALL_DRIVERS, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const vresponse = await axios.get(process.env.REACT_APP_ALL_VEHICLES, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (dresponse.status === 200 && vresponse.status === 200) {
          setDriversData(dresponse.data.drivers || []);
          setVehicles(vresponse.data.show || []);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAssign = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        process.env.REACT_APP_ACTIVATE,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 201) {
        setMessage("Driver assigned successfully!");
        setStatus("success");
      } else {
        setMessage("Failed to assign driver.");
        setStatus("error");
      }
    } catch (error) {
      console.log(error);
      setMessage("An error occurred while assigning the driver.");
      setStatus("error");
    }
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4" style={{ textAlign: "center" }}>
        Assign Driver to Vehicle
      </h2>
      <form onSubmit={handleAssign}>
        <table
          className="table table-bordered table-hover"
          style={{ textAlign: "center" }}
        >
          <thead className="thead-dark">
            <tr>
              <th scope="col">Driver ID</th>
              <th scope="col">Cab#</th>
              <th scope="col">Assign</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <select
                  className="form-select"
                  name="driverId"
                  onChange={handleChange}
                  value={formData.driverId}
                >
                  <option value="">Select Driver</option>
                  {driversData.map((driver) => (
                    <option key={driver._id} value={driver.driverId}>
                      {driver.driverId}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <select
                  className="form-select"
                  name="cabNumber"
                  onChange={handleChange}
                  value={formData.cabNumber}
                >
                  <option value="">Select Vehicle</option>
                  {vehicles.map((vehicle) => (
                    <option key={vehicle._id} value={vehicle.cabNumber}>
                      {vehicle.cabNumber}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <button type="submit" className="btn btn-primary">
                  Assign
                </button>
              </td>
            </tr>
          </tbody>
        </table>
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
      <hr />
      <ActiveDrivers />
    </div>
  );
};

export default Activate;
