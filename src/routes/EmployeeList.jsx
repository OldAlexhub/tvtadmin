import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const EmployeeList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(process.env.REACT_APP_EMPLOYEE_LIST, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setData(response.data.employees);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchEmployees();

    const intervalId = setInterval(fetchEmployees, 6000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const handleRemove = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${process.env.REACT_APP_REMOVE_EMPLOYEE}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(data.filter((employee) => employee._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4" style={{ textAlign: "center" }}>
        Employee List
      </h2>
      <table
        className="table table-bordered table-hover"
        style={{ textAlign: "center" }}
      >
        <thead className="thead-dark">
          <tr>
            <th scope="col">Employee ID</th>
            <th scope="col">Name</th>
            <th scope="col">Phone Number</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col">Remove</th>
          </tr>
        </thead>
        <tbody>
          {data.map((dat) => (
            <tr key={dat._id}>
              <td>{dat.employeeId}</td>
              <td>
                {dat.fname} {dat.lname}
              </td>
              <td>{dat.phoneNumber}</td>
              <td>{dat.email}</td>
              <td>{dat.role}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleRemove(dat._id)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
