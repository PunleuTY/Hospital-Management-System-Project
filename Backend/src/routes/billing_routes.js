import express from "express";
import {
  createBill,
  getAllbills,
  getBillById,
  updateBill,
} from "../controllers/billing_controllers";

const router = express.Router();

// Router for get all billings
router.get("/", getAllbills);
// Router for get bill by id
router.get("/:id", getBillById);
// Router for create bill
router.post("/", createBill);
// Router for update bill
router.put("/:id", updateBill);
// Router for delete bill
router.delete("/:id", deleteBill);

export default router;
