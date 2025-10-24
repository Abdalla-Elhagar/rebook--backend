import userModel from "../../models/user.js";
import bcrypt from "bcrypt";
import { generateJWT } from "../../utils/generateJWT.js";



export const register = async ({
  name,
  email,
  phone,
  password,
}) => {
  const user = await userModel.findOne({ email });

  if (user) {
    return { data: "user already exists!", statusCode: 400 };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new userModel({
    name,
    email,
    password: hashedPassword,
    phone,
  });
  await newUser.save();

  const token = generateJWT({
    name,
    email: newUser.email,
    password: hashedPassword,
    phone: newUser.phone,
    _id: newUser._id,
  });

  return { data: token, statusCode: 200 };
};
