const router = require('express').Router();
const fs = require('fs');
const path = require('path');

// Function to create unique ids provided in course content
const uuid = require('../helpers/uuid');

const dbNotes = require('../db/notes.json');

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
      note_id: uuid(),
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
  const noteToDelete = dbNotes.filter(note => note.id !== req.params.id);

  fs.writeFileSync('./db/notes.json', JSON.stringify(noteToDelete));

  fs.readFile.json(noteToDelete);
});

module.exports = router;

