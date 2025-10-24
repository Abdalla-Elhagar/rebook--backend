import userModel from "../../models/user.js";
import bcrypt from "bcrypt";
import { generateJWT } from "../../utils/generateJWT.js";

export const login = async ({ email, password }) => {
  try {
    const findUser = await userModel.findOne({ email });

    if (!findUser) {
      return { data: "Email or password is incorrect", statusCode: 400 };
    }

    const checkedPass = await bcrypt.compare(password, findUser.password);

    if (!checkedPass) {
      return { data: "Email or password is incorrect", statusCode: 400 };
    }

    const token = generateJWT({
      _id: findUser._id,
      email: findUser.email,
      name: findUser.name,
      phone: findUser.phone,
    });

    return { data: token, statusCode: 200 };
  } catch (error) {
    console.error("Error in login:", error);
    return { data: "Internal Server Error", statusCode: 500 };
  }
};
