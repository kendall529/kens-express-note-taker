const router = require('express').Router();

// Import files for routes
const noteRoutes = require('./notes');

router.use('/notes', noteRoutes);

// Export router
module.exports = router;