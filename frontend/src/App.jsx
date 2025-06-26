import { BrowseRouter, Routes, Route, Navigate } from 'react-router-dom';

import Appointment from './components/Appointment.jsx';
import Billing from './components/Billing.jsx';
import Dashboard from './components/Dashboard.jsx';
import Doctor from './components/Doctor.jsx';
import Patient from './components/Patient.jsx';
import Login from './components/Login.jsx';
import Staff from './components/Staff.jsx';

import Navigation from './layouts/Navigations.jsx';


export default function App(){
  return 
  <BrowseRouter>
    <Routes>
      <Route path='/' element={}></Route>
      <Route></Route>
      <Route></Route>
      <Route></Route>
      <Route></Route>
      <Route></Route>
    </Routes>
  </BrowseRouter>

}