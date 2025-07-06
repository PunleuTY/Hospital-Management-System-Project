import sequelize from "../../config/db_config.js";
import { DataTypes } from "sequelize";

const User = sequelize.define("Users", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    // Hash Password
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM("Nurse", "Receptionist", "Doctor"),
    allowNull: false,
  },
});

export default User;
