import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import AddUser from "../routes/AddUser";
import Home from "../routes/Home";
import Login from "../routes/Login";
import AddDrivers from "../routes/AddDrivers";
import AddVehicles from "../routes/AddVehicles";
import Activate from "../routes/Activate";
import User from "../routes/User";
import ContactUs from "../routes/ContactUs";
import EmployeeList from "../routes/EmployeeList";
import AllHours from "../routes/AllHours";
import ProtectedRoutes from "../components/ProtectRoutes";
import AllDrivers from "../routes/AllDrivers";
import Driver from "../routes/Driver";
import UpdateDrivers from "../components/UpdateDrivers";
import AllVehicles from "../routes/AllVehicles";
import Vehicle from "../routes/Vehicle";
import UpdateVehicle from "../components/UpdateVehicle";
import BookingList from "../routes/BookingList";
import CompletedTrips from "../routes/CompletedTrips";
import DriverHOS from "../components/Driverhos";
import Receipt from "../components/Receipt";
import UnassignedTrips from "../components/UnassignedTrips";

const RouteManager = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <ProtectedRoutes>
                <Home />
              </ProtectedRoutes>
            }
          />
          <Route
            path="addusers"
            element={
              <ProtectedRoutes>
                <AddUser />
              </ProtectedRoutes>
            }
          />
          <Route path="login" element={<Login />} />
          <Route
            path="adddrivers"
            element={
              <ProtectedRoutes>
                <AddDrivers />
              </ProtectedRoutes>
            }
          />
          <Route
            path="addvehicles"
            element={
              <ProtectedRoutes>
                <AddVehicles />
              </ProtectedRoutes>
            }
          />
          <Route
            path="activate"
            element={
              <ProtectedRoutes>
                <Activate />
              </ProtectedRoutes>
            }
          />
          <Route
            path="user"
            element={
              <ProtectedRoutes>
                <User />
              </ProtectedRoutes>
            }
          />
          <Route
            path="contactus"
            element={
              <ProtectedRoutes>
                <ContactUs />
              </ProtectedRoutes>
            }
          />
          <Route
            path="employeelist"
            element={
              <ProtectedRoutes>
                <EmployeeList />
              </ProtectedRoutes>
            }
          />
          <Route
            path="allhours"
            element={
              <ProtectedRoutes>
                <AllHours />
              </ProtectedRoutes>
            }
          />
          <Route
            path="alldrivers"
            element={
              <ProtectedRoutes>
                <AllDrivers />
              </ProtectedRoutes>
            }
          />
          <Route
            path="onedriver/:driverId"
            element={
              <ProtectedRoutes>
                <Driver />
              </ProtectedRoutes>
            }
          />
          <Route
            path="updatedriver/:driverId"
            element={
              <ProtectedRoutes>
                <UpdateDrivers />
              </ProtectedRoutes>
            }
          />
          <Route
            path="allvehicles"
            element={
              <ProtectedRoutes>
                <AllVehicles />
              </ProtectedRoutes>
            }
          />
          <Route
            path="onevehicle/:cabNumber"
            element={
              <ProtectedRoutes>
                <Vehicle />
              </ProtectedRoutes>
            }
          />
          <Route
            path="updatevehicle/:cabNumber"
            element={
              <ProtectedRoutes>
                <UpdateVehicle />
              </ProtectedRoutes>
            }
          />
          <Route
            path="bookinglist"
            element={
              <ProtectedRoutes>
                <BookingList />
              </ProtectedRoutes>
            }
          />
          <Route
            path="completedtrips"
            element={
              <ProtectedRoutes>
                <CompletedTrips />
              </ProtectedRoutes>
            }
          />
          <Route
            path="driverhos"
            element={
              <ProtectedRoutes>
                <DriverHOS />
              </ProtectedRoutes>
            }
          />
          <Route
            path="receipt/:bookingId"
            element={
              <ProtectedRoutes>
                <Receipt />
              </ProtectedRoutes>
            }
          />
          <Route
            path="unassigned"
            element={
              <ProtectedRoutes>
                <UnassignedTrips />
              </ProtectedRoutes>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RouteManager;
