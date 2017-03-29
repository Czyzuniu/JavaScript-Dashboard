/*
 * A simple example of an API-based web app that stores pictures.
 */

'use static';
var fs = require('fs');
var express = require('express');
var mysql = require('mysql');
var multer = require('multer');
var config = require('./sql_config.json');
var sql = mysql.createConnection(config.mysql);
var bodyParser = require('body-parser');
var http = require('http');
var app = express();

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());
// constants for directories
var webpages = __dirname + '/webpages/';
var localimg = webpages + 'img/';
var webimg = '/img/';
var uploads = __dirname + '/uploads/';


// multer is a package that handles file uploads nicely
var uploader = multer({
  dest: uploads,
  limits: { // for security
    fields: 10,
    fileSize: 1024*1024*20,
    files: 1,
  }
});


// logging
//app.use('/', function(req, res, next) { console.log(new Date(), req.method, req.url); next(); });


// server api
//   POST /api/pictures     - upload a picture and its title, returns {id: ..., title: ..., file: '/img/...'}
//   GET  /api/pictures     - list pictures ordered by time from most recent, returns [like above, like above, ...]
//         ?order=...       - ordered by title or submission time or random
//         ?title=...       - search by title substring
//   DELETE /api/pictures/x - returns http status code only

app.get('/api/pictures', sendPictures);
app.get('/api/notes', sendNotes);
app.post('/api/pictures', uploader.single('picfile'), uploadPicture);
app.delete('/api/pictures/:id', deletePicture);
app.post('/api/notes', addToList);
app.post('/api/notes/update/', updateNote);
app.delete('/api/notes/:id', deleteNote);
app.get('/api/clock', sendSettings);
app.post('/api/clock', updateSettings);
app.get('/api/calendar', sendEvents);
app.post('/api/calendar', createEvent);
app.delete('/api/calendar/:id', deleteEve);
app.delete('/api/clockAlarm', deleteAlarm);
app.post('/api/clockAlarm', createAlarm);
app.get('/api/clockAlarm', sendAlarms);
app.post('/api/background', uploader.single('picfile'), uploadBackground);
// static files
app.use('/', express.static(webpages, { extensions: ['html'] }));

// start the server
app.listen(8080);



/* server functions
 *
 *
 *    ####  ###### #####  #    # ###### #####     ###### #    # #    #  ####  ##### #  ####  #    #  ####
 *   #      #      #    # #    # #      #    #    #      #    # ##   # #    #   #   # #    # ##   # #
 *    ####  #####  #    # #    # #####  #    #    #####  #    # # #  # #        #   # #    # # #  #  ####
 *        # #      #####  #    # #      #####     #      #    # #  # # #        #   # #    # #  # #      #
 *   #    # #      #   #   #  #  #      #   #     #      #    # #   ## #    #   #   # #    # #   ## #    #
 *    ####  ###### #    #   ##   ###### #    #    #       ####  #    #  ####    #   #  ####  #    #  ####
 *
 *
 */





function sendPictures(req, res) {
  var pictures = [];

  // prepare query
  var query = 'SELECT id,filename,title FROM photos';

  // now query the table and output the results
  sql.query(query, function (err, data) {
    if (err) return error(res, 'failed to run the query', err);

    data.forEach(function (row) {
      pictures.push({
        id: row.id,
        file: webimg + row.filename,
        title:row.title
      });
    });

    res.json(pictures);
  });
}

function sendSettings(req,res){
  var query = "SELECT * FROM settings";

  sql.query(query, function (err, data){
    if (err) return error(res, 'failed to run the query', err);

    res.json(data);
  });
}


function sendNotes(req, res){
  var query = "SELECT * FROM todolist";

  sql.query(query, function (err, data){
    if (err) return error(res, 'failed to run the query', err);

    res.json(data);
  });
}



function deletePicture(req, res) {
  // get the filename from the table
  sql.query(sql.format('SELECT filename FROM photos WHERE id = ?', [req.params.id]), function (err, data) {
    if (err) return error(res, 'failed to get filename for deletion', err);

    if (data.length < 1) {
      res.sendStatus(410); // already gone
      return;
    }

    var filename = localimg + data[0].filename;

    sql.query(sql.format('DELETE FROM photos WHERE id=?', [req.params.id]), function (err, result) {
      if (err) return error(res, 'failed sql delete', err);
      fs.unlink(filename, function (err) {
        if (err) return error(res, 'failed fs delete of ' + filename, err);

        res.sendStatus(200);
      });
    });
  });
}

function deleteNote(req,res){
  sql.query(sql.format('SELECT task,completed from todolist WHERE id = ?',[req.params.id]), function(err,data){
    if (err) return error(res,'cannot delete note', err);

    if(data.length < 1){
      res.sendStatus(410); // already deleted
      return;
    }

    sql.query(sql.format('DELETE FROM todolist WHERE id=?', [req.params.id]), function(err,result){
      if (err) return error(res, 'failed sql delete', err);
      res.sendStatus(200);

    });
  });
}

function deleteEve(req,res){
  sql.query(sql.format('SELECT * from calendar WHERE id = ?',[req.params.id]), function(err,data){
    if (err) return error(res,'cannot delete event', err);

    if(data.length < 1){
      res.sendStatus(410); // already deleted
      return;
    }

    sql.query(sql.format('DELETE FROM calendar WHERE id=?', [req.params.id]), function(err,result){
      if (err) return error(res, 'failed sql delete', err);
      res.sendStatus(200);
    });
  });
}

function uploadBackground(req,res){

  console.log(req.file);

  var fileExt = req.file.mimetype.split('/')[1] || 'png';
  var newFilename = req.file.filename + '.' + fileExt;
  fs.rename(req.file.path, localimg + newFilename, function (err) {
    if (err) return error(res, 'failed to move incoming file', err);

    // now add the file to the DB
    var dbRecord = {
      filename: newFilename
    };

    sql.query(sql.format('INSERT INTO background SET ?', dbRecord), function (err, result) {
      if (err) return error(res, 'failed sql insert', err);
    });
  });
}

function uploadPicture(req, res) {

  // move the file where we want it
  var fileExt = req.file.mimetype.split('/')[1] || 'png';
  var newFilename = req.file.filename + '.' + fileExt;
  fs.rename(req.file.path, localimg + newFilename, function (err) {
    if (err) return error(res, 'failed to move incoming file', err);

    // now add the file to the DB
    var dbRecord = {
      filename: newFilename,
      title: req.body.title
    };

    sql.query(sql.format('INSERT INTO photos SET ?', dbRecord), function (err, result) {
      if (err) return error(res, 'failed sql insert', err);

      if (req.accepts('html')) {
        // browser should go to the listing of pictures
        res.redirect(303, '/#' + result.insertId);
      } else {
        // XML HTTP request that accepts JSON will instead get that
        res.json({id: result.insertedId, file: webimg + dbRecord.filename});
      }
    });
  });
}

function addToList(req, res) {

      var title = req.query.title;

      var newNote = {
        task:title,
        completed: 0
      };

      sql.query(sql.format('INSERT INTO todolist SET ?', newNote), function (err, result) {
        if (err) return error(res, 'failed sql insert', err);
      });
}

function createEvent(req,res){

    var object = req.body;


    sql.query(sql.format('INSERT INTO calendar SET ?', object), function(err,result){
      if (err) return error(res,'failed sql insert', err);
     })
}

function updateNote(req,res){

  var id = req.query.noteID;
  var completed = req.query.noteCompleted;
  var query = [completed,id];

  sql.query(
  'UPDATE todolist SET completed = ? Where ID = ?',
  query,
  function (err, result) {
    if (err) throw err;

    }
  );

}

function updateSettings(req,res){

  var value = req.query.format;
  var id = 1;

  console.log(value);
  sql.query(
  'UPDATE settings SET value = ? Where ID = ?',
  [value,id],
  function (err, result) {
    console.log(result);
    if (err) throw err;

    }
  );
}

function sendEvents(req,res){

  var day;

  var date = new Date();
  if(date.getDate() < 10){
      day = '0' + date.getDate();
  }
  else {
    day = date.getDate();
  }
  if(date.getMonth() + 1 < 10){
      var month = '0' + (date.getMonth() + 1);
  }





  var events = [];
  // prepare query
  var query = 'SELECT * FROM calendar';

  //console.log(req.query.month);
  //console.log(req.query.nextMonth);

    var mth = parseInt(req.query.month) + 1;
    var nextmth = parseInt(req.query.nextMonth) + 1;


    var selectedDate = date.getFullYear() + '-' + mth + '-' + '1';
    var toDate = date.getFullYear() + '-' + nextmth + '-' + '31';


    query += ' WHERE eventOn >= ' + sql.escape('' + selectedDate + '')
    query += ' and  eventOn <= ' + sql.escape('' + toDate + '') + ' ORDER BY eventOn ASC';



  //console.log(query);
  // now query the table and output the results
  sql.query(query, function (err, data) {
    if (err) return error(res, 'failed to run the query', err);

    data.forEach(function (row) {
      events.push({
        id: row.id,
        name: row.eventName,
        desc: row.eventDesc,
        when:row.eventOn,
        start: row.eventStart,
        finish: row.eventFinish,
        hasEvent:true
      });
    });

    res.json(events);
  });
}




function error(res, msg, error) {
  res.sendStatus(500);
  console.error(msg, error);
}

function createAlarm(req,res){

  var time = req.query.time;
  var title = req.query.title;

  var obj = {
    id:0,
    alarmTime:time,
    title:title
  };

  sql.query(sql.format('INSERT INTO alarm SET ?', obj), function (err, result) {
    if (err) return error(res, 'failed sql insert', err);
  });

}

function sendAlarms(req,res){
  var query = 'SELECT * FROM alarm';
  var alarms = [];
  sql.query(query, function (err, data) {
    if (err) return error(res, 'failed to run the query', err);

    data.forEach(function (row) {
      alarms.push({
        id: row.id,
        time: row.alarmTime,
        title:row.title
      });
    });

    res.json(alarms);
  });
}


function deleteAlarm(req,res){
  var query = 'DELETE FROM alarm WHERE id=' + req.query.id;

  sql.query(query, function (err, data) {
    if (err) return error(res, 'failed to run the query', err);
  });
}
