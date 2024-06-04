import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/BookingList.css";
import UnassignedTrips from "../components/UnassignedTrips";

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(process.env.REACT_APP_SHOW_BOOKING, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          setBookings(response.data.show);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchBookings();

    const intervalId = setInterval(fetchBookings, 6000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredBookings = bookings.filter((booking) => {
    return (
      booking.bookingId
        .toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      booking.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.pickupAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.dropoffAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
      new Date(booking.pickupTime)
        .toLocaleString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      booking.phoneNumber
        .toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      booking.passengers.toString().includes(searchTerm.toLowerCase()) ||
      booking.distance
        .toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      booking.fare
        .toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      booking.driver.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center">Booking List</h2>
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div className="table-responsive">
        <table className="table table-bordered table-striped table-hover text-center">
          <thead className="table-dark">
            <tr>
              <th scope="col">Trip Date</th>
              <th scope="col">Booking ID</th>
              <th scope="col">Customer Name</th>
              <th scope="col">Pickup Address</th>
              <th scope="col">Dropoff Address</th>
              <th scope="col">Pickup Time</th>
              <th scope="col">Phone Number</th>
              <th scope="col">Passengers</th>
              <th scope="col">Distance (miles)</th>
              <th scope="col">Fare ($)</th>
              <th scope="col">Cab Number</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map((book) => (
              <tr key={book._id}>
                <td>{new Date(book.pickupDate).toLocaleDateString()}</td>
                <td>{book.bookingId}</td>
                <td>{book.name}</td>
                <td>{book.pickupAddress}</td>
                <td>{book.dropoffAddress}</td>
                <td>{book.pickupTime}</td>
                <td>{book.phoneNumber}</td>
                <td>{book.passengers}</td>
                <td>{book.distance}</td>
                <td>{book.fare}</td>
                <td>{book.driver}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <UnassignedTrips />
    </div>
  );
};

export default BookingList;
