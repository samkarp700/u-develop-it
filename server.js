
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const db = require('./db/connection');
const apiRoutes = require('./routes/apiRoutes');
//express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api', apiRoutes);

// const inputCheck = require('./utils/inputCheck');

//Default response for any other request(Not Found)
app.use((req, res) => {
    res.status(404).end();
});

//start server after DB connection
db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
});


//get all candidates
//route designated with endpoint api/candidates (url signifies this as an api endpoint)
// app.get('/api/candidates', (req, res) => {
//     const sql = `SELECT candidates.*, parties.name
//     AS party_name
//     FROM candidates
//     LEFT JOIN parties
//     ON candidates.party_id = parties.id`;

//     db.query(sql, (err, rows) => {
//         if (err) {
//             //place the error message in a JSON object
//             res.status(500).json({ error: err.message });
//             //exits the database call once error is encountered
//             return;
//         }
//         //if no error, response is sent to next statement:
//         res.json({
//             message: 'Success', 
//             data: rows
//         });
//     });
// });

// // GET a single candidate
// //api endpoint includes value of id to specify which candidate selecting from db
// app.get('/api/candidate/:id', (req, res) => {
//     const sql = `SELECT candidates.*, parties.name
//     AS party_name
//     FROM candidates
//     LEFT JOIN parties
//     ON candidates.party_id = parties.id
//     WHERE candidates.id = ?`;
//     const params = [req.params.id];

// db.query(sql, params, (err, row) => {
//     if (err) {
//         res.status(400).json({ error: err.message });
//         return;
//     }
//     res.json({
//         message: 'Success', 
//         data: row
//     });
// });
// });

// //Create a candidate
// //uses the http request method post() using endpoint /api/candidate
//                             //using object destructuring to pull body property out
//                             app.post('/api/candidate', ({ body }, res) => {
//                                 //assign errors to receive the return from inputCheck function
//                                 const errors = inputCheck(body, 'first_name', 'last_name', 'industry_connected');
//                                 //validate user data before the changes are inserted into the database
//                                 if (errors) {
//                                     res.status(400).json({ error: errors });
//                                     return;
//                                 }
                            
                            
//                                 const sql = `INSERT INTO candidates (first_name, last_name, industry_connected)
//                                 VALUES (?,?,?)`;
//                                 const params = [body.first_name, body.last_name, body.industry_connected];
                            
//                                 db.query(sql, params, (err, result) => {
//                                     if (err) {
//                                         res.status(400).json({ error: err.message });
//                                         return;
//                                     }
//                                     res.json({
//                                         message: 'success', 
//                                         data: body
//                                     });
//                                 });
//                             });

//Update a candidate's party
//forces any PUT request to /api/candidate/:id to include a party_id property
//even if the intention is to remove a party affiliatio by setting it to null, party_id is required
// app.put('/api/candidate/:id', (req, res) =>{
//     const errors = inputCheck(req.body, 'party_id');

//     if (errors) {
//         res.status(400).json({ error: errors });
//         return;
//     }
//     const sql = `UPDATE candidates SET party_id = ?
//     WHERE id = ?`;
//     const params = [req.body.party_id, req.params.id];
//     db.query(sql, params, (err, result) => {
//         if (err) {
//             res.status(400).json({ error: err.message });
//             //check if a record was found
//         } else if (!result.affectedRows) {
//             res.json({
//                 message: 'Candidate not found'
//             });
//         } else {
//             res.json({
//                 message: 'success', 
//                 data: req.body, 
//                 changes: result.affectedRows
//             });
//         }
//     });
// });



// // Delete a candidate
// //http request method delete()
// app.delete('/api/candidate/:id', (req, res) => {
//     const sql = `DELETE FROM candidates WHERE id = ?`;
//     const params = [req.params.id];

// db.query(sql, params, (err, result) => {
//     if (err) {
//         res.statusMessage(400).json({ error: res.message });
//     } else if (!result.affectedRows) {
//         res.json({
//             message: 'Candidate not found'
//         });
//     } else {
//         res.json({
//             message: 'deleted', 
//             changes: result.affectedRows, 
//             id: req.params.id
//         });
//     }
    
// });
// });

// //route to get all parties
// app.get('/api/parties', (req, res) => {
//     const sql = `SELECT * FROM parties`;
//     db.query(sql, (err, rows) => {
//         if (err) {
//             res.status(500).json({ error: err.message });
//             return;
//         }
//         res.json({
//             message: 'success', 
//             data: rows
//         });
//     });
// });

// //route that includes id parameter for single party
// app.get('/api/party/:id', (req, res) =>{
//     const sql = `SELECT * FROM parties WHERE id = ?`;
//     const params = [req.params.id];
//     db.query(sql, params, (err, row) => {
//         if (err) {
//             res.status(400).json({ error: err.message });
//             return;
//         }
//         res.json({
//             message: 'success', 
//             data: row 
//         });
//     });
// });



// app.delete('/api/party/:id', (req, res) => {
//     const sql = `DELETE FROM parties WHERE id = ?`;
//     const params = [req.params.id];
//     db.query(sql, params, (err, result) => {
//         if (err) {
//             res.status(400).json({ error: res.message });
//             //checks if anything was deleted
//         } else if (!result.affectedRows) {
//             res.json({
//                 message: 'Party not found'
//             });
//         } else {
//             res.json({
//                 message: 'deleted', 
//                 changes: result.affectedRows, 
//                 id: req.params.id 
//             });
//         }
//     });
// });


