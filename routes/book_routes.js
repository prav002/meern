const express = require("express");
const router = express.Router();
const Book = require("../model/Book");
const booksController = require("../controllers/book_controller")

router.get("/",booksController.getAllBooks);
router.post("/",booksController.addbook);
router.get("/:id",booksController.getById);
router.put("/:id",booksController.updateBook);
router.delete("/:id",booksController.deleteBook);

router.post("/", async (req, res) => {
    const { name, author, description, price, available, image, buyingTime, returningTime, date } = req.body;
  
    let book;
    try {
      book = new Book({
        name,
        author,
        description,
        price,
        available,
        image,
        buyingTime, // Add the buyingTime field
        returningTime, // Add the returningTime field
        date, // Add the date field
      });
  
      await book.save();
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Unable to add book" });
    }
  
    if (!book) {
      return res.status(500).json({ message: "Unable to add book" });
    }
  
    return res.status(201).json({ book });
  });
  
module.exports=router;