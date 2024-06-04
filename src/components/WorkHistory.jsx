import React, { useEffect, useState } from "react";
import axios from "axios";

const WorkHistory = () => {
  const [hours, setHours] = useState([]);

  useEffect(() => {
    const fetchHours = async () => {
      try {
        const userId = localStorage.getItem("employeeId");
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `${process.env.REACT_APP_GET_MY_HOURS}/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          setHours(response.data.hours);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchHours();

    const intervalId = setInterval(fetchHours, 6000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const calculateTotalHours = (timeIn, dateIn, timeOut, dateOut) => {
    const inDateTime = new Date(`${dateIn}T${timeIn}`);
    const outDateTime = new Date(`${dateOut}T${timeOut}`);
    const diff = (outDateTime - inDateTime) / 1000 / 60 / 60; // Difference in hours
    return diff.toFixed(2); // Return the difference in hours, fixed to 2 decimal places
  };

  return (
    <div className="container py-5">
      <h3 className="mb-4" style={{ textAlign: "center" }}>
        Work History
      </h3>
      <table
        className="table table-bordered table-hover"
        style={{ textAlign: "center" }}
      >
        <thead className="thead-dark">
          <tr>
            <th scope="col">Clock In Time</th>
            <th scope="col">Clock In Date</th>
            <th scope="col">Clock Out Time</th>
            <th scope="col">Clock Out Date</th>
            <th scope="col">Total Worked Hours</th>
          </tr>
        </thead>
        <tbody>
          {hours.map((hour) => (
            <tr key={hour._id}>
              <td>{hour.timeIn}</td>
              <td>{new Date(hour.dateIn).toLocaleDateString()}</td>
              <td>{hour.timeOut ? hour.timeOut : "N/A"}</td>
              <td>
                {hour.dateOut
                  ? new Date(hour.dateOut).toLocaleDateString()
                  : "N/A"}
              </td>
              <td>
                {hour.timeOut && hour.dateOut
                  ? calculateTotalHours(
                      hour.timeIn,
                      hour.dateIn,
                      hour.timeOut,
                      hour.dateOut
                    )
                  : "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WorkHistory;
