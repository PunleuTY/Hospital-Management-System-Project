export default (sequelize, DataTypes) => {
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
      },
      diagnosis: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      labResult: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: "lab_result",
      },
      treatment: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      patientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "patient_id",
      },
      doctorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "doctor_id",
      },
    },
    {
      tableName: "medical_record",
      freezeTableName: true,
      underscored: true,
      timestamp: true,
    }
  );

  return Medical_record;
};
