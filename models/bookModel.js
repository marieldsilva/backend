import pool from '../config/db.js'

// Retrieve
export const fetch = async () => {
    const [rows] = await pool.query("SELECT * FROM book");
    return rows;
};

export const findBookByNameAndAuthor = async (name, author) =>{
    const [rows] = await pool.query("SELECT * FROM book WHERE name = ? AND author = ?",
        [name, author]
    );
    return rows;
}

// Insert
export const insert = async (book) =>{
    const [result] = await pool.query(
        "INSERT INTO book(name, author) VALUES (?, ?)",
        [book.name, book.author]
    );

    return result.insertId;
}

// Update
export const update = async (book) => {
    const [result] = await pool.query (
        "UPDATE book SET name= ?, author= ? WHERE id= ? ",
        [book.name, book.author, book.id]
    );
    return result.affectedRows;
}

// Delete
export const remove = async (id) => {
    const [result] = await pool.query (
        "DELETE FROM book WHERE id= ? ", [id]
    );
    return result.affectedRows
}