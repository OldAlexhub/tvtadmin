import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { saveAs } from "file-saver";
import Papa from "papaparse";

const AllHours = () => {
  const [hoursData, setHoursData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchMonth, setSearchMonth] = useState("");

  useEffect(() => {
    const fetchHours = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(process.env.REACT_APP_ALL_HOURS, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          setHoursData(response.data.hours);
          setFilteredData(response.data.hours); // Set initial filtered data
        }
      } catch (error) {
        setError(error.message);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchHours();
  }, []);

  const handleSearchChange = (e) => {
    const selectedMonth = e.target.value;
    setSearchMonth(selectedMonth);
    if (selectedMonth) {
      const [year, month] = selectedMonth.split("-");
      const filtered = hoursData.filter((hour) => {
        const clockInDate = new Date(hour.dateIn);
        return (
          clockInDate.getFullYear() === parseInt(year) &&
          clockInDate.getMonth() === parseInt(month) - 1
        );
      });
      setFilteredData(filtered);
    } else {
      setFilteredData(hoursData);
    }
  };

  const handleDownloadCSV = () => {
    const csv = Papa.unparse(filteredData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "work_hours.csv");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container py-5">
      <h3 className="mb-4" style={{ textAlign: "center" }}>
        All Hours
      </h3>
      <div className="mb-4">
        <label htmlFor="searchMonth" className="form-label">
          Search by Month:
        </label>
        <input
          type="month"
          id="searchMonth"
          className="form-control"
          value={searchMonth}
          onChange={handleSearchChange}
        />
      </div>
      <button className="btn btn-primary mb-4" onClick={handleDownloadCSV}>
        Download CSV
      </button>
      <table
        className="table table-bordered table-hover"
        style={{ textAlign: "center" }}
      >
        <thead className="thead-dark">
          <tr>
            <th scope="col">Employee ID</th>
            <th scope="col">Clock In Time</th>
            <th scope="col">Clock In Date</th>
            <th scope="col">Clock Out Time</th>
            <th scope="col">Clock Out Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((hour) => (
            <tr key={hour._id}>
              <td>{hour.userId}</td>
              <td>{hour.timeIn}</td>
              <td>{new Date(hour.dateIn).toLocaleDateString()}</td>
              <td>{hour.timeOut ? hour.timeOut : "N/A"}</td>
              <td>
                {hour.dateOut
                  ? new Date(hour.dateOut).toLocaleDateString()
                  : "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllHours;
