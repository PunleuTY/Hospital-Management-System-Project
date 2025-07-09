// define sequelize model for role model including 2 columns,role_id pk and role_name
import sequelize from "../config/db_config.js";
import { DataTypes } from "sequelize";

const Role = sequelize.define(
  "Roles",
  {
    role_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    role_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "role",
    freezeTableName: true,
    underscored: true,
    timestamps: true,
    createdAt: false,
    updatedAt: "last_modified",
  }
);

// Define associations
Role.associate = (models) => {
  Role.hasMany(models.Users, {
    foreignKey: "role_id",
    as: "users",
  });
};

export default Role;
