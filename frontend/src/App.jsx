import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import React from 'react';
import { BrowseRouter, Routes, Route, Navigate } from 'react-router-dom';

import Appointment from "./components/Appointment.jsx";
import Billing from "./components/Billing.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Patient from "./components/Patient.jsx";
import Login from "./components/Login.jsx";
import Staff from "./components/Staff.jsx";
import Button from "./components/Common/Button.jsx";
import Navigation from "./layouts/Navigations.jsx";
import Dropdown from "./components/Common/Dropdown.jsx";
import Appointment from './components/Appointment.jsx';
import Billing from './components/Billing.jsx';
import Dashboard from './components/Dashboard.jsx';
import Doctor from './components/Doctor.jsx';
import Patient from './components/Patient.jsx';
import Login from './components/Login.jsx';
import Staff from './components/Staff.jsx';
import addAppointment from './components/Form/addAppointment.jsx';

import Navigation from './layouts/Navigations.jsx';


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
export default function App(){
  return 
  <BrowseRouter>
    <Routes>
      <Route path='/' element={<addAppointment />}></Route>
      <Route path='/dashboard' element={<Dashboard />}></Route>
      <Route path='/billing' element={<Billing />}></Route>
      <Route path='/appointment' element={<Appointment />}></Route>
      <Route path='/doctor' element={<Doctor />}></Route>
      <Route path='/patient' element={<Patient />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/staff' element={<Staff />}></Route>
    </Routes>
  </BrowseRouter>

}

