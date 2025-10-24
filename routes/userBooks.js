import express from "express";
import validateJWT from "../middlewares/validateJWT.js";
import bookModel from "../models/book.js";
import upload from "../middlewares/upload.js";
import { addBook } from "../services/book_services/addBook.js";
import { deleteBook } from "../services/book_services/deleteBook.js";


const router = express.Router()


router.get("/", validateJWT, async (req, res) => {
  try {
    const userId = req.user?._id;
    const userBooks = await bookModel.find({ owner: userId });

    if (!userBooks || userBooks.length === 0) {
      res.status(404).json({ message: "No books found for this user." });
      return;
    }

    res.status(200).json(userBooks);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Server error while fetching user books." });
  }
});

router.post("/addBook", validateJWT, upload.single("image"), addBook)

router.delete("/delete-book", validateJWT, deleteBook)








export default router