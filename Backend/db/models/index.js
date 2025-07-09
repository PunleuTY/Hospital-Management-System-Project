import Appointment from "./appointment.js";
import Medical_record from "./medical_record.js";
import Patient from "./patient.js";
import Staff from "./staff.js";
import Billing from "./billing.js";
import Department from "./department.js";
import User from "./user.js";
import Role from "./role.js";

const models = {
  Appointment,
  Medical_record,
  Patient,
  Staff,
  Billing,
  Department,
  Role,
  User,
};

Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

export default models;
