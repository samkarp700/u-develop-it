const mysql = require('mysql2');
const express = require('express');
const PORT = process.env.PORT || 3002;
const app = express();
//express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// connect to the database
const db = mysql.createConnection(
    {
        host: 'localhost', 
        //Your MySql username,
        user: 'root', 
        // Your MySql password
        password: '', 
        database: 'election'
    }, 
    console.log('Connected to the election database.')
);



// GET a single candidate
db.query(`SELECT * FROM candidates WHERE id =1`, (err, rows) => {
    if (err) {
        console.log(err);
    }
    console.log(rows);
});

// db.query(`SELECT * FROM candidates`, (err, rows) => {
//     console.log(rows);
// });

// Delete a candidate
db.query(`DELETE FROM candidates WHERE id = ?`, 1, (err, result) => {
    if (err) {
        console.log(err);
    }
    console.log(result);
});

//Create a candidate
const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected)
            values (?,?,?,?)`;
const params = [1, 'Ronald', 'Firbank', 1];

db.query(sql, params, (err, result) => {
    if (err) {
        console.log(err);
    }
    console.log(result);
});


//Default response for any other request(Not Found)
app.use((req, res) => {
    res.status(404).end();
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});