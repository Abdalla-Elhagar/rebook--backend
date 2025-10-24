
import userModel from "../../models/user.js";
import bcrypt from "bcrypt";

export const changePassword = async (req, res) => {
  try {
    const userId = req.user?._id;
    const oldPassInDB = req.user?.password;

    const { oldPass, newPass } = req.body;

    const checkedPass = await bcrypt.compare(oldPass, oldPassInDB);

    if (!checkedPass) {
      res.status(400).json("Current password is wrong");
      return;
    }

    await userModel.findByIdAndUpdate(userId, {
      password: await bcrypt.hash(newPass, 10),
    });

    res.status(201).json("Changed user password");
  } catch (error) {
    res.status(400).json(error);
  }
};
