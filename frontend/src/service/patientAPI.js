import axios from "axios";

const API_URL = "http://localhost:3000/api/patients";

// get all patients (Patient.jsx)
export const getAllPatients = async () => {
    const response = await axios.get(`${API_URL}/`)
    return response.data;
}

// get patient by id
export const getPatientById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// create patient
export const createPatient = async (newData) => {
  const response = await axios.post(`${API_URL}/`, newData);
  return response.data;
};

// update patient
export const updatePatient = async (id, updatedData) => {
  const response = await axios.put(`${API_URL}/${id}`, updatedData);
  return response.data;
};

// delete patient
export const deletePatient = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};