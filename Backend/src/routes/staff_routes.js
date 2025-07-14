import express from "express";

const router = express.Router();
import {
  getAllStaff,
  getStaffById,
  createStaff,
  updateStaff,
  deleteStaff,
} from "../controllers/staff_controller.js";

// Router for get all staff members
router.get("/api/staffs", getAllStaff);

// Router for get staff member by id
router.get("/api/staffs/:id", getStaffById);

// Router for create staff member
router.post("/api/staffs", createStaff);

// Router for update staff member
router.put("/api/staffs/:id", updateStaff);

// Router for delete staff member
router.delete("/api/staffs/:id", deleteStaff);

export default router;
