// setting up server through npm express.js
const express = require('express');
const path = require('path');
const fs = require('fs');

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
  // readFileSync sends strings of db.json data to variable noteData
  let noteData = fs.readFileSync('./db/db.json')
  // data in db.json is parsed into an object 
  let noteReceiver = JSON.parse(noteData)
  // data pushed from new note as an object to a variable
  noteReceiver.push(req.body);
  // writes the data as a string for storage in db.json, "null, 2" is used to format it with indentations in db.json
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
app.delete("/api/notes/:id", (req, res) => {
  // To delete a note, read all notes from the db.json file
  let noteData = fs.readFileSync('./db/db.json');
  // string data from db.json parsed into js object
  let noteTaker = JSON.parse(noteData);
  // 
  const notesSaved = noteTaker.filter(deleteItem => deleteItem.id === req.params.id);
  console.log(notesSaved, "pressed delete")
  
  // select and delete selected note by removing the note with the given id property
  const notesIndex = noteTaker.indexOf(notesSaved);
  console.log(notesIndex, "minus 1")
  noteTaker.splice(notesIndex);
  console.log(noteTaker, "remaining")
  
 // rewrite the notes to the db.json file
 fs.writeFile(__dirname + "/db/db.json", JSON.stringify(noteTaker, null, 2), err => {
   if (err) throw err;
   //send response back to client
   res.json(noteTaker)    
 }); 
});

// set up port for listening and creates link for execution in terminal
app.listen(PORT, () => console.log(`App listening on http://localhost:${PORT}`));