import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { CSVLink } from "react-csv";

const Driver = () => {
  const [driverData, setDriverData] = useState(null);
  const { driverId } = useParams();
  const [driverhos, setDriverHos] = useState([]);

  useEffect(() => {
    const fetchDriver = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${process.env.REACT_APP_ONE_DRIVER}/${driverId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          setDriverData(response.data.show);
        } else {
          console.error("Failed to fetch driver data");
        }
      } catch (error) {
        console.error("Error fetching driver data:", error);
      }
    };
    fetchDriver();
  }, [driverId]);

  useEffect(() => {
    const fetchHOS = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${process.env.REACT_APP_DRIVER_HOS}/${driverId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          setDriverHos(response.data.show);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchHOS();
  }, [driverId]);

  if (!driverData || !driverhos) {
    return <div>Loading...</div>;
  }

  const csvHeaders = [
    { label: "Clock In Time", key: "timeIn" },
    { label: "Clock In Date", key: "dateIn" },
    { label: "Clock Out Time", key: "timeOut" },
    { label: "Clock Out Date", key: "dateOut" },
  ];

  return (
    <div className="container py-5">
      <div className="card shadow mb-4">
        <div className="card-header bg-primary text-white">
          <h2>
            {driverData.fname} {driverData.lname}
          </h2>
        </div>
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-6">
              <p>
                <strong>Driver ID:</strong> {driverData.driverId}
              </p>
              <p>
                <strong>Phone Number:</strong> {driverData.phoneNumber}
              </p>
              <p>
                <strong>Date of Birth:</strong>{" "}
                {new Date(driverData.dob).toLocaleDateString()}
              </p>
              <p>
                <strong>Home Address:</strong> {driverData.homeAddress}
              </p>
            </div>
            <div className="col-md-6">
              <p>
                <strong>Home City:</strong> {driverData.homeCity}
              </p>
              <p>
                <strong>Zipcode:</strong> {driverData.zipCode}
              </p>
              <p>
                <strong>LLC Name:</strong> {driverData.llcName}
              </p>
              <p>
                <strong>EIN Number:</strong> {driverData.ein}
              </p>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <p>
                <strong>CBI Expiration Date:</strong>{" "}
                {new Date(driverData.cbi).toLocaleDateString()}
              </p>
              <p>
                <strong>PUC Fingerprint Expiration Date:</strong>{" "}
                {new Date(driverData.puc).toLocaleDateString()}
              </p>
            </div>
            <div className="col-md-6">
              <p>
                <strong>DOT Expiration Date:</strong>{" "}
                {new Date(driverData.dot).toLocaleDateString()}
              </p>
              <p>
                <strong>Driver's License Number:</strong> {driverData.dlNumber}
              </p>
              <p>
                <strong>Driver's License Expiration Date:</strong>{" "}
                {new Date(driverData.dlExpiry).toLocaleDateString()}
              </p>
            </div>
            <div className="col-12">
              <Link to={`/updatedriver/${driverId}`}>
                <button className="btn btn-primary w-100 mt-3">
                  Update Info
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h2>Driver Hours of Service</h2>
        </div>
        <div className="card-body">
          <CSVLink
            headers={csvHeaders}
            data={driverhos}
            filename={`driver_hos_${driverId}.csv`}
            className="btn btn-success mb-3"
          >
            Download CSV
          </CSVLink>
          <div className="table-responsive">
            <table
              className="table table-striped table-bordered"
              style={{ textAlign: "center" }}
            >
              <thead className="table-dark">
                <tr>
                  <th>Clock In Time</th>
                  <th>Clock In Date</th>
                  <th>Clock Out Time</th>
                  <th>Clock Out Date</th>
                </tr>
              </thead>
              <tbody>
                {driverhos.map((hos) => (
                  <tr key={hos._id}>
                    <td>{hos.timeIn}</td>
                    <td>{hos.dateIn}</td>
                    <td>{hos.timeOut}</td>
                    <td>{hos.dateOut}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Driver;
