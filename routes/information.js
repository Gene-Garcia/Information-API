const express = require("express");
const router = express.Router();

const h = require("../utils/helper");

// database
const mongoose = require("mongoose");
const Information = mongoose.model("Information");

// router handler for '/information/'

// Get all information
router.get("/", (req, res) => {
  Information.find({}, (err, docs) => {
    if (err) res.status(500).send(err);
    else res.status(201).send(docs);
  });
});

// Get information with :title
router.get("/title/:title", (req, res) => {
  const title = req.params.title;

  if (h.isEmpty(title)) res.status(500).send("Empty url parameter");
  else {
    // the regex 'i' indicates to ignore the case, and then we used $regex to have mongoose understand the regex expression
    Information.find(
      { title: { $regex: new RegExp(title, "i") } },
      (err, doc) => {
        if (err) res.status(500).send(err);
        else {
          if (doc === undefined || doc === null)
            res.status(404).send("No data found with title: " + title);
          else res.status(201).send(doc);
        }
      }
    );
  }
});
// Get information that has the :keyword
router.get("/keyword/:keyword", (req, res) => {
  const keyword = req.params.keyword;

  if (h.isEmpty(keyword)) res.status(300).send("Empty url parameter");
  else {
    // the regex 'i' indicates to ignore the case, and then we used $regex to have mongoose understand the regex expression
    Information.find(
      { keywords: { $regex: new RegExp(keyword, "i") } },
      (err, doc) => {
        if (err) res.status(500).send(err);
        else {
          if (doc === undefined || doc === null || doc.length <= 0)
            res.status(404).send("No data found with keyword: " + keyword);
          else res.status(201).send(doc);
        }
      }
    );
  }
});
// Get information with :title and that has the :keyword
router.get("/title/:title/keyword/:keyword", (req, res) => {
  const title = req.params.title;
  const keyword = req.params.keyword;

  if (h.isEmpty(title) || h.isEmpty(keyword))
    res.status(500).send("Empty url parameter");
  else {
    Information.find(
      {
        title: { $regex: new RegExp(title, "i") },
        keywords: { $regex: new RegExp(keyword, "i") },
      },
      (err, docs) => {
        if (err) res.status(500).send(err);
        else {
          if (docs === null || docs === undefined)
            res.status(500).send("Something went wrong");
          else {
            if (docs.length <= 0)
              res
                .status(404)
                .send(
                  "Not data found with title: " +
                    title +
                    " and keyword: " +
                    keyword
                );
            else res.status(201).send(docs);
          }
        }
      }
    );
  }
});

// Update information with :title
router.put("/title/:title", (req, res) => {
  const titleParam = req.params.title;

  if (h.isEmpty(titleParam)) res.send(404).send("Empty url parameter");
  // COMMENTED THIS BECAUSE IT DEFEATS THE PURPOSE OF PUT, WHICH IS TO REPLACE THE COLLECTION WITH NEW SCHEMA OF DATA
  // else if (h.isEmpty(title) || h.isEmpty(description) || h.isEmpty(rawKeywords)){
  //     res.status(404).send('Incomplete data. Title, description and keywords are required.s');
  // }
  else {
    // parse rawKeywords into an array
    if ("keywords" in req.body) {
      req.body.keywords = req.body.keywords.split(",");
    }

    Information.replaceOne(
      { title: { $regex: new RegExp(titleParam, "i") } },
      req.body,
      { overwrite: true },
      (err, result) => {
        console.log(err);
        if (err) {
          res.status(500).send(err);
        } else {
          if (result.n <= 0) res.status(404).send("No information was updated");
          else res.status(201).send("Information succesfully updated");
        }
      }
    );
  }
});
router.patch("/title/:title", (req, res) => {
  const titleParam = req.params.title;

  if (h.isEmpty(titleParam)) res.status(300).send("Empty url parameter");
  else {
    // manually check if keywords is gonna be changed
    // if it is there, then we replace the value with an array from splitting the old value
    if ("keywords" in req.body) {
      req.body.keywords = req.body.keywords.split(",");
    }

    Information.updateMany(
      { title: { $regex: new RegExp(titleParam, "i") } },
      { $set: req.body },
      (err, result) => {
        if (err) {
          res.status(500).send(err);
        } else {
          if (result.n <= 0) res.status(404).send("No information was updated");
          else res.status(201).send("Information was updated");
        }
      }
    );
  }
});

// would we implement deletes?
router.delete("/title/:title", (req, res) => {
  const title = req.params.title;

  if (h.isEmpty(title)) res.status(404).send("Empty url parameter");
  else {
    Information.deleteOne(
      { title: { $regex: new RegExp(title, "i") } },
      (err, result) => {
        if (result.n <= 0) res.status(404).send("No information was deleted");
        else res.status(204).send();
      }
    );
  }
});

router.delete("/", (req, res) => {
  Information.deleteMany((err, result) => {
    if (err) res.status(500).send(err);
    else {
      if (result.n <= 0) res.status(404).send("No information was deleted");
      else res.status(204).send();
    }
  });
});

// Post new information
router.post("/", (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const rawKeywords = req.body.keywords;

  if (h.isEmpty(title) || h.isEmpty(description) || h.isEmpty(rawKeywords)) {
    res.status(404).send("Incomplete post data.");
  } else {
    // parse rawKeywoards into an array
    // DELIMETER is ','
    const keywords = rawKeywords.split(",");

    const info = new Information({
      title: title,
      description: description,
      keywords: keywords,
      date: Date.now(),
    });
    info.save((err) => {
      if (err) res.status(500).send(err);
      else res.status(201).send(info);
    });
  }
});

module.exports = router;
