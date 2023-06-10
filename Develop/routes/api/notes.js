const router = require('express').Router();
const fs = require('fs');

// Function to create unique ids provided in course content
const uuid = require('../../helpers/uuid');

let db = JSON.parse(fs.readFileSync('./db/notes.json', 'utf8'));

// GET route for retrieving all notes
router.get('/', (req, res) => {
  console.info(`${req.method} request received for notes`);
  res.json(db);
});

// GET route for retrieving a note by id
router.get('/:id', (req,res) => {
  const note = db.find(note => note.note_id === req.params.id);
  res.json(note);
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

    db.push(newNote);

    fs.writeFileSync('./db/notes.json', JSON.stringify(db));

    res.json(db);
  } else {
    res.status(400).send('Error in adding note');
  }
});

router.delete('/:id', (req, res) => {
  db = db.filter((currentNote) => {
    return currentNote.note_id != req.params.id;
  });

  fs.writeFileSync('./db/notes.json', JSON.stringify(db));
  res.json(db);
});

module.exports = router;

