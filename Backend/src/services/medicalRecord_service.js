import models from "../../db/models/index.js";

const { Medical_record } = models;

export const listMedicalRecords = async ({ limit, offset }) => {
  return Medical_record.findAndCountAll({
    limit,
    offset,
    order: [["record_id", "ASC"]],
  });
};

export const findMedicalRecordById = async (id) => {
  return Medical_record.findByPk(id);
};

export const createMedicalRecordSv = async (data) => {
  return Medical_record.create(data);
};
export const updateMedicalRecordSv = async (id, data) => {
  return Medical_record.update(data, {
    where: { record_id: id },
  });
};
export const deleteMedicalRecordSv = async (id) => {
  return Medical_record.destroy({
    where: { record_id: id },
  });
};
