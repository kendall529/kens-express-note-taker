const path = require('path');
const router = require('express').Router();

// Import files for routes
const apiRoutes = require('./api');

// route GET route for homepage
router.get('/', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))   
);

// route GET for the notes page
router.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

router.use('/api', apiRoutes);

// Export router
module.exports = router;