import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AllVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(process.env.REACT_APP_ALL_VEHICLES, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setVehicles(response.data.show);
        } else {
          setError("Failed to fetch vehicles");
        }
      } catch (error) {
        setError("An error occurred while fetching vehicles");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchVehicles();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="container py-5">
      <h1 className="mb-4 text-center">All Vehicles</h1>
      <table
        className="table table-striped table-hover"
        style={{ textAlign: "center" }}
      >
        <thead className="thead-dark">
          <tr>
            <th>Cab Number</th>
            <th>Make</th>
            <th>Model</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle) => (
            <tr key={vehicle._id}>
              <td>
                <Link to={`/onevehicle/${vehicle.cabNumber}`}>
                  {vehicle.cabNumber}
                </Link>
              </td>
              <td>{vehicle.make}</td>
              <td>{vehicle.model}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllVehicles;
