import jwt from "jsonwebtoken"

export const generateJWT = (data) => {
    return jwt.sign(data, process.env.JWT_SECRET)
}