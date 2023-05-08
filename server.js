// Dependencies
const express = require('express');
const fs = require('fs');
const path = require('path');
const uuid = require('uuid');



// express config
const app = express();
const PORT = process.env.PORT || 3001;


//Use of  images, CSS files, and JavaScript files in the public directory
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json());



//API Routes


// GET /api/notes will read the db.json file and return all saved notes as JSON.
app.get('/api/notes', (req, res) => {
  fs.readFile('./db/db.json', (err, data) => {
    ///error logging
    if (err) throw err;
    let dbData = JSON.parse(data);
    //Returns new database
    res.json(dbData)
  });
})



// API POST request
app.post("/api/notes", function (req, res) {

  let newNotes = req.body
  newNotes.id = uuid.v4();

  // Variable allTheNotes= because allTheNotes will be contained within this braquets 
  let allTheNotes = [];
  fs.readFile("./db/db.json", (err, data) => {
    if (err) throw err;
    allTheNotes = JSON.parse(data);
    allTheNotes.push(newNotes);
    fs.writeFile("./db/db.json", JSON.stringify(allTheNotes), "utf-8", (err) => {
      if (err) throw err;
      console.log("Your note has been saved.")
      res.end();
    })
  })
  console.log(newNotes)
});


// API DELETE Request
app.delete("/api/notes/:id", (req, res) => {
  let noteId = req.params.id;
  fs.readFile("./db/db.json", (err, data) => {
    if (err) throw err;
    let notesDB = JSON.parse(data);
    const screenedNotes = notesDB.filter(values => values.id != noteId);
    fs.writeFile("./db/db.json", JSON.stringify(screenedNotes), "utf-8", err => {
      if (err) throw err;
      console.log("Your note has been deleted.")
      res.end();
    });
  });
});



//html routes

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

//route to notes.html
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'notes.html'))
})

//route to index.html 
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})



//App listens through that port when launched with 'node server' command line
app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});