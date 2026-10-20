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