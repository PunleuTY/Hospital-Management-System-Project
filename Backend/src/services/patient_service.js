import models from "../../db/models/index.js";

const { Patient } = models;

export const listPatients = async ({ limit, offset }) => {
  return Patient.findAndCountAll({
    limit,
    offset,
    order: [["patientId", "ASC"]],
  });
};

export const findPatientById = async (id) => {
  return Patient.findByPk(id);
};
export const createPatientSv = async (patientData) => {
  return Patient.create(patientData);
};

export const updatePatientSv = async (id, patientData) => {
  return Patient.update(patientData, { where: { patientId: id } });
};

export const deletePatientSv = async (id) => {
  return Patient.destroy({ where: { patientId: id } });
};
