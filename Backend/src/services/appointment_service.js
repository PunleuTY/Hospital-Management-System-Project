import db from "../../db/models/index.js";
const { Appointment, Patient, Staff, Medical_record } = db;

export const listAllAppointments = async ({ limit, offset }) => {
  return Appointment.findAndCountAll({
    limit,
    offset,
    order: [["appointment_id", "ASC"]],
    include: [
      {
        model: Patient,
        as: "patient",
        attributes: ["patientId", "firstName", "lastName"],
      },
      {
        model: Staff,
        as: "doctor",
        attributes: ["staffId", "firstName", "lastName", "specialization"],
      },
    ],
  });
};
export const findAppointmentById = async (id) => Appointment.findByPk(id);

export const createAppointmentSv = async (data) => Appointment.create(data);

export const updateAppointmentSv = async (id, data) =>
  Appointment.update(data, { where: { appointmentId: id } });

export const deleteAppointmentSv = async (id) => {
  // First check if appointment has related medical records
  const appointment = await Appointment.findByPk(id, {
    include: [{ model: Medical_record, as: "medicalRecords" }],
  });

  if (!appointment) {
    return 0; // Appointment not found
  }

  // Check if appointment has any related medical records
  const hasMedicalRecords =
    appointment.medicalRecords && appointment.medicalRecords.length > 0;

  if (hasMedicalRecords) {
    throw new Error("Cannot delete appointment with existing medical records");
  }

  return Appointment.destroy({ where: { appointmentId: id } });
};
