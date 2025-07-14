import models from "../../db/models/index.js";

const { Patient, Staff, Appointment, Medical_record, Billing } = models;

export const listPatients = async ({ limit, offset }) => {
  return Patient.findAndCountAll({
    limit,
    offset,
    order: [["patientId", "ASC"]],
    include: [
      {
        model: Staff,
        as: "doctors",
        attributes: ["staffId", "firstName", "lastName", "specialization"],
        through: { attributes: [] }, // Don't include junction table attributes
      },
    ],
  });
};

export const findPatientById = async (id) => {
  return Patient.findByPk(id, {
    include: [
      {
        model: Staff,
        as: "doctors",
        attributes: ["staffId", "firstName", "lastName", "specialization"],
        through: { attributes: [] }, // Don't include junction table attributes
      },
    ],
  });
};
export const createPatientSv = async (patientData) => {
  const { doctorId, ...patientInfo } = patientData;
  
  // Create the patient first
  const patient = await Patient.create(patientInfo);
  
  // If doctorId is provided, create the patient-doctor relationship
  if (doctorId) {
    await patient.addDoctor(doctorId);
  }
  
  return patient;
};

export const updatePatientSv = async (id, patientData) => {
  return Patient.update(patientData, { where: { patientId: id } });
};

export const deletePatientSv = async (id) => {
  // First check if patient has related records
  const patient = await Patient.findByPk(id, {
    include: [
      { model: Appointment, as: "appointments" },
      { model: Medical_record, as: "medicalRecords" },
      { model: Billing, as: "billings" },
    ],
  });

  if (!patient) {
    return 0; // Patient not found
  }

  // Check if patient has any related records
  const hasAppointments =
    patient.appointments && patient.appointments.length > 0;
  const hasMedicalRecords =
    patient.medicalRecords && patient.medicalRecords.length > 0;
  const hasBillings = patient.billings && patient.billings.length > 0;

  if (hasAppointments || hasMedicalRecords || hasBillings) {
    throw new Error(
      "Cannot delete patient with existing appointments, medical records, or billings"
    );
  }

  return Patient.destroy({ where: { patientId: id } });
};
