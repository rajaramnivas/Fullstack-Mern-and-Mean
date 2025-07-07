const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const exphbs = require('express-handlebars');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

// View Engine Setup
app.engine('hbs', exphbs.engine({ extname: '.hbs', defaultLayout: 'main', layoutsDir: path.join(__dirname, 'views', 'layouts') }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.get('/', (req, res) => {
    res.render('form');
});

app.post('/submit', (req, res) => {
    const newUser = req.body;

    const filePath = path.join(__dirname, 'data', 'users.json');

    // Read existing data and append new entry
    let users = [];
    if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath);
        users = JSON.parse(data);
    }

    users.push(newUser);

    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

    res.redirect('/users');
});

app.get('/users', (req, res) => {
    const filePath = path.join(__dirname, 'data', 'users.json');
    let users = [];

    if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath);
        users = JSON.parse(data);
    }

    res.render('users', { users });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
