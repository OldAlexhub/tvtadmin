import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Logo from "../images/logo.png";
import { useReactToPrint } from "react-to-print";
import "../styles/Receipt.css";

const Receipt = () => {
  const [datas, setDatas] = useState("");
  const { bookingId } = useParams();
  const receiptRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${process.env.REACT_APP_GET_RECEIPT}/${bookingId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          setDatas(response.data.show);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [bookingId]);

  const handlePrint = useReactToPrint({
    content: () => receiptRef.current,
  });

  const generateMapUrl = () => {
    const pickup = encodeURIComponent(datas.pickupAddress);
    const dropoff = encodeURIComponent(datas.dropoffAddress);
    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY; // Ensure this is set in your environment variables

    return `https://maps.googleapis.com/maps/api/staticmap?size=600x400&markers=color:blue|label:P|${pickup}&markers=color:red|label:D|${dropoff}&path=color:0x0000ff|weight:5|${pickup}|${dropoff}&key=${apiKey}`;
  };

  return (
    <div className="receipt-container">
      <div className="receipt" ref={receiptRef}>
        <img src={Logo} alt="logo" className="logo" />
        <h1>Trip Info</h1>
        <div className="company-info">
          <p>Trans Voyage Taxi</p>
          <p>14500 S. Havana St, Aurora CO 80012</p>
          <p>303-525-4482</p>
          <p>info@transvoyagetaxi.com</p>
        </div>
        <p>
          <strong>Booking ID: </strong>
          {datas.bookingId}
        </p>
        <p>
          <strong>Driver ID: </strong>
          {datas.driverId}
        </p>
        <p>
          <strong>Trip Date: </strong>
          {new Date(datas.date).toLocaleDateString()}
        </p>
        <p>
          <strong>Pickup Time: </strong>
          {datas.pickupTime}
        </p>
        <p>
          <strong>Pickup Address: </strong>
          {datas.pickupAddress}
        </p>
        <p>
          <strong>Dropoff Address: </strong>
          {datas.dropoffAddress}
        </p>
        <p>
          <strong>Distance: </strong>
          {datas.distance === 0 ? "Flat Rate Zone" : datas.distance}
        </p>
        <p>
          <strong>Fare: </strong>${datas.fare}
        </p>
        {datas.pickupAddress && datas.dropoffAddress && (
          <img src={generateMapUrl()} alt="Route Map" className="map" />
        )}
      </div>
      <button onClick={handlePrint} className="print-button">
        Print or Save as PDF
      </button>
    </div>
  );
};

export default Receipt;
