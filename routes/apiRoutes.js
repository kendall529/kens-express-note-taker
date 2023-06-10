const router = require('express').Router();
const fs = require('fs');
const path = require('path');

// Function to create unique ids provided in course content
const uuid = require('../helpers/uuid');

let dbNotes = require('../db/notes.json');

// GET route for retrieving all notes
router.get('/', (req, res) => {
  console.info(`${req.method} request received for notes`);
  fs.readFile('./db/notes.json', (err, data) => {
    if(err) throw err;
    
    res.json(JSON.parse(data));
  })
});

// POST Route for a new note
router.post('/', (req, res) => {
  console.info(`${req.method} request received to add a note`);
  
  const { title, text } = req.body;
  
  if(req.body) {
    const newNote = {
      title,
      text,
      id: uuid(),
    };

    // adds note to array
    dbNotes.push(newNote);

    // writes to json file
    fs.writeFileSync('./db/notes.json', JSON.stringify(dbNotes));

    // sends the response with the array
    res.json(dbNotes);
  }
})

router.delete('/:id', (req, res) => {
  const deleteNote = dbNotes.some(note => note.id === req.params.id);
  if (deleteNote) {
      dbNotes = dbNotes.filter(note => note.id !== req.params.id);
      // Write the filtered notes back to the file
      fs.writeFileSync('./db/notes.json', JSON.stringify(dbNotes));
      res.json(dbNotes);
  } else {
      res.status(400).json({ error: "No note found with that id" });
  };
});

module.exports = router;

