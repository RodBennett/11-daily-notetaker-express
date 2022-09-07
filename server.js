// setting up server through npm express.js
const express = require('express');
const path = require('path');
const storedNotes = require('./db/db.json')
const PORT = process.env.PORT || 3001;
const fs = require('fs')

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// import express.js
app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);

// GET route for notes.html linked to homepage
app.get('/notes', (req, res) => 
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);

// GET route for db.json notes file
app.get('/api/notes', (req, res) => res.json(storedNotes),
)

//GET route for specifically searched note
app.get('/api/notes/:title', (req, res) => {
  const note = req.params.title;

//loop to find requested title among all titles in db.json
  for (let i = 0; i < note.length; i++) {
    if(requestedNote === note[i].title) {
      console.log(note, "Hello")
      res.json(fs.writeFile(`./db${note}`))
    }
  }
  return res.json("No note found.")
})

// POST route for creating notes
app.post('/api/notes', (req,res) => {
  const { title, text } = req.body;
  if(title && text) {
    const newNote = {
      title,
      text,
    };

  const response = {
    status: "success",
    body: newNote,
  };
  const myJSON = JSON.stringify(response)
  console.log(myJSON);
  res.json(fs.writeFile('./db/db.json', myJSON, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  })
)}
})

app.listen(PORT, () => console.log(`App listening on http://localhost:${PORT}`));