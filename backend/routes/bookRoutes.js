const router = require("express").Router();
const bookModel = require("../models/bookModel");



//POST REQUEST
router.post("/add" , async (req , res) => {
    try {
        const data = req.body;
        const newBook = new bookModel(data);  //creating a new instance of the model with the received data
        await newBook.save().then(() => {
            res.status(201).json({message:"Book Added Succesfully"})
        });
    } catch (error) {
        console.log(error);
    }
});

//GET REQUEST
router.get("/getBooks" , async (req,res) => {
    let books;
    try {
        books = await bookModel.find();
        res.status(200).json({books});
    } catch (error) {
        console.log(error);
    }
})


//GET REQUEST BY ID
router.get("/getBooks/:id" , async (req,res) => {
    let book;
    const id = req.params.id
    
    try {
       book = await bookModel.findById(id);
       res.status(200).json({book});
    } catch (error) {
        console.log(error);
    }
})


//UPDATE BOOKS BY ID
router.put("/updateBook/:id",async (req,res)=>{
    const id = req.params.id;
    const {bookname , description , author , image , price } = req.body;
    let book;
    try {
       book = await bookModel.findByIdAndUpdate(id , {
            bookname , 
            description , 
            author , 
            image , 
            price 
        });
        await book.save().then(() => res.json({message:"data updated"}))
        
    } catch (error) {
       console.log(error); 
    }


})


//DELETE BOOK BY ID
router.delete("/deleteBook/:id" , async (req,res) => {
    const id = req.params.id;
    try {
        await bookModel
        .findByIdAndDelete(id)
        .then(() => res.status(204).json({message:"deleted successfully"}));
    } catch (error) {
        console.log(error);
    }
})


module.exports = router;
