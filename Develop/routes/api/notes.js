const router = require('express').Router();

// Function to create unique ids provided in course content
const uuid = require('../../helpers/uuid');

// Function for reading and writing JSON file provided in course
const { readFromFile, readAndAppend } = require('../../helpers/fsUtils');

// GET route for retrieving notes
router.get('/', (req, res) => {
    console.info(`${req.method} request received for notes`);
    readFromFile('./db/notes.json').then((data) => res.json(JSON.parse(data)));
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

        readAndAppend(newNote, './db/notes.json');
        res.json(`Note added successfully!`);
    } else {
        res.errored(`Error in adding note`);
    }
});

module.exports = router;
