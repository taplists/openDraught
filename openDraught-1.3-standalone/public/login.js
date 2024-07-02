const express = require('express');
const app = express();
const bcrypt = require('bcrypt');

// Store the hashed password
let adminHashedPassword = await bcrypt.hash('admin_password', 10);

app.get('/login', (req, res) => {
  let loginHTML = `
    <html>
      <body>
        <h1>Login</h1>
        <form action="/login" method="post">
          <label>Username:</label><br>
          <input type="text" name="username"><br>
          <label>Password:</label><br>
          <input type="password" name="password"><br>
          <input type="submit" value="Login">
        </form>
      </body>
    </html>
  `;
  res.send(loginHTML);
});

app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // Verify the user's credentials
  if (username === 'admin' && bcrypt.compare(password, adminHashedPassword)) {
    // Login successful!
    res.send('Welcome, Admin!');
  } else {
    // Invalid credentials
    res.status(401).send('Invalid username or password');
  }
});