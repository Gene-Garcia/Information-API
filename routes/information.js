const express = require('express')
const router = express.Router();

const h = require('../utils/helper');

// database
const mongoose = require('mongoose');
const Information = mongoose.model('Information');

// router handler for '/information/'

// Get all information
router.get('/', (req, res) => {
    Information.find({}, (err, docs) => {
        if (err) res.send(err);
        else res.send(docs);
    })
});

// Get information with :title
// router.get('/:title');

// Get information that has the :keyword
// router.get('/:keyword');

// Post new information
router.post('/', (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const rawKeywords = req.body.keywords;

    if (h.isEmpty(title) || h.isEmpty(description) || h.isEmpty(rawKeywords)){
        res.json({status: 300, message: "Incomplete post data."});
    } else {

        // parse rawKeywoards into an array
        // DELIMETER is ','
        const keywords = rawKeywords.split(',');

        const info = new Information({
            title: title,
            description: description,
            keywords: keywords,
            date: Date.now()
        });
        info.save((err) => {
            
            if (err) res.json({status: 300, message: "Incomplete post data.", err: err});
            else res.json({status: 200, message: "Successful information creation to our server.", document: info});
        });

    }

});

// Update information with :title
// router.put('/:title');
// router.patch('/:title');

// would we implement deletes?
router.delete('/', (req, res) => {
    Information.deleteMany((err, data) => {

        if (err) res.json({status: 300, err: err});
        else {
            if (data.n <= 0) res.json({status: 200, message: 'No information was deleted', count: data.n});
            else res.json({status: 200, message: 'All information was deleted', count: data.n});
        }
        
    });
});

module.exports = router;