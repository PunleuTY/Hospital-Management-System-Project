import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedNavigationRoute from "./components/ProtectedNavigationRoute";
import Dashboard from "./components/Dashboard";
import Patient from "./components/Patient";
import Appointment from "./components/Appointment";
import Billing from "./components/Billing";
import Staff from "./components/Staff";
import MedicalRecord from "./components/Medicalrecord";
import AddUser from "./components/addUser";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Dashboard - accessible to all roles */}
      <Route
        path="/dashboard"
        element={
          <ProtectedNavigationRoute requiredPermission="Dashboard">
            <Dashboard />
          </ProtectedNavigationRoute>
        }
      />

      {/* Patients - accessible to all roles */}
      <Route
        path="/dashboard/patient"
        element={
          <ProtectedNavigationRoute requiredPermission="Patients">
            <Patient />
          </ProtectedNavigationRoute>
        }
      />

      {/* Appointments - accessible to all roles */}
      <Route
        path="/dashboard/appointments"
        element={
          <ProtectedNavigationRoute requiredPermission="Appointments">
            <Appointment />
          </ProtectedNavigationRoute>
        }
      />

      {/* Billing - accessible to admin and receptionist only */}
      <Route
        path="/dashboard/billing"
        element={
          <ProtectedNavigationRoute requiredPermission="Billing">
            <Billing />
          </ProtectedNavigationRoute>
        }
      />

      {/* Staff - accessible to admin only */}
      <Route
        path="/dashboard/staff"
        element={
          <ProtectedNavigationRoute requiredPermission="Staff">
            <Staff />
          </ProtectedNavigationRoute>
        }
      />

      {/* Medical Records - accessible to admin, doctor, and nurse */}
      <Route
        path="/dashboard/records"
        element={
          <ProtectedNavigationRoute requiredPermission="Medical Record">
            <MedicalRecord />
          </ProtectedNavigationRoute>
        }
      />

      {/* Add User - accessible to admin only */}
      <Route
        path="/dashboard/staff/add"
        element={
          <ProtectedNavigationRoute requiredPermission="Add User">
            <AddUser />
          </ProtectedNavigationRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
