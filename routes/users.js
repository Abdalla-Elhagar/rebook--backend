import express from "express";
import { register } from "../services/user_services/register.js";
import { login } from "../services/user_services/login.js";
import userModel from "../models/user.js";
import validateJWT from "../middlewares/validateJWT.js";
import { ubdateUserData } from "../services/user_services/updateUserData.js";
import { changePassword } from "../services/user_services/changePassword.js";


const router = express.Router();

router.get("/", async(req,res)=> {
  const users = await userModel.find()
  res.status(200).json(users)
})

router.post("/register", async (req, res) => {
  const { name, email, phone, password } = req.body;

  const { data, statusCode } = await register({ name, email, phone, password });

  res.status(statusCode).json(data);
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const { data, statusCode } = await login({ email, password });

  res.status(statusCode).json(data);
});

router.put("/change-user-data", validateJWT, ubdateUserData )

router.put("/change-user-password", validateJWT, changePassword )


export default router;
