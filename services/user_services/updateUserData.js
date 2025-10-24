import userModel from "../../models/user.js";



export const ubdateUserData = async (req , res) => {
    try {
        const userId = req.user?._id
    const { name, phone } = req.body;

    await userModel.findByIdAndUpdate( userId, { name, phone })

    res.status(201).json("The user data changed")
    }
    catch(error) {
        res.json(error)
    }
    
}