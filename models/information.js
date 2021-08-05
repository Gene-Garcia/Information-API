const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const informationSchema = new Schema({
  title: {
    type: String,
    required: "Where is the title of the information?",
    trim: true,
  },
  date: {
    type: Date,
    required: "What is the date today?",
  },
  description: {
    type: String,
    required: "What is the meaning of this information?",
    trim: true,
  },
  keywords: [
    {
      type: String,
      required: "Keywords are key to having this information indexed",
      trim: true,
    },
  ],
});

// exports.Information = new mongoose.model('Information', informationScheme);

// we did not use exports because the code below will record the 'Information' model
// within the mongoose of the application
// Instantiating the mongoose connection is global to the application.
// Only one instance through the whole runtime
mongoose.model("Information", informationSchema);
