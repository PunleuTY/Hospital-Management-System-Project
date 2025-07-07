
import express from "express";
import {
  createMedicalRecord,
  getMedicalRecord,
  updateMedicalRecord,
  deleteMedicalRecord,
} from "../controllers/medicalRecord_controller.js";
const router = express.Router();

// Route to create a new medical record
router.post("/", createMedicalRecord);
// Route to get a medical record by ID
router.get("/:id", getMedicalRecord);
// Route to update a medical record by ID
router.put("/:id", updateMedicalRecord);
// Route to delete a medical record by ID
router.delete("/:id", deleteMedicalRecord);
export default router;
