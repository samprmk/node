const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const port = 3000;
// Middleware
app.use(express.json());
app.use(cors()); // Enable cross-origin requests from the frontend
// MySQL connection
const db = mysql.createConnection({
host: 'localhost',
user: 'root',
password: 'root', // Your MySQL root password
database: 'testdb1' // Your MySQL database name
});
// Connect to MySQL
db.connect(function(err) {
if (err) {
console.log('Error connecting to MySQL:', err);
return;
}
console.log('Connected to MySQL');
});
// Add a new user
app.post('/users', function(req, res) {
const { name, email } = req.body;
const query = 'INSERT INTO users (name, email) VALUES (?, ?)';
db.query(query, [name, email], function(err) {
if (err) {
console.log('Error inserting user:', err);
res.status(500).send('Error inserting user');
} else {
res.send('User added successfully');
}
});
});
// Get all users
app.get('/users', function(req, res) {
const query = 'SELECT * FROM users';
db.query(query, function(err, results) {
if (err) {
console.log('Error retrieving users:', err);
res.status(500).send('Error retrieving users');
} else {
res.json(results);
}
});
});
// Update a user
app.put('/users/:id', function(req, res) {
const { id } = req.params;
const { name, email } = req.body;
const query = 'UPDATE users SET name = ?, email = ? WHERE id = ?';
db.query(query, [name, email, id], function(err) {
if (err) {
console.log('Error updating user:', err);
res.status(500).send('Error updating user');
} else {
res.send('User updated successfully');
}
});
});
// Delete a user
app.delete('/users/:id', function(req, res) {
const { id } = req.params;
const query = 'DELETE FROM users WHERE id = ?';
db.query(query, [id], function(err) {
if (err) {
console.log('Error deleting user:', err);
res.status(500).send('Error deleting user');
} else {
res.send('User deleted successfully');
}
});
});
// Start the server
app.listen(port, function() {
console.log(`Server running on http://localhost:${port}`);
});