import sequelize from "../config/db_config.js";
import { DataTypes } from "sequelize";

const Billing = sequelize.define(
  "Billing",
  {
    billId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "billing_id",
    },
    treatmentFee: {
      type: DataTypes.FLOAT,
      allowNull: false,
      field: "treatment_fee",
    },
    medicationFee: {
      type: DataTypes.FLOAT,
      allowNull: false,
      field: "medication_fee",
    },
    labTestFee: {
      type: DataTypes.FLOAT,
      allowNull: false,
      field: "lab_test_fee",
    },
    consultationFee: {
      type: DataTypes.FLOAT,
      allowNull: false,
      field: "consultation_fee",
    },
    totalAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
      field: "total_amount",
    },
    paymentStatus: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "payment_status",
    },
    receptionistId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "receptionist_id",
    },
    patientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "patient_id",
    },
  },
  {
    tableName: "billing",
    freezeTableName: true,
    underscored: true,
    timestamps: true,
    createdAt: false,
    updatedAt: "last_modified",
  }
);
Billing.associate = (models) => {
  Billing.belongsTo(models.Patient, {
    foreignKey: "patient_id",
    as: "patient",
  });
  Billing.belongsTo(models.Staff, {
    foreignKey: "receptionist_id",
    as: "receptionist",
  });
};
export default Billing;
