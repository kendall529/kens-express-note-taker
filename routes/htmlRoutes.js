const path = require('path');
const router = require('express').Router();

// route GET for the notes page
router.get('/notes', (req, res) => 
res.sendFile(path.join(__dirname, '../public/notes.html'))
);

// route GET route for homepage
router.get('*', (req, res) => 
    res.sendFile(path.join(__dirname, '../public/index.html'))   
);

// Export router
module.exports = router;