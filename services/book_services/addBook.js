
import bookModel from "../../models/book.js";

export const addBook = async (req, res) => {
  try {
    const userId = req.user?._id;

    const { bookName, author, description, category, status } = req.body;

    const addingDate = Date.now();

    const image = (req.file).path;

    const newBook = new bookModel({
      bookName,
      author,
      description,
      imageUrl: image,
      category,
      status,
      owner: userId,
      addingDate,
    });

    await newBook.save();

    res.status(201).json({ message: "book added successgully", book: newBook });
  } catch (error) {
    res.status(500).json({ message: "Error adding Book", error });
  }
};
