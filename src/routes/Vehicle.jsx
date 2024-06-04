import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Vehicle = () => {
  const [vehicle, setVehicle] = useState(null);
  const { cabNumber } = useParams();

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${process.env.REACT_APP_ONE_VEHICLE}/${cabNumber}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          setVehicle(response.data.show);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchVehicle();
  }, [cabNumber]);

  if (!vehicle) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container py-5">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h3>Vehicle Details</h3>
        </div>
        <div className="card-body">
          <h4>Cab Number: {vehicle.cabNumber}</h4>
          <p>
            <strong>Make: </strong>
            {vehicle.make}
          </p>
          <p>
            <strong>Model: </strong>
            {vehicle.model}
          </p>
          <p>
            <strong>Year: </strong>
            {vehicle.year}
          </p>
          <p>
            <strong>Color: </strong>
            {vehicle.color}
          </p>
          <p>
            <strong>License Plate Expiration Date: </strong>
            {new Date(vehicle.lpexpiry).toLocaleDateString()}
          </p>
          <p>
            <strong>License Plate Numbers: </strong>
            {vehicle.lpNumbers}
          </p>
          <p>
            <strong>VIN Numbers: </strong>
            {vehicle.vin}
          </p>
          <p>
            <strong>Registration Expiration Date: </strong>
            {new Date(vehicle.regExpiry).toLocaleDateString()}
          </p>
          <Link to={`/updatevehicle/${cabNumber}`}>
            <button className="btn btn-primary w-100 mt-3">Update Info</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Vehicle;
