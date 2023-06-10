const express = require('express');

const app = express();

const PORT = process.env.PORT || 3001;

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

// Middleware to serve up static assets from the public folder
app.use(express.static('public'));

// Routes
app.use('/api/notes', require('./routes/apiRoutes'));

app.use('/', require('./routes/htmlRoutes'));

app.listen(PORT, () =>
    console.log(`App listening at http:localhost:${PORT}`)
);

