const Book = require("../model/Book");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/user');
const getAllBooks = async(req,res,next)=>{
    let books;
    try{

      books = await Book.find();
    }catch(err){
        console.log(err);
    }
    if(!books){
        return res.status(404).json({message:"No products available"});
    }
    return res.status(200).json({books});

};

const getById = async(req,res,next)=>{
    const id = req.params.id
    let book;
    try{
        book = await Book.findById(id);
    }catch(err){
        console.log(err);
    }
    if(!book){
        return res.status(500).json({message:"No Books available "})
    }
    return res.status(201).json({book});


};

const addbook =async(req,res,next)=>{
    const {name,author,description,price,available,image}= req.body;
    let book;
    try{
        book=new Book({
            name,
            author,
            description,
            price,
            available,
            image,
            
           

        });
        await book.save();

    }catch(err){
        console.log(err);
    }
    if(!book){
        return res.status(500).json({message:"unable to add "})
    }
    return res.status(201).json({book});
};

const updateBook = async (req,res,next) => {
    const id = req.params.id;
    const {name,author,description,price,available,image}= req.body;
    let book;
    try{
        book=await Book.findByIdAndUpdate(id,{
            name,
            author,
            description,
            price,
            available,
            image,
        });
        book = await book.save()

    }catch(err){
        console.log(err);
    }
    if(!book){
        return res.status(500).json({message:"unable to update by this id "})
    }
    return res.status(201).json({book});


};

const deleteBook = async(req,res,next)=>{
    const id = req.params.id;
    let book;
    try{
        book = await Book.findByIdAndDelete(id);
    }catch(err){
        console.log(err);

    }

    if(!book){
        return res.status(404).json({message:"unable to delete by this id "})
    }
    return res.status(200).json({message:"product successfully deleted"});


    

};
const login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
exports.getAllBooks = getAllBooks;
exports.addbook=addbook;
exports.getById=getById;
exports.updateBook=updateBook;
exports.deleteBook=deleteBook;
exports.login=login;
