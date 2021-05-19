const express = require('express')
var mysql = require('mysql2');
const cors = require('cors');
const app = express();
app.use(cors());
const port = 3000
app.use(express.json())
var pool = mysql.createPool({
  host: "190.105.228.33",
  user: "marian",
  password: "M6uN9QNGv3yvgguE$",
  database:"marian"
});
//Get list of items
app.get('/items', (req, res) => {
  pool.getConnection(function(err, con) {
    if (err) throw err;    
    con.query(`SELECT id, text, complete, folder_id, user_id, name FROM(
      SELECT items.id, items.text, items.complete, items.folder_id, folders.name, items.user_id FROM items 
      LEFT JOIN folders ON items.folder_id = folders.id 
      UNION 
      SELECT items.id, items.text, items.complete, items.folder_id, folders.name, items.user_id 
      FROM items 
      RIGHT JOIN folders ON items.folder_id = folders.id) as t1
      WHERE t1.user_id = ? `,[req.query.id], function (err, result, fields) {
      // if any error while executing above query, throw error
      if (err) throw err;
      // if there is no error, you have the result
      // iterate for all the rows in result
      res.json(result)
    });
    con.release();
  });
})
//Get list of folders
app.get('/folders', (req, res) => {
  pool.getConnection(function(err, con) {
    if (err) throw err;
    
    con.query(`SELECT * FROM marian.folders WHERE user_id = ?`,[req.query.id], function (err, result, fields) {
      // if any error while executing above query, throw error
      if (err) throw err;
      // if there is no error, you have the result
      // iterate for all the rows in result
      res.json(result)
    });
    con.release();
  });
})
//Get list of users
app.get('/users', (req, res) => {
  pool.getConnection(function(err, con) {
    if (err) throw err;
    
    con.query("SELECT * FROM marian.users", function (err, result, fields) {
      // if any error while executing above query, throw error
      if (err) throw err;
      // if there is no error, you have the result
      // iterate for all the rows in result
      res.json(result)
    });
    con.release();
  });
})
//Add new item
app.post('/additem', (req, res) => {
  pool.getConnection(function(err, con) {
    if (err) throw err;
    let params = req.body.folder_id? [req.body.text,req.body.folder_id,req.body.user_id]: [req.body.text,req.body.user_id]
    let query = req.body.folder_id? `INSERT INTO marian.items (text, folder_id, user_id) VALUES (?,?,?)`: `INSERT INTO marian.items (text, user_id) VALUES (?,?)`
    con.query(query,params, function (err, result, fields) {
      // if any error while executing above query, throw error
      if (err) throw err;
      // if there is no error, you have the result
      // iterate for all the rows in result
      res.json(result)
    });
    con.release();
  });
})
//Add new folder
app.post('/addfolder', (req, res) => {
  pool.getConnection(function(err, con) {
    if (err) throw err;
    console.log(req.body)
    con.query(`INSERT INTO marian.folders (name, user_id) VALUES (?,?)`,[req.body.name, req.body.user_id], function (err, result, fields) {
      // if any error while executing above query, throw error
      if (err) throw err;
      // if there is no error, you have the result
      // iterate for all the rows in result
      res.json(result)
    });
    con.release();
  });
})
//Add new user
app.post('/adduser', (req, res) => {
  pool.getConnection(function(err, con) {
    if (err) throw err;
    
    con.query(`INSERT INTO marian.users (username, password) VALUES (?, ?)`,[req.body.username,req.body.password], function (err, result, fields) {
      // if any error while executing above query, throw error
      if (err){
        res.json({error:err})
      }else{
        res.json(result)
      }
      // if there is no error, you have the result
      // iterate for all the rows in result
    });
    con.release();
  });
})
//Set folder to item
app.post('/setfolder', (req, res) => {
  pool.getConnection(function(err, con) {
    if (err) throw err;
    
    con.query(`UPDATE marian.items SET folder_id = ? WHERE id = ?`,[req.body.folder,req.body.id], function (err, result, fields) {
      // if any error while executing above query, throw error
      if (err) throw err;
      // if there is no error, you have the result
      // iterate for all the rows in result
      res.json(result)
    });
    con.release();
  });
})
//Complete item
app.post('/checkitem', (req, res) => {
  pool.getConnection(function(err, con) {
    if (err) throw err;
    
    con.query(`UPDATE marian.items SET complete = ? WHERE id = ?`,[req.body.state,req.body.id], function (err, result, fields) {
      // if any error while executing above query, throw error
      if (err) throw err;
      // if there is no error, you have the result
      // iterate for all the rows in result
      res.json(result)
    });
    con.release();
  });
})
//Update item
app.post('/updateitem', (req, res) => {
  pool.getConnection(function(err, con) {
    if (err) throw err;
    console.log(req.body)
    con.query(`UPDATE marian.items SET text = ?, folder_id = ? WHERE id = ?`,[req.body.text,req.body.folder_id,req.body.id], function (err, result, fields) {
      // if any error while executing above query, throw error
      if (err) throw err;
      // if there is no error, you have the result
      // iterate for all the rows in result
      res.json(result)
    });
    con.release();
  });
})
//Delete item by folder
app.post('/delfolder', (req, res) => {
  pool.getConnection(function(err, con) {
    if (err) throw err;
    let results=[]
    con.query(`DELETE FROM marian.items WHERE folder_id = ?`,[req.body.id], function (err, result, fields) {
      // if any error while executing above query, throw error
      if (err) throw err;
      // if there is no error, you have the result
      // iterate for all the rows in result
      results.push(result)
    });
    con.query(`DELETE FROM marian.folders WHERE id = ?`,[req.body.id], function (err, result, fields) {
      // if any error while executing above query, throw error
      if (err) throw err;
      // if there is no error, you have the result
      // iterate for all the rows in result
      results.push(result)

    });
    res.json(results)
    con.release();
  });
})
//Delete item
app.post('/delitem', (req, res) => {
  pool.getConnection(function(err, con) {
    if (err) throw err;
    
    con.query(`DELETE FROM marian.items WHERE id = ?`,[req.body.id], function (err, result, fields) {
      // if any error while executing above query, throw error
      if (err) throw err;
      // if there is no error, you have the result
      // iterate for all the rows in result
      res.json(result)
    });
    con.release();
  });
})
//Delete folder
app.post('/delfolder', (req, res) => {
  pool.getConnection(function(err, con) {
    if (err) throw err;
    
    con.query(`DELETE FROM marian.folders WHERE id = ?`,[req.body.id], function (err, result, fields) {
      // if any error while executing above query, throw error
      if (err) throw err;
      // if there is no error, you have the result
      // iterate for all the rows in result
      res.json(result)
    });
    con.release();
  });
})
//Delete folder
app.post('/login', (req, res) => {
  pool.getConnection(function(err, con) {
    if (err) throw err;
    con.query(`SELECT id FROM marian.users WHERE username = ? AND password = ?`,[req.body.username,req.body.password], function (err, result, fields) {
      // if any error while executing above query, throw error
      if (err) throw err;
      if(result.length>0){
        res.json({result:'connected', id:result[0].id})
      }else{
        res.json({result:'rejected'})
      }
    });
  });
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
