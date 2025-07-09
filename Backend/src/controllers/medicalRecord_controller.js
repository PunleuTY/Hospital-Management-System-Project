import {
  listMedicalRecords,
  createMedicalRecordSv,
  findMedicalRecordById,
  updateMedicalRecordSv,
  deleteMedicalRecordSv,
} from "../services/medicalRecord_service.js";
import { success, fail } from "../utils/response.js";

export const getAllMedicalRecords = async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.max(1, parseInt(req.query.limit) || 10);
  const offset = (page - 1) * limit;

  try {
    const { rows, count } = await listMedicalRecords({ limit, offset });
    const totalPages = Math.ceil(count / limit);
    return success(res, {
      data: rows,
      meta: { total: count, page, limit, totalPages },
    });
  } catch (err) {
    console.error("getAllMedicalRecords error:", err);
    return fail(res, err);
  }
};
export const getMedicalRecordById = async (req, res) => {
  try {
    const record = await findMedicalRecordById(req.params.id);
    if (!record) {
      return fail(res, "Medical record not found", 404);
    }
    return success(res, record);
  } catch (err) {
    return fail(res, err);
  }
};
export const createMedicalRecord = async (req, res) => {
  try {
    const record = await createMedicalRecordSv(req.body);
    return success(res, record, 201);
  } catch (err) {
    return fail(res, err);
  }
};
export const updateMedicalRecord = async (req, res) => {
  try {
    const [rows] = await updateMedicalRecordSv(req.params.id, req.body);
    if (rows === 0) {
      return fail(res, "Medical record not found or no changes made", 404);
    }
    return success(res, { updated: rows });
  } catch (err) {
    return fail(res, err);
  }
};
export const deleteMedicalRecord = async (req, res) => {
  try {
    const rows = await deleteMedicalRecordSv(req.params.id);
    if (rows === 0) {
      return fail(res, "Medical record not found", 404);
    }
    return success(res, { deleted: rows });
  } catch (err) {
    return fail(res, err);
  }
};
