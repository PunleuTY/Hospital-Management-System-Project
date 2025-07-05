export default (sequelize, DataTypes) => {
  const Appointment = sequelize.define(
    "Appointment",
    {
      appointmentId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "appointment_id",
      },
      purpose: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      dateTime: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "date_time",
      },
      status: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      doctorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "staff_id",
      },
      patientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "patient_id",
      },
    },
    {
      tableName: "appointment",
      freezeTableName: true,
      underscored: true,
      timestamps: true,
    }
  );

  // Association

  return Appointment;
};
