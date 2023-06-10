const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const notesPath = path.resolve(__dirname, '../../db/notes.json');

// Function to create unique ids provided in course content
const uuid = require('../../helpers/uuid');

let data = require('../../db/notes.json');

// GET route for retrieving all notes
router.get('/', (req, res) => {
  console.info(`${req.method} request received for notes`);
  fs.readFile('./db/notes.json', 'utf-8', (err, data) => {
    if(err) throw err;
    var notes = JSON.parse(data);

    res.json(notes);
  })
});

// GET route for retrieving a note by id
router.get('/:id', (req,res) => {
    res.json(notes[req.params.id])
});

// POST Route for a new note
router.post('/', (req, res) => {
    console.info(`${req.method} request received to add a note`);
    
    fs.readFile('./db/notes.json', 'utf-8', (err, data) => {
      if(err) throw err;
      
      let notes = JSON.parse(data);
      const { title, text } = req.body;
    
      if(req.body) {
        const newNote = {
          title,
          text,
          note_id: uuid(),
        };
  
        notes.push(newNote);
        fs.writeFile('./db/notes.json', JSON.stringify(notes, null, 2), (err) => {
          if(err) throw err;
          
          res.json(newNote);
        });
      } else {
        res.status(400).send('Error in adding note');
      }
    });
  });

router.delete('/:id', (req, res) => {
    const noteToDelete = data.find(note => note.note_id === req.params.id);
    if(noteToDelete) {
        data = data.filter(note => note.note_id !== req.params.id);
        fs.writeFileSync(notesPath, JSON.stringify(data, null, 2));
        res.json(data);
    } else {
        res.status(400).send('Error deleting note');
    }
});

module.exports = router;

