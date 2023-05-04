const express = require('express');
const app = express();
const fs = require('fs');
const PORT = process.env.PORT || 3001;
const path = require('path');


app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json());

app.get('api/notes/:id', (req, res) =>{
    res.json(notes[req.params.id]);
  });
  
  app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if (err) throw err;
      var notes = JSON.parse(data);
      res.json(notes);
    });
  });



  //Sends notes to the notes.html file
  app.get('/notes', (req, res) => {
      res.sendFile(path.join(__dirname,'./public/notes.html'))
  });
  //Sends to the homepage if a pathing issue exists
  app.get('*', (req, res) => {
     res.sendFile(path.join(__dirname, './public/index.html'));
  }); 

  app.post('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if (err) throw err;
      var notes = JSON.parse(data);
      let userNote = req.body;
      //  function that generates a string of random numbers and letters
      userNote.id = Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
      // ASK question  Math.floor(Math.random() * 5000!!!
      notes.push(userNote);
    fs.writeFile('./db/db.json', JSON.stringify(notes), (err, data) => {
        res.json(userNote);
    });
    }); 
  });

  app.delete('/api/notes/:id', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if (err) throw err;
      let notes = JSON.parse(data);
      const newNotes = notes.filter(note => note.id !== parseInt(req.params.id));
    
    fs.writeFile('./db/db.json', JSON.stringify(newNotes), (err, data) => {
      res.json({msg: 'successfully'});
    });
  });
  });


  app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`);
});