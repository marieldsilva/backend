import * as bookModel from '../models/bookModel.js';

// Retrieve
export const fetchAllBooks = async () =>{
    const books = await bookModel.fetch();
    return books;
}

const doesBookExist = async(book) =>{
    const existing = await bookModel.findBookByNameAndAuthor(book.name, book.author);

    if(existing.length > 0) {
        return true;
    }

    return false;
}

// Insert
export const createBook = async(book) =>{
    if(!book.name || !book.author){
        throw new Error('Name and author is required!');
    }

    const existing = await doesBookExist(book);

    if(existing){
        throw new Error('Book already exists!');
    }
    
    const bookId = await bookModel.insert(book);
    return bookId;
}

// Update
export const updateBook = async (book) => {
    const updatedBook = await bookModel.update(book);
    return updatedBook;
}

// Delete
export const deleteBook = async(id) =>{
    const deletedBook = await bookModel.remove(id);
    return deletedBook;
}