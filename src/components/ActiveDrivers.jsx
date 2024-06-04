import React, { useEffect, useState } from "react";
import axios from "axios";

const ActiveDrivers = () => {
  const [actives, setActives] = useState([]);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchActives = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(process.env.REACT_APP_SHOW_ACTIVE, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          setActives(response.data.show);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchActives();

    const intervalId = setInterval(fetchActives, 3000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const handleUnassign = async (e, driverId) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await axios.delete(
        `${process.env.REACT_APP_UNASSIGN_ACTIVE}/${driverId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setMessage("Driver unassigned successfully!");
        setStatus("success");
        setActives(actives.filter((active) => active.driverId !== driverId));
      } else {
        setMessage("Failed to unassign driver.");
        setStatus("error");
      }
    } catch (error) {
      console.log(error);
      setMessage("An error occurred while unassigning the driver.");
      setStatus("error");
    }
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4" style={{ textAlign: "center" }}>
        Active Drivers
      </h2>
      <table
        className="table table-bordered table-hover"
        style={{ textAlign: "center" }}
      >
        <thead className="thead-dark">
          <tr>
            <th scope="col">Driver ID</th>
            <th scope="col">Cab Number</th>
            <th scope="col">Unassign</th>
          </tr>
        </thead>
        <tbody>
          {actives.map((active) => (
            <tr key={active._id}>
              <td>{active.driverId}</td>
              <td>{active.cabNumber}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={(e) => handleUnassign(e, active.driverId)}
                >
                  Unassign
                </button>
              </td>
            </tr>
          ))}
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
    </div>
  );
};

export default ActiveDrivers;
