import bookModel from "../../models/book.js";




export const deleteBook = async ( req, res ) => {

    try{
       const bookId = req.body._id

    await bookModel.findByIdAndDelete(bookId)

    res.status(200).json("Deleted the book") 
    }
    catch(error) {
        res.send(error)
    }
    
}