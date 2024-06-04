import React, { useEffect, useState } from "react";
import axios from "axios";

const ContactUs = () => {
  const [msges, setMsges] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(process.env.REACT_APP_SHOW_MESSAGES, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          setMsges(response.data.messages);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchMessages();
  }, []);

  return (
    <div className="container py-5">
      <div className="card shadow mb-4">
        <div className="card-header bg-primary text-white">
          <h2>Contact Messages</h2>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead className="table-dark">
                <tr>
                  <th>Date</th>
                  <th>Name</th>
                  <th>Phone Number</th>
                  <th>Email</th>
                  <th>Request Type</th>
                  <th>Message</th>
                </tr>
              </thead>
              <tbody>
                {msges.map((msg) => (
                  <tr key={msg._id}>
                    <td>{new Date(msg.date).toLocaleDateString()}</td>
                    <td>{msg.name}</td>
                    <td>{msg.phoneNumber}</td>
                    <td>{msg.email}</td>
                    <td>{msg.request}</td>
                    <td>{msg.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
