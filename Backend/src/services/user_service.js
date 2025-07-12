import db from "../../db/models/index.js";
const { User, Role } = db;

export const createUserSv = async (data) => {
  return User.create(data);
};
