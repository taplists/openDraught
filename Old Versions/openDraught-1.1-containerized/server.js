const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const session = require('express-session');
const os = require('os');

const app = express();
const PORT = 3000;
const ADMIN_PASSWORD = 'your_secure_password'; // Replace with your actual secure password
const BEERS_FILE_PATH = path.join(__dirname, 'public', 'beers.json');
const COLORS_FILE_PATH = path.join(__dirname, 'public', 'colors.json');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
    secret: 's2K7m1!xY9t#Vw$3b4E%Fg@8RkLpQ', // Secure random string
    resave: false,
    saveUninitialized: true
}));

// Middleware to check if user is logged in
const isAuthenticated = (req, res, next) => {
    if (req.session.loggedIn) {
        next();
    } else {
        res.redirect('/login.html');
    }
};

// Serve static files from public directory, but protect admin.html and color-admin.html
app.use((req, res, next) => {
    if (req.path === '/admin.html' || req.path === '/color-admin.html') {
        isAuthenticated(req, res, next);
    } else {
        next();
    }
});

app.use(express.static(path.join(__dirname, 'public')));

app.post('/login', (req, res) => {
    const { password } = req.body;
    if (password === ADMIN_PASSWORD) {
        req.session.loggedIn = true;
        res.redirect('/admin.html');
    } else {
        res.send('Incorrect password');
    }
});

app.get('/admin.html', isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

app.get('/color-admin.html', isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'color-admin.html'));
});

app.get('/beers', (req, res) => {
    fs.readFile(BEERS_FILE_PATH, (err, data) => {
        if (err) {
            res.status(500).send('Error reading beers file');
        } else {
            res.json(JSON.parse(data));
        }
    });
});

app.post('/save-beers', isAuthenticated, (req, res) => {
    const updatedBeers = req.body;
    fs.writeFile(BEERS_FILE_PATH, JSON.stringify(updatedBeers, null, 2), (err) => {
        if (err) {
            res.status(500).send('Failed to save beers');
        } else {
            res.send('Beers saved successfully');
        }
    });
});

app.get('/colors', (req, res) => {
    fs.readFile(COLORS_FILE_PATH, (err, data) => {
        if (err) {
            res.status(500).send('Error reading colors file');
        } else {
            res.json(JSON.parse(data));
        }
    });
});

app.post('/save-colors', isAuthenticated, (req, res) => {
    const updatedColors = req.body;
    fs.writeFile(COLORS_FILE_PATH, JSON.stringify(updatedColors, null, 2), (err) => {
        if (err) {
            res.status(500).send('Failed to save colors');
        } else {
            res.send('Colors saved successfully');
        }
    });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
