import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AllDrivers = () => {
  const [driversData, setDriversData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(process.env.REACT_APP_ALL_DRIVERS, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setDriversData(response.data.drivers);
        } else {
          setError("Failed to fetch driver data.");
        }
      } catch (error) {
        setError("Failed to fetch driver data.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDrivers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center">Drivers List</h2>
      <table className="table table-striped table-hover text-center">
        <thead className="thead-dark">
          <tr>
            <th>Driver ID</th>
            <th>Name</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {driversData.map((driver) => (
            <tr key={driver._id}>
              <td>
                <Link
                  to={`/onedriver/${driver.driverId}`}
                  className="text-decoration-none"
                >
                  {driver.driverId}
                </Link>
              </td>
              <td>
                {driver.fname} {driver.lname}
              </td>
              <td>{driver.phoneNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllDrivers;
