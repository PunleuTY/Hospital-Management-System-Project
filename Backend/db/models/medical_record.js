import sequelize from "../config/db_config.js";
import { DataTypes } from "sequelize";

const Medical_record = sequelize.define(
  "Medical_record",
  {
    recordId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "record_id",
    },
    prescription: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: "prescription",
    },
    diagnosis: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: "diagnosis",
    },
    labResult: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: "lab_result",
    },
    treatment: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: "treatment",
    },
    patientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "patient_id",
    },
    appointmentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "appointment_id",
    },
  },
  {
    tableName: "medical_record",
    freezeTableName: true,
    underscored: true,
    timestamp: true,
    createdAt: false,
    updatedAt: "last_modified",
  }
);

Medical_record.associate = (models) => {
  Medical_record.belongsTo(models.Patient, {
    foreignKey: "patient_id",
    as: "patient",
  });
  Medical_record.belongsTo(models.Appointment, {
    foreignKey: "appointment_id",
    as: "appointment",
  });
};

export default Medical_record;
