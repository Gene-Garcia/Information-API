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
router.get('/title/:title', (req, res) => {
    const title = req.params.title;

    if (h.isEmpty(title)) res.json({status: 300, message: 'Empty url parameter'});
    else {

        // the regex 'i' indicates to ignore the case, and then we used $regex to have mongoose understand the regex expression
        Information.findOne({title: { $regex : new RegExp(title, "i") }}, (err, doc) => {
            if (err) res.json({status: 300, message: "Invalid search request.", err: err});
            else {
                res.json({status: 200, message:'Information found', document: doc});
            }
        });

    }
});

// Update information with :title
router.put('/title/:title', (req, res) => {
    const titleParam = req.params.title;

    const title = req.body.title;
    const description = req.body.description;
    const rawKeywords = req.body.keywords;

    if (h.isEmpty(titleParam)) res.json({status: 300, message: 'Empty url parameter'});
    else if (h.isEmpty(title) || h.isEmpty(description) || h.isEmpty(rawKeywords)){
        res.json({status: 300, message: "Incomplete post data."});
    } else {

        // parse rawKeywords into an array
        const keywords = rawKeywords.split(',');

        Information.update({title: { $regex : new RegExp(titleParam, "i") }}, {
            title: title,
            description: description,
            keywords: keywords,
            date: Date.now()
        }, {overwrite: true},
        (err, result) => {
            if (err) {
                res.json({status: 300, message: "Invalid request.", err: err})
            } else {
                if (result.n <= 0) res.json({status: 200, message: 'No information was updated', count: result.n});
                else res.json({status: 200, message: 'Information was updated', count: result.n});

            }

        });

    }
});
router.patch('/title/:title', (req, res) => {
    const titleParam = req.params.title;

    if (h.isEmpty(titleParam)) res.json({status: 300, message: 'Empty url parameter'});
    else {

        // manually check if keywords is gonna be changed
        // if it is there, then we replace the value with an array from splitting the old value
        if ('keywords' in req.body) {
            req.body.keywords = req.body.keywords.split(',');
        }

        Information.updateMany({title: { $regex : new RegExp(titleParam, "i") }}, { $set: req.body}, 
            (err, result) => {
                if (err) {
                    res.json({status: 300, message: "Invalid request.", err: err})
                } else {
                    if (result.n <= 0) res.json({status: 200, message: 'No information was updated', count: result.n});
                    else res.json({status: 200, message: 'Information was updated', count: result.n});
                }

            });
    }
});

// would we implement deletes?
router.delete('/title/:title', (req, res) => {
    const title = req.params.title;

    if (h.isEmpty(title)) res.json({status: 300, message: 'Empty url parameter'});
    else {
        Information.deleteOne({title: { $regex : new RegExp(title, "i") }}, (err, result) =>{
            console.log(err);
            console.log(result);

            if (result.n <= 0) res.json({status: 200, message: 'No information was deleted', count: result.n});
            else res.json({status: 200, message: 'The information was deleted', count: result.n});
            
        });
    }
});

router.delete('/', (req, res) => {
    Information.deleteMany((err, result) => {

        if (err) res.json({status: 300, err: err});
        else {
            if (result.n <= 0) res.json({status: 200, message: 'No information was deleted', count: result.n});
            else res.json({status: 200, message: 'All information was deleted', count: result.n});
        }
        
    });
});

// Get information that has the :keyword
router.get('/keyword/:keyword', (req, res) => {
    const keyword = req.params.keyword;

    if (h.isEmpty(keyword)) res.json({status: 300, message: 'Empty url parameter'});
    else {

        // the regex 'i' indicates to ignore the case, and then we used $regex to have mongoose understand the regex expression
        Information.find({keywords: { $regex : new RegExp(keyword, "i") }}, (err, doc) => {
            if (err) res.json({status: 300, message: "Invalid search request.", err: err});
            else {
                console.log(doc);
                res.json({status: 200, message:'Information found', document: doc});
            }
        });

    }
});

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
            
            if (err) res.json({status: 300, message: "Invalid request.", err: err});
            else res.json({status: 200, message: "Successful information creation to our server.", document: info});
        });

    }

});



module.exports = router;