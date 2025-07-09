import db from "../../db/models/index.js";
const { User } = db;

export const findUser = (username) => {
  return User.findOne({ where: { username } });
};

export const createUserSv = async (data) => {
  return User.create(data);
};
