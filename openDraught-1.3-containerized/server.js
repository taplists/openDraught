require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const session = require('express-session');
//const bcrypt = require('bcrypt');
var bcrypt = require('bcryptjs')

const app = express();
const PORT = 3000;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const SESSION_SECRET = process.env.SESSION_SECRET;
const BEERS_FILE_PATH = path.join(__dirname, 'public', 'beers.json');
const COLORS_FILE_PATH = path.join(__dirname, 'public', 'colors.json');

// Debugging logs to check if environment variables are loaded correctly
console.log('Admin Password:', ADMIN_PASSWORD ? 'Loaded' : 'Not loaded');
console.log('Session Secret:', SESSION_SECRET ? 'Loaded' : 'Not loaded');

if (!ADMIN_PASSWORD || !SESSION_SECRET) {
  throw new Error('Environment variables ADMIN_PASSWORD and SESSION_SECRET must be set');
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  secret: SESSION_SECRET, // Secure random string from .env file
  resave: false,
  saveUninitialized: false, // Change to false to prevent empty sessions
  cookie: { secure: false } // Set to true if using HTTPS
}));

app.set('trust proxy', true); // Enable this if behind a proxy

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

// Store the salted and hashed password
let adminHashedPassword;
bcrypt.hash(ADMIN_PASSWORD, 10).then((hashedPassword) => {
  adminHashedPassword = hashedPassword;
  console.log('Admin password hashed successfully');
}).catch(err => {
  console.error('Error hashing password:', err);
  process.exit(1); // Exit if hashing fails
});

// Root route handler to serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Login route handler
app.post('/login', (req, res) => {
  const password = req.body.password;
  if (!adminHashedPassword) {
    return res.status(500).send('Server not ready, please try again later');
  }
  bcrypt.compare(password, adminHashedPassword).then((isMatch) => {
    if (isMatch) {
      req.session.loggedIn = true;
      console.log(`Login successful from IP: ${req.ip}, redirecting to admin.html`);
      res.redirect('/admin.html');
    } else {
      console.log(`Invalid username or password from IP: ${req.ip}`);
      res.status(401).send('Invalid username or password');
    }
  }).catch((err) => {
    console.error('Error comparing password:', err);
    res.status(500).send('Internal server error');
  });
});

// Protect specific routes with isAuthenticated middleware
app.get('/admin.html', isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

app.get('/color-admin.html', isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'color-admin.html'));
});

// Data routes should be unprotected if they need to be publicly accessible
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

app.post('/update-banner', isAuthenticated, (req, res) => {
  const { bannerImage } = req.body;
  const INDEX_FILE_PATH = path.join(__dirname, 'public', 'index.html');
  
  fs.readFile(INDEX_FILE_PATH, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading index file');
      return;
    }

    const updatedData = data.replace(/<img src="[^"]*" alt="Business Name" id="business-name">/, `<img src="${bannerImage}" alt="Business Name" id="business-name">`);

    fs.writeFile(INDEX_FILE_PATH, updatedData, 'utf8', (err) => {
      if (err) {
        res.status(500).send('Error updating index file');
      } else {
        res.send('Banner image updated successfully');
      }
    });
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
