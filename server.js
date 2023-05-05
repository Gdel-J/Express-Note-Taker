const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');


// express config
const app = express();
const PORT = process.env.PORT || 3001;


app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json());

app.get('api/notes/:id', (req, res) => {
  res.json(notes[req.params.id]);
});

app.get('/api/notes', (req, res) => {
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) throw err;
    var notes = JSON.parse(data);
    res.json(notes);
  });
});


app.post('/api/notes', (req, res) => {
  let newNotes = req.body
  newNotes.id = uuidv4();
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) throw err;
    var notes = JSON.parse(data);
    console.log(notes, newNotes);
    notes.push(newNotes);
    fs.writeFile('./db/db.json', JSON.stringify(notes), (err) => {
    if (err) console.log(err)
      res.json(newNotes);
    });
  });
});

app.delete('/api/notes/:id', (req, res) => {
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) throw err;
    let notes = JSON.parse(data);
    const newNotes = notes.filter(note => note.id !== parseInt(req.params.id));

    fs.writeFile('./db/db.json', JSON.stringify(newNotes), (err, data) => {
      res.json({ msg: 'successfully' });
    });
  });
});

//Sends notes to the notes.html file
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'))
});
//Sends to the homepage if a pathing issue exists
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});