const express = require('express')
const router = express.Router();

// database
const mongoose = require('mongoose');
const Information = mongoose.model('Information');

// router handler for '/information/'

// Get all information
router.get('/', (req, res) => {
    Information.find({}, (err, docs) => {
        if (err) res.send('Error');
        else res.send(docs);
    })
});

// Get information with :title
// router.get('/:title');

// Get information that has the :keyword
// router.get('/:keyword');

// Post new information
// router.post('/');

// Update information with :title
// router.put('/:title');
// router.patch('/:title');

// would we implement deletes?

module.exports = router;