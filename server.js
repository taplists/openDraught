const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const session = require('express-session');
const os = require('os');
const { google } = require('googleapis');
const credentials = require('./credentials.json'); // Ensure this is the correct path

const app = express();
const PORT = 3000;
const ADMIN_PASSWORD = 'your_stupid_password'; // Replace with your actual password
const BEERS_FILE_PATH = path.join(__dirname, 'public', 'beers.json');
const COLORS_FILE_PATH = path.join(__dirname, 'public', 'colors.json');
const DOC_ID = 'GOOGLE DOC ID GOES HERE'; // Your Google Doc ID

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
    secret: ';01zNgX94%zHwIaLs&?IQ7R]m>c/xS', // Secure random string
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

app.get('/ip', (req, res) => {
    const networkInterfaces = os.networkInterfaces();
    let localIp = '';
    for (const interfaceName in networkInterfaces) {
        const interfaces = networkInterfaces[interfaceName];
        for (const i of interfaces) {
            if (i.family === 'IPv4' && !i.internal) {
                localIp = i.address;
                break;
            }
        }
    }
    res.json({ ip: localIp });
});

// Send the local IP address to Google Docs
async function sendIpToGoogleDocs() {
    const networkInterfaces = os.networkInterfaces();
    let localIp = '';
    for (const interfaceName in networkInterfaces) {
        const interfaces = networkInterfaces[interfaceName];
        for (const i of interfaces) {
            if (i.family === 'IPv4' && !i.internal) {
                localIp = i.address;
                break;
            }
        }
    }

    const auth = new google.auth.GoogleAuth({
        keyFile: path.join(__dirname, 'credentials.json'), // Replace with your credentials file path
        scopes: ['https://www.googleapis.com/auth/documents']
    });

    const docs = google.docs({ version: 'v1', auth });

    // Get the current time in CST
    const now = new Date();
    const cstOffset = -6; // CST is UTC-6
    const cstTime = new Date(now.getTime() + cstOffset * 60 * 60 * 1000);
    const formattedCstTime = cstTime.toISOString().replace('T', ' ').replace(/\..+/, '') + ' CST';

    const url = `http://${localIp}:3000/admin.html`;
    const textToInsert = `Click to edit taplist\nTimestamp: ${formattedCstTime}\n\n`;

    try {
        // Get the document to determine its end index
        const doc = await docs.documents.get({ documentId: DOC_ID });
        const endIndex = doc.data.body.content.reduce((maxIndex, element) => {
            return element.endIndex > maxIndex ? element.endIndex : maxIndex;
        }, 1);

        // Adjust the endIndex to exclude the newline character
        const adjustedEndIndex = endIndex - 1;

        // Clear existing content
        await docs.documents.batchUpdate({
            documentId: DOC_ID,
            requestBody: {
                requests: [
                    {
                        deleteContentRange: {
                            range: {
                                startIndex: 1,
                                endIndex: adjustedEndIndex,
                            },
                        },
                    },
                ],
            },
        });

        // Insert new content
        const response = await docs.documents.batchUpdate({
            documentId: DOC_ID,
            requestBody: {
                requests: [
                    {
                        insertText: {
                            location: {
                                index: 1,
                            },
                            text: textToInsert,
                        },
                    },
                    {
                        updateTextStyle: {
                            range: {
                                startIndex: 1,
                                endIndex: 22, // Adjust this range to match the length of "Click to edit taplist" (21 characters + 1 to cover the full length)
                            },
                            textStyle: {
                                link: {
                                    url: url,
                                },
                                fontSize: {
                                    magnitude: 32, // Twice the original font size (16 * 2)
                                    unit: 'PT',
                                },
                            },
                            fields: 'link,fontSize',
                        },
                    },
                ],
            },
        });
        console.log('IP address sent to Google Docs successfully:', response.data);
    } catch (error) {
        console.error('Failed to send IP address to Google Docs:', error);
    }
}

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    sendIpToGoogleDocs(); // Send IP address at startup
    setInterval(sendIpToGoogleDocs, 3600000); // Send IP address every hour
});
