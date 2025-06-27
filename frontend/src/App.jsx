import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Appointment from "./components/Appointment.jsx";
import Billing from "./components/Billing.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Patient from "./components/Patient.jsx";
import Login from "./components/Login.jsx";
import Staff from "./components/Staff.jsx";
import Button from "./components/Common/Button.jsx";
import Navigation from "./layouts/Navigations.jsx";
import Dropdown from "./components/Common/Dropdown.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"></Route>
        <Route></Route>
        <Route></Route>
        <Route></Route>
        <Route></Route>
        <Route></Route>
      </Routes>
    </BrowserRouter>
  );
}
