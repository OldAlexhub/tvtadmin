import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer"; // Adjust the path as necessary
import "../styles/Layout.css"; // Import the CSS file

const Layout = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("employeeId");
    localStorage.removeItem("role");

    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Trans Voyage Taxi
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="#"
                  id="tripsDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Trips
                </Link>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="manageFleetDropdown"
                >
                  <li>
                    <Link className="dropdown-item" to="/bookinglist">
                      Dispatched Trips
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/completedtrips">
                      Completed Trips
                    </Link>
                  </li>
                </ul>
              </li>
              {role === "admin" && (
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    to="#"
                    id="managementDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Management
                  </Link>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="managementDropdown"
                  >
                    <li>
                      <Link className="dropdown-item" to="/addusers">
                        Add Users
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/employeelist">
                        Employee List
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/allhours">
                        Hours
                      </Link>
                    </li>
                  </ul>
                </li>
              )}
              {role === "admin" && (
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    to="#"
                    id="manageFleetDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Manage Fleet
                  </Link>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="manageFleetDropdown"
                  >
                    <li>
                      <Link className="dropdown-item" to="/adddrivers">
                        Add Drivers
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/alldrivers">
                        Drivers List
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/addvehicles">
                        Add Vehicles
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/allvehicles">
                        Vehicles List
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/activate">
                        Activate Drivers
                      </Link>
                    </li>
                  </ul>
                </li>
              )}
              <li className="nav-item">
                <Link className="nav-link" to="/contactus">
                  Contact Us Inbox
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto">
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="#"
                  id="userInfoDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Clock In/Out
                </Link>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="userInfoDropdown"
                >
                  <li>
                    <Link className="dropdown-item" to="/user">
                      Clock In/Out
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <button
                  className="btn btn-link nav-link"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="flex-grow-1 content">
        <Outlet />
      </div>
      <Footer /> {/* Add the footer here */}
    </div>
  );
};

export default Layout;
