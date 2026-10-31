import * as bookModel from '../models/bookModel.js';

// Retrieve
export const fetchAllBooks = async () =>{
    const books = await bookModel.fetch();
    return books;
}

// Insert
export const createBook = async(book) =>{
    const bookId = await bookModel.insert(book);
    return bookId;
}

// Update
export const updateBook = async (book) => {
    const updatedBook = await bookModel.update(book);
    return updatedBook;
}