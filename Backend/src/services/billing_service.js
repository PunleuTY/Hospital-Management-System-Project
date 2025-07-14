import models from "../../db/models/index.js";

const { Billing, Patient, Staff } = models;

export const listBills = async ({ limit, offset }) => {
  return Billing.findAndCountAll({
    limit,
    offset,
    order: [["billing_id", "ASC"]],
    include: [
      {
        model: Patient,
        as: "patient",
        attributes: ["patientId", "firstName", "lastName"],
      },
      {
        model: Staff,
        as: "receptionist",
        attributes: ["staffId", "firstName", "lastName"],
      },
    ],
  });
};

export const findBillById = async (id) => {
  return Billing.findByPk(id, {
    include: [
      {
        model: Patient,
        as: "patient",
        attributes: ["patientId", "firstName", "lastName"],
      },
      {
        model: Staff,
        as: "receptionist",
        attributes: ["staffId", "firstName", "lastName"],
      },
    ],
  });
};

export const createBillSv = async (billData) => {
  return Billing.create(billData);
};

export const updateBillSv = async (id, billData) => {
  return Billing.update(billData, { where: { billing_id: id } });
};

export const deleteBillSv = async (id) => {
  return Billing.destroy({ where: { billing_id: id } });
};
