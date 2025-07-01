import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AddStaff from './components/Form/addStaff.jsx';
/*
import Billing from "./components/Billing.jsx";
import Appointment from "./components/Appointment.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Patient from "./components/Patient.jsx";
import Login from "./components/Login.jsx";
import Staff from "./components/Staff.jsx";
*/
/*
import Button from "./components/Common/Button.jsx";
import Navigation from "./layouts/Navigations.jsx";
import Dropdown from "./components/Common/Dropdown.jsx";
*/

export default function App(){
  return (
  <BrowserRouter>
    <Routes>

      <Route path='/' element={<AddStaff />}></Route>

      

    </Routes>
  </BrowserRouter>
  );
}

/*
<Route path='/dashboard' element={<Dashboard />}></Route>
      <Route path='/billing' element={<Billing />}></Route>
      <Route path='/appointment' element={<Appointment />}></Route>
      <Route path='/doctor' element={<Doctor />}></Route>
      <Route path='/patient' element={<Patient />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/staff' element={<Staff />}></Route>
*/ 