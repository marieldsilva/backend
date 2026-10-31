import pool from '../config/db.js'

// Retrieve
export const fetch = async () => {
    const [rows] = await pool.query("SELECT * FROM student");
    return rows;
};

// Insert
export const insert = async (student) =>{
    const [result] = await pool.query(
        "INSERT INTO student(name, srCode, program) VALUES (?, ?, ?)",
        [student.name, student.srCode, student.program]
    );

    return result.insertId;
}

// Update
export const update = async (student) => {
    const [result] = await pool.query (
        "UPDATE student SET name= ?, srCode= ?, program= ? WHERE id= ? ",
        [student.name, student.srCode, student.program, student.id]
    );
    return result.affectedRows;
}

// Delete
export const remove = async (id) => {
    const [result] = await pool.query (
        "DELETE FROM student WHERE id= ? ", [id]
    );
    return result.affectedRows
}