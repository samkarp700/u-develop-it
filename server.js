const mysql = require('mysql2');
const express = require('express');
const PORT = process.env.PORT || 3002;
const app = express();
//express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const inputCheck = require('./utils/inputCheck');

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

//get all candidates
//route designated with endpoint api/candidates (url signifies this as an api endpoint)
app.get('/api/candidates', (req, res) => {
    const sql = `SELECT * FROM candidates`;

    db.query(sql, (err, rows) => {
        if (err) {
            //place the error message in a JSON object
            res.status(500).json({ error: err.message });
            //exits the database call once error is encountered
            return;
        }
        //if no error, response is sent to next statement:
        res.json({
            message: 'Success', 
            data: rows
        });
    });
});

// GET a single candidate
//api endpoint includes value of id to specify which candidate selecting from db
app.get('/api/candidate/:id', (req, res) => {
    const sql = `SELECT * FROM candidates WHERE id = ?`;
    const params = [req.params.id];

db.query(sql, params, (err, row) => {
    if (err) {
        res.status(400).json({ error: err.message });
        return;
    }
    res.json({
        message: 'Success', 
        data: row
    });
});
});



// Delete a candidate
//http request method delete()
app.delete('/api/candidate/:id', (req, res) => {
    const sql = `DELETE FROM candidates WHERE id = ?`;
    const params = [req.params.id];

db.query(sql, params, (err, result) => {
    if (err) {
        res.statusMessage(400).json({ error: res.message });
    } else if (!result.affectedRows) {
        res.json({
            message: 'Candidate not found'
        });
    } else {
        res.json({
            message: 'deleted', 
            changes: result.affectedRows, 
            id: req.params.id
        });
    }
    
});
});

//Create a candidate
//uses the http request method post() using endpoint /api/candidate
                            //using object destructuring to pull body property out
app.post('/api/candidate', ({ body }, res) => {
    //assign errors to receive the return from inputCheck function
    const errors = inputCheck(body, 'first_name', 'last_name', 'industry_connected');
    //validate user data before the changes are inserted into the database
    if (errors) {
        res.status(400).json({ error: errors });
        return;
    }


    const sql = `INSERT INTO candidates (first_name, last_name, industry_connected)
    VALUES (?,?,?)`;
    const params = [body.first_name, body.last_name, body.industry_connected];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success', 
            data: body
        });
    });
});


//Default response for any other request(Not Found)
app.use((req, res) => {
    res.status(404).end();
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});