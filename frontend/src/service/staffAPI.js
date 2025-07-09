import axios from "axios";

const API_URL = "http://localhost:4000/api/staffs";

// get all staffs (Staff.jsx)
export const getAllStaffs = async () => {
    const response = await axios.get(`${API_URL}/`)
    return response.data;
}

// get staff by id
export const getStaffById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// create staff
export const createStaff = async (newData) => {
  const response = await axios.post(`${API_URL}/`, newData);
  return response.data;
};

// update staff
export const updateStaff = async (id, updatedData) => {
  const response = await axios.put(`${API_URL}/${id}`, updatedData);
  return response.data;
};

// delete staff
export const deleteStaff = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};