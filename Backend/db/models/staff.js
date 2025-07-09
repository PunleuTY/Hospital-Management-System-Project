import sequelize from "../config/db_config.js";
import { DataTypes } from "sequelize";

const Staff = sequelize.define(
  "Staff",
  {
    staffId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "staff_id",
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "last_name",
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "first_name",
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contact: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    specialization: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    departmentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "department_id",
    },
    doctorId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "doctor_id",
    },
  },
  {
    tableName: "staff",
    freezeTableName: true,
    underscored: true,
    timestamps: true,
    createdAt: false,
    updatedAt: "last_modified",
  }
);

Staff.associate = (models) => {
  Staff.belongsTo(models.Department, {
    foreignKey: "department_id",
    as: "department",
  });
  Staff.belongsTo(models.Staff, {
    foreignKey: "doctor_id",
    as: "supervisor",
  });
  Staff.hasMany(models.Staff, {
    foreignKey: "doctor_id",
    as: "team",
  });
  Staff.belongsToMany(models.Patient, {
    through: models.Appointment,
    foreignKey: "staff_id",
    otherKey: "patient_id",
    as: "patients",
  });
  Staff.hasMany(models.Appointment, {
    foreignKey: "staff_id",
    as: "appointments",
  });
  Staff.hasMany(models.Billing, {
    foreignKey: "receptionist_id",
    as: "billings",
  });
};

export default Staff;
