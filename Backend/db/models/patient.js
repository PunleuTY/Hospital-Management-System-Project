export default (sequelize, DataTypes) => {
  const Patient = sequelize.define(
    "Patient",
    {
      patientId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "patient_id", // maps JS `patientId` → DB `patient_id`
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "first_name", // maps `firstName` → `first_name`
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "last_name",
      },
      height: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
        field: "height", // maps `height` → `height`
      },
      weight: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
        field: "weight", // maps `weight` → `weight`
      },
      dateOfBirth: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        field: "date_of_birth", // maps `dateOfBirth` → `date_of_birth
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: "address", // maps `address` → `address`
      },
      contact: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "contact", // maps `contact` → `contact`
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isEmail: true, // validate email format
        },
        field: "email", // maps `email` → `email`
      },
    },
    {
      tableName: "patient", // use the patient table in database
      freezeTableName: true, // keep the table name as is
      underscored: true, // automatically snake_case JS attributes
      timestamps: true,
    }
  );

  return Patient;
};
