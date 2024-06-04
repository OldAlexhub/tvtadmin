import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { CSVLink } from "react-csv";

const CompletedTrips = () => {
  const [trips, setTrips] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredTrips, setFilteredTrips] = useState([]);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(process.env.REACT_APP_GET_COMPLETED, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          setTrips(response.data.trips);
          setFilteredTrips(response.data.trips);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchTrips();

    const intervalId = setInterval(fetchTrips, 6000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const result = trips.filter((trip) =>
      Object.values(trip).some((value) =>
        String(value).toLowerCase().includes(search.toLowerCase())
      )
    );
    setFilteredTrips(result);
  }, [search, trips]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="container mt-4">
      <div className="text-center mb-4">
        <h3>Completed Trips</h3>
        <input
          type="text"
          className="form-control d-inline-block w-50 mt-3"
          placeholder="Search trips..."
          value={search}
          onChange={handleSearch}
        />
        <CSVLink
          data={filteredTrips}
          filename={"completed_trips.csv"}
          className="btn btn-primary mt-3"
        >
          Download CSV
        </CSVLink>
      </div>
      <div className="table-responsive">
        <table
          className="table table-striped table-bordered"
          style={{ textAlign: "center" }}
        >
          <thead className="table-dark">
            <tr>
              <th>Trip Date</th>
              <th>Booking ID</th>
              <th>Pickup Time</th>
              <th>Pickup Address</th>
              <th>Dropoff Address</th>
              <th>Distance</th>
              <th>Fare</th>
              <th>Driver</th>
              <th>Generate Receipt</th>
            </tr>
          </thead>
          <tbody>
            {filteredTrips.map((trip) => (
              <tr key={trip._id}>
                <td>{new Date(trip.date).toLocaleDateString()}</td>
                <td>{trip.bookingId}</td>
                <td>{trip.pickupTime}</td>
                <td>{trip.pickupAddress}</td>
                <td>{trip.dropoffAddress}</td>
                <td>{trip.distance}</td>
                <td>${trip.fare}</td>
                <td>{trip.driverId}</td>
                <td>
                  <Link to={`/receipt/${trip.bookingId}`}>
                    <p>Receipt</p>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompletedTrips;
