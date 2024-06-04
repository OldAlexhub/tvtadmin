import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Footer = () => {
  return (
    <footer className="bg-light text-center mt-auto py-3">
      <div className="container">
        <span className="text-muted">
          © 2024 Trans Voyage Taxi | <Link to="/">Home</Link> |{" "}
          <Link to="/contactus">Contact Us</Link> |{" "}
          <Link to="/bookinglist">Booking Requests</Link>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
