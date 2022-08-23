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




db.query(`SELECT * FROM candidates`, (err, rows) => {
    console.log(rows);
});


//Default response for any other request(Not Found)
app.use((req, res) => {
    res.status(404).end();
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});