import { User } from "../models";

const findUserByEmail = async (email: string) => {
  return await User.findOne({ email });
};

const findUserById = async (id: string) => {
  return await User.findOne({ _id: id });
};

const createUser = async (input: any) => {
  const newUser = await new User(input);
  return newUser.save();
};

const findUsers = async () => {
  return await User.find();
};

const findOtherUsers = async (userId: string) => {
  return await User.find({ _id: { $ne: userId } });
};

export { findUserByEmail, findUserById, createUser, findUsers, findOtherUsers };
