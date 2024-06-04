import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import WorkHistory from "../components/WorkHistory";
import axios from "axios";

const User = () => {
  const name = localStorage.getItem("name");
  const userId = localStorage.getItem("employeeId");

  const [clockInData, setClockInData] = useState({
    userId: userId,
    timeIn: "",
    dateIn: "",
  });

  const [clockOutData, setClockOutData] = useState({
    userId: userId,
    timeOut: "",
    dateOut: "",
  });

  const [message, setMessage] = useState("");

  const handleClockInChange = (e) => {
    setClockInData({ ...clockInData, [e.target.name]: e.target.value });
  };

  const handleClockOutChange = (e) => {
    setClockOutData({ ...clockOutData, [e.target.name]: e.target.value });
  };

  const handleClockInSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        process.env.REACT_APP_CLOCK_IN,
        clockInData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage("ClockIn Failed");
      console.log(error);
    }
  };

  const handleClockOutSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        process.env.REACT_APP_CLOCK_OUT,
        clockOutData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage("ClockOut Failed");
      console.log(error);
    }
  };

  return (
    <div className="container py-5">
      <div className="text-center mb-4">
        <p className="h4">Welcome {name}</p>
      </div>
      {message && <div className="alert alert-info">{message}</div>}
      <div className="row">
        <div className="col-md-6 mb-4">
          <form
            className="border p-4 shadow rounded"
            onSubmit={handleClockInSubmit}
          >
            <h3 className="mb-3">Clock In</h3>
            <div className="mb-3">
              <label htmlFor="timein" className="form-label">
                Time In
              </label>
              <input
                type="time"
                className="form-control"
                id="timein"
                name="timeIn"
                value={clockInData.timeIn}
                onChange={handleClockInChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="datein" className="form-label">
                Date In
              </label>
              <input
                type="date"
                className="form-control"
                id="datein"
                name="dateIn"
                value={clockInData.dateIn}
                onChange={handleClockInChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Clock In
            </button>
          </form>
        </div>
        <div className="col-md-6 mb-4">
          <form
            className="border p-4 shadow rounded"
            onSubmit={handleClockOutSubmit}
          >
            <h3 className="mb-3">Clock Out</h3>
            <div className="mb-3">
              <label htmlFor="timeout" className="form-label">
                Time Out
              </label>
              <input
                type="time"
                className="form-control"
                id="timeout"
                name="timeOut"
                value={clockOutData.timeOut}
                onChange={handleClockOutChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="dateout" className="form-label">
                Date Out
              </label>
              <input
                type="date"
                className="form-control"
                id="dateout"
                name="dateOut"
                value={clockOutData.dateOut}
                onChange={handleClockOutChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Clock Out
            </button>
          </form>
        </div>
      </div>
      <hr />
      <div>
        <WorkHistory />
      </div>
    </div>
  );
};

export default User;
