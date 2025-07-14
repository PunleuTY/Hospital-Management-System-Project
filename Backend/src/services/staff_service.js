import models from "../../db/models/index.js";

const { Staff, Department } = models;

export const listAllStaff = async ({ limit, offset }) =>
  Staff.findAndCountAll({
    limit,
    offset,
    order: [["staff_id", "ASC"]],
    include: [
      {
        model: Department,
        as: "department",
        attributes: ["departmentId", "departmentName", "location"],
      },
    ],
  });

export const findStaffById = async (id) =>
  Staff.findByPk(id, {
    include: [
      {
        model: Department,
        as: "department",
        attributes: ["departmentId", "departmentName", "location"],
      },
    ],
  });

export const createStaffSv = async (data) => Staff.create(data);

export const updateStaffSv = async (id, data) =>
  Staff.update(data, { where: { staffId: id } });

export const deleteStaffSvc = async (id) =>
  Staff.destroy({ where: { staffId: id } });
