const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const db = require('./db/db.json');


// express config
const app = express();
const PORT = process.env.PORT || 3001;


app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json());





//app.get('api/notes/:id', (req, res) => {
//res.json(notes[req.params.id]);
//});

//app.get('/api/notes', (req, res) => {
//fs.readFile('./db/db.json', 'utf8', (err, data) => {
//    if (err) throw err;
//    var notes = JSON.parse(data);
//    res.json(notes);
//  });
//});

//API Routes
// GET /api/notes should read the db.json file and return all saved notes as JSON.
app.get('/api/notes', (req, res) => {
  fs.readFile('./db/db.json', (err, data) => {
      ///error logging
      if (err) throw err;
      let dbData = JSON.parse(data);
      //Returns new database
      res.json(dbData)
  });   
})



app.post('/api/notes', (req, res) => {
  let newNotes = req.body

  newNotes.id = uuidv4();

  db.push(newNotes);

 
fs.writeFile('./db/db.json', JSON.stringify(db), (err) => {
      if (err) console.log(err)
      res.json(db);
    });

  });
  


  //DELETE
// notes when the button is clicked by removing the note from db.json, saving and showing the updated database on the front end.
app.delete('/api/notes/:id', (req, res) => {
  const newDb = db.filter((note) =>
      note.id !== req.params.id)

  // update the db.json file to reflect the modified notes array
  fs.writeFileSync('./db/db.json', JSON.stringify(newDb))

  // send that removed note object back to user
  readFile.json(newDb)
})



//app.post('/api/notes', (req, res) => {
//let newNotes = req.body
//newNotes.id = uuidv4();
//fs.readFile('./db/db.json', 'utf8', (err, data) => {
//    if (err) throw err;
//    let notes = JSON.parse(data);
//    console.log(notes, newNotes);
//   notes.push(newNotes);
//  fs.writeFile('./db/db.json', JSON.stringify(notes), (err) => {
//      if (err) console.log(err)
//      res.json(newNotes);
//    });
//  });
//});

//DELETE
//notes when the button is clicked by removing the note from db.json, saving and showing the updated database on the front end.
//app.delete('/api/notes/:id', (req, res) => {
//  const newDb = db.filter((note) =>
//    note.id !== req.params.id)
// update the db.json file to reflect the modified notes array
//  fs.writeFileSync('./db/db.json', JSON.stringify(newDb))
// send that removed note object back to user
//  fs.readFile.json(newDb)
//})






//Sends notes to the notes.html file
//app.get('/notes', (req, res) => {
//  res.sendFile(path.join(__dirname, './public/notes.html'))
//});
//Sends to the homepage if a pathing issue exists
//app.get('*', (req, res) => {
//  res.sendFile(path.join(__dirname, './public/index.html'));
//});


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

//Notes
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'notes.html'))
})


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})





app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});