import models from "../../db/models/index.js";

const { Billing } = models;

export const listBills = async ({ limit, offset }) => {
  return Billing.findAndCountAll({
    limit,
    offset,
    order: [["billing_id", "ASC"]],
  });
};

export const findBillById = async (id) => {
  return Billing.findByPk(id);
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
