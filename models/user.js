import mongoose,{Schema} from "mongoose"






const userSchema = new Schema({
    id: String,
    name: String,
    email: String,
    phone: String,
    password: String,
})

const userModel = mongoose.model("User", userSchema)

export default userModel