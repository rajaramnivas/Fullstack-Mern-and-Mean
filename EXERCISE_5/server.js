const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

const FILE_PATH = path.join(__dirname, 'todos.json');

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Get todos
app.get('/getTodos', (req, res) => {
    fs.readFile(FILE_PATH, 'utf8', (err, data) => {
        if (err) {
            return res.json([]);
        }
        try {
            const todos = JSON.parse(data);
            res.json(todos);
        } catch (e) {
            res.json([]);
        }
    });
});

// Save todos
app.post('/saveTodos', (req, res) => {
    fs.writeFile(FILE_PATH, JSON.stringify(req.body, null, 2), (err) => {
        if (err) {
            return res.status(500).send('Failed to save');
        }
        res.send('Saved successfully');
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
