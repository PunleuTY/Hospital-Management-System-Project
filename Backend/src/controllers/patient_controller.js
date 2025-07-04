import { fail, success } from "../utils/response.js";
import {
  listPatients,
  findPatientById,
  createPatientSv,
  updatePatientSv,
  deletePatientSv,
} from "../services/patient_service.js";

// Retrieve all patients with pagination
export const getAllPatients = async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.max(1, parseInt(req.query.limit) || 10);
  const offset = (page - 1) * limit;

  try {
    const { rows, count } = await listPatients({ limit, offset });
    const totalPages = Math.ceil(count / limit);

    return success(res, {
      data: rows,
      meta: {
        total: count,
        page,
        limit,
        totalPages,
      },
    });
  } catch (e) {
    return fail(res, e);
  }
};

// Retrieve a patient by ID
export const getPatientById = async (req, res) => {
  try {
    const patient = await findPatientById(req.params.id);
    if (!patient) {
      return res.status(404).json({ status: "error", message: "Not Found" });
    }
    return success(res, patient);
  } catch (e) {
    return fail(res, e);
  }
};

// Create a new patient
export const createPatient = async (req, res) => {
  try {
    const patient = await createPatientSv(req.body);
    return success(res, patient, 201);
  } catch (e) {
    return fail(res, e);
  }
};
// Update a patient
export const updatePatient = async (req, res) => {
  try {
    const [rows] = await updatePatientSv(req.params.id, req.body);
    if (rows === 0) {
      return res.status(404).json({ status: "error", message: "Not Found" });
    }
    return success(res, { updated: rows });
  } catch (err) {
    return fail(res, err);
  }
};

// Delete a patient
export const deletePatient = async (req, res) => {
  try {
    const rows = await deletePatientSv(req.params.id, req.body);
    if (rows === 0) {
      return res.status(404).json({ status: "error", message: "Not Found" });
    }
  } catch (e) {
    return fail(res, e);
  }
};
