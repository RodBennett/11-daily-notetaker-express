// setting up server through npm express.js
const express = require('express');
const path = require('path');
const fs = require('fs');

// importing db.json whbile creating a global destructured notes variable
const { notes } = require('./db/db.json')

// importing helper code to generate random id numbers for notes
const uuid = require('./helpers/uuid.js')


// getting express js middleware for post/get/delete methods
const app = express();
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 3001;


// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET route for notes.html linked to homepage
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// GET route for db.json notes file
app.get('/api/notes', (req, res) => { 
  res.sendFile(path.join(__dirname, '/db/db.json'))
});

//GET route for specifically searched note
app.get('/api/notes/:id', (req, res) => {
  const selectedNote = req.params.id;
  res.json(selectedNote)
});

// POST route for creating notes
app.post('/api/notes', (req, res) => {

  // variable to add note using req.body, which is a property that uses body of objects in db.json
  const addNote = req.body;
  // this adds the id property to new notes, which calls the uuid function in the helper code to generate random id numbers for notes
  addNote.id = uuid();
  // the readFileSync method is used for the data in the note to 
  let noteData = fs.readFileSync('./db/db.json')
  // parses the data in the new note 
  let noteReceiver = JSON.parse(noteData)
  // pushes data from new note in its body form (key, value) to a variable
  noteReceiver.push(req.body);
  // writes the data to db.json, data is stringified for JSON format, and "null, 2" is used to format it with indentations in db.json
  fs.writeFileSync('./db/db.json', JSON.stringify(noteReceiver, null, 2), err => {
    if (err) throw err;
    res.json(noteReceiver)
   });
   // response function to send data from db.json to html page
   res.sendFile(path.join(__dirname, 'public/notes.html'));
});

// GET notes on HTML page at client's request
app.get('/notes', (req, res) => res.sendFile(__dirname, '/public/notes/html'))
app.get('*', (req, res) => res.sendFile(__dirname, '/public/index.html'))

// DELETE notes
app.delete('/api/notes/:id', (req, res) => {
  const { id } = req.params;
  const delNote = notes.indexOf(note => note.id == id);

  notes.splice(delNote, 1);
  return res.send();
});

// set up port for listening and creates link for execution in terminal
app.listen(PORT, () => console.log(`App listening on http://localhost:${PORT}`));