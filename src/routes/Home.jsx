import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LoadScript, StandaloneSearchBox } from "@react-google-maps/api";
import MapComponent from "../components/MapComponent";

const libraries = ["places"];

const Home = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    pickupAddress: "",
    dropoffAddress: "",
    pickupDate: "",
    pickupTime: "",
    passengers: "",
    driver: "",
    distance: "",
    fare: "",
  });

  const [pickupCoords, setPickupCoords] = useState(null);
  const [dropoffCoords, setDropoffCoords] = useState(null);

  const pickupRef = useRef();
  const dropoffRef = useRef();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectPickup = () => {
    const places = pickupRef.current.getPlaces();
    if (places && places.length > 0) {
      const place = places[0];
      setFormData((prev) => ({
        ...prev,
        pickupAddress: place.formatted_address,
      }));
      setPickupCoords({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      });
    }
  };

  const handleSelectDropoff = () => {
    const places = dropoffRef.current.getPlaces();
    if (places && places.length > 0) {
      const place = places[0];
      setFormData((prev) => ({
        ...prev,
        dropoffAddress: place.formatted_address,
      }));
      setDropoffCoords({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      });
    }
  };

  useEffect(() => {
    if (pickupCoords && dropoffCoords) {
      const service = new window.google.maps.DistanceMatrixService();
      service.getDistanceMatrix(
        {
          origins: [{ lat: pickupCoords.lat, lng: pickupCoords.lng }],
          destinations: [{ lat: dropoffCoords.lat, lng: dropoffCoords.lng }],
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (response, status) => {
          if (status === "OK" && response.rows[0].elements[0].status === "OK") {
            const distanceInMeters =
              response.rows[0].elements[0].distance.value;
            const distanceInMiles = distanceInMeters / 1609.34; // convert meters to miles
            const calculatedFare = distanceInMiles * 2.8 + 3.5;
            setFormData((prev) => ({
              ...prev,
              distance: distanceInMiles.toFixed(2),
              fare: calculatedFare.toFixed(2),
            }));
          }
        }
      );
    }
  }, [pickupCoords, dropoffCoords]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        process.env.REACT_APP_ADD_BOOKING,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        setTimeout(() => {
          navigate("/bookinglist");
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(process.env.REACT_APP_SHOW_ACTIVE, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setDrivers(response.data.show);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchDrivers();
  }, []);

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-6">
          <form className="border p-4 shadow rounded" onSubmit={handleSubmit}>
            <h3 className="mb-4" style={{ textAlign: "center" }}>
              Booking Form
            </h3>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Customer Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                required
                placeholder="Customer Name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phoneNumber" className="form-label">
                Phone Number
              </label>
              <input
                type="tel"
                className="form-control"
                id="phoneNumber"
                name="phoneNumber"
                required
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="pickupAddress" className="form-label">
                Pickup Address
              </label>
              <LoadScript
                googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
                libraries={libraries}
              >
                <StandaloneSearchBox
                  onLoad={(ref) => (pickupRef.current = ref)}
                  onPlacesChanged={handleSelectPickup}
                >
                  <input
                    type="text"
                    className="form-control"
                    id="pickupAddress"
                    name="pickupAddress"
                    required
                    placeholder="Pickup Address"
                    value={formData.pickupAddress}
                    onChange={handleChange}
                  />
                </StandaloneSearchBox>
              </LoadScript>
            </div>
            <div className="mb-3">
              <label htmlFor="dropoffAddress" className="form-label">
                Dropoff Address
              </label>
              <LoadScript
                googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
                libraries={libraries}
              >
                <StandaloneSearchBox
                  onLoad={(ref) => (dropoffRef.current = ref)}
                  onPlacesChanged={handleSelectDropoff}
                >
                  <input
                    type="text"
                    className="form-control"
                    id="dropoffAddress"
                    name="dropoffAddress"
                    required
                    placeholder="Dropoff Address"
                    value={formData.dropoffAddress}
                    onChange={handleChange}
                  />
                </StandaloneSearchBox>
              </LoadScript>
            </div>
            <div className="mb-3">
              <label htmlFor="pickupDate" className="form-label">
                Pickup Date
              </label>
              <input
                type="date"
                className="form-control"
                id="pickupDate"
                name="pickupDate"
                required
                value={formData.pickupDate}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="pickupTime" className="form-label">
                Pickup Time
              </label>
              <input
                type="time"
                className="form-control"
                id="pickupTime"
                name="pickupTime"
                required
                value={formData.pickupTime}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="passengers" className="form-label">
                Passengers
              </label>
              <select
                className="form-select"
                id="passengers"
                name="passengers"
                required
                value={formData.passengers}
                onChange={handleChange}
              >
                <option value="">Select One</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="driver" className="form-label">
                Assign Driver
              </label>
              <select
                className="form-select"
                id="driver"
                name="driver"
                value={formData.driver}
                onChange={handleChange}
              >
                <option value="">Select One</option>
                {drivers.map((driver) => (
                  <option key={driver._id} value={driver.driver}>
                    {driver.cabNumber}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Submit
            </button>
            {formData.distance && formData.fare && (
              <div className="mt-3">
                <p>Distance: {formData.distance} miles</p>
                <p>Estimated Fare: ${formData.fare}</p>
              </div>
            )}
          </form>
        </div>
        <div className="col-md-6">
          <MapComponent
            pickupCoords={pickupCoords}
            dropoffCoords={dropoffCoords}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
