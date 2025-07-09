import axios from "axios";

const API_URL = "http://localhost:4000/api/medical_records";

// get all medical records (MedicalRecords.jsx)
export const getAllMedicalRecords = async () => {
    const response = await axios.get(`${API_URL}/`)
    return response.data;
}

// create medical record
export const createMedicalRecord = async (newData) => {
  const response = await axios.post(`${API_URL}/`, newData);
  return response.data;
};

// update medical record
export const updateMedicalRecord = async (id, updatedData) => {
  const response = await axios.put(`${API_URL}/${id}`, updatedData);
  return response.data;
};

// delete medical record
export const deleteMedicalRecord = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};