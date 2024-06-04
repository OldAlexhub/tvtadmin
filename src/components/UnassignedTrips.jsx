import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const UnassignedTrips = () => {
  const [tripData, setTripData] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const tresponse = await axios.get(
          process.env.REACT_APP_GET_WEB_BOOKINGS,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const dresponse = await axios.get(process.env.REACT_APP_SHOW_ACTIVE, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (tresponse.status === 200 && dresponse.status === 200) {
          setTripData(tresponse.data.show);
          setDrivers(dresponse.data.show);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();

    const intervalId = setInterval(fetchData, 1000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const handleAssign = (tripId, driverId) => {
    setSelectedDriver((prev) => ({
      ...prev,
      [tripId]: driverId,
    }));
  };

  const handleSubmit = async (tripId) => {
    const trip = tripData.find((trip) => trip._id === tripId);
    const driverId = selectedDriver[tripId];

    if (!driverId) {
      alert("Please select a driver");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        process.env.REACT_APP_ADD_BOOKING,
        {
          name: trip.name,
          phoneNumber: trip.phoneNumber,
          pickupAddress: trip.pickupAddress,
          dropoffAddress: trip.dropoffAddress,
          pickupDate: trip.pickupDate,
          pickupTime: trip.pickupTime,
          passengers: trip.passengers,
          driver: driverId,
          distance: trip.distance,
          fare: trip.fare,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        alert("Driver assigned successfully");
        await axios.delete(
          `${process.env.REACT_APP_DELETE_WEB_BOOKINGS}/${trip.bookingId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTripData((prevData) =>
          prevData.filter((trip) => trip._id !== tripId)
        );
      } else {
        alert("Failed to assign driver");
      }
    } catch (error) {
      console.log(error);
      alert("Server error");
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="mb-4" style={{ textAlign: "center" }}>
        Unassigned Trips
      </h3>
      <table className="table table-striped" style={{ textAlign: "center" }}>
        <thead>
          <tr>
            <th>Trip Date</th>
            <th>Booking ID</th>
            <th>Customer Name</th>
            <th>Pickup Address</th>
            <th>Dropoff Address</th>
            <th>Pickup Time</th>
            <th>Phone Number</th>
            <th>Passengers</th>
            <th>Distance (miles)</th>
            <th>Fare ($)</th>
            <th>Driver</th>
            <th>Assign</th>
          </tr>
        </thead>
        <tbody>
          {tripData.map((trip) => (
            <tr key={trip._id}>
              <td>{new Date(trip.pickupDate).toLocaleDateString()}</td>
              <td>{trip.bookingId}</td>
              <td>{trip.name}</td>
              <td>{trip.pickupAddress}</td>
              <td>{trip.dropoffAddress}</td>
              <td>{trip.pickupTime}</td>
              <td>{trip.phoneNumber}</td>
              <td>{trip.passengers}</td>
              <td>{trip.distance}</td>
              <td>{trip.fare}</td>
              <td>
                <select
                  className="form-select"
                  onChange={(e) => handleAssign(trip._id, e.target.value)}
                  value={selectedDriver[trip._id] || ""}
                >
                  <option value="" disabled>
                    Select One
                  </option>
                  {drivers.map((driver) => (
                    <option key={driver._id} value={driver.cabNumber}>
                      {driver.cabNumber}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => handleSubmit(trip._id)}
                >
                  Assign
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UnassignedTrips;
