import jwt from "jsonwebtoken";
import userModel from "../models/user.js";
import dotenv from "dotenv";

dotenv.config();







const validateJWT = ( req, res, next )=> {
    const authorizationHeader = req.get("authorization")

    if(!authorizationHeader) {
        res.status(403).send("Authorization header was not provided")
        return
    }

    const token = authorizationHeader.split(" ")[1];

    if(!token) {
        res.status(403).send("Bearer token not found")
        return
    }

    jwt.verify( token, process.env.JWT_SECRET, async (err,payload) => {
        if(err) {
            res.status(403).send("Invalid token")
            return
        }

        if(!payload) {
            res.status(403).send("Invalid token payload")
            return
        }

        const userPayload = payload 

        const user = await userModel.findOne({_id: userPayload._id}) 

        req.user = user

        next()
    })
} 

export default validateJWT;