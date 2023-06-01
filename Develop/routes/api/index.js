const router = require('express').Router();

// Import files for routes
const notesRouter = require('./notes');

router.use('/notes', notesRouter);

// Export router
module.exports = router;