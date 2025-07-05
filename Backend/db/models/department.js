export default (sequelize, DataTypes) => {
  const Department = sequelize.define(
    "Department",
    {
      depId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "department_id",
      },
      depName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "department_name",
      },
      location: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "location",
      },
    },
    {
      tableName: "department",
      freezeTableName: true,
      underscored: true,
      timestamps: true,
    }
  );
  return Department;
};
