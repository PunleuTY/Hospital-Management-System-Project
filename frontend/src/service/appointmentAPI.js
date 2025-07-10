import axios from "axios";

const API_URL = "http://localhost:3000/api/appointments";

// get all appointments (Appointment.jsx)
export const getAllAppointment = async () => {
    const response = await axios.get(`${API_URL}/`);
    return response.data;
};

// get appointment by id
export const getAppointmentById = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

// create appointment
export const createAppointment = async (newData) => {
    const response = await axios.post(`${API_URL}/`, newData);
    return response.data;
}

// update appointment
export const updatedAppointment = async (id, updatedData) => {
    const response = await axios.put(`${API_URL}/${id}`, updatedData);
    return response.data;
}

// delete appointment
export const deleteAppointment = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
}