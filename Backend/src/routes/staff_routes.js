import e from "express";

const router = e.Router();
import {
  getAllStaffMembers,
  getStaffMemberById,
  createStaffMember,
  updateStaffMember,
  deleteStaffMember,
} from "../controllers/staff_controller.js";

// Router for get all staff members
router.get("/", getAllStaffMembers);
// Router for get staff member by id
router.get("/:id", getStaffMemberById);
// Router for create staff member
router.post("/", createStaffMember);
// Router for update staff member
router.put("/:id", updateStaffMember);
// Router for delete staff member
router.delete("/:id", deleteStaffMember);
export default router;
