import mongoose, { Schema } from "mongoose";


const bookSchema = new Schema({
  bookName: String,
  author: String,
  description: String,
  imageUrl: String,
  category: String,
  status: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  addingDate: Number,
});

const bookModel = mongoose.model("book", bookSchema);

export default bookModel;
