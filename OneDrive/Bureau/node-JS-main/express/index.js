const express = require("express");
const app = express(); // Correctly call express as a function
const port = 3000;

// Custom middleware to verify working hours
const checkWorkingHours = (req, res, next) => {
    const date = new Date();
    const dayOfWeek = date.getDay(); // 0 (Sunday) to 6 (Saturday)
    const hour = date.getHours();

    if (dayOfWeek >= 1 && dayOfWeek <= 5 && hour >= 9 && hour < 17) {
        // Request falls within working hours
        next();
    } else {
        // Request falls outside working hours
        res.send('This web application is only available during working hours (Monday to Friday, from 9:00 to 17:00).');
    }
};

// Middleware to check working hours for all routes
app.use(checkWorkingHours);

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Define routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/home.html');
});

app.get('/services', (req, res) => {
    res.sendFile(__dirname + '/public/services.html');
});

app.get('/contact', (req, res) => {
    res.sendFile(__dirname + '/public/contact.html');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
