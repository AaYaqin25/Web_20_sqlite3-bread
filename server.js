import express, { query } from 'express';
import bodyParser from 'body-parser';
import AllFun from './Models/query.js';
import sqlite3 from 'sqlite3';
import path from 'path';

const pathDB = path.join(path.resolve(), 'db', 'alltype.db');
const db = new sqlite3.Database(pathDB);
const port = 3000

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  const link = req.url
  const key = req.query
  const page = parseInt(req.query.page) || 1
  AllFun.read(page, key, link, ( data, offset, totalPage, url) => {
    res.render("index", { data, offset, page, totalPage, query: key, url})
  })

})

app.get('/add', (req, res) => {
  res.render("add");
})

app.post('/add', (req, res) => {
  const { string, integer, float, date, boolean } = req.body;
  AllFun.add(string, integer, float, date, boolean, () => {
    res.redirect('/');
  })
})

app.get("/delete/:id", (req, res) => {
  const id = req.params.id
  AllFun.remove(id, () => {
    res.redirect('/');
  })
})

app.get("/edit/:id", (req, res) => {
  const id = req.params.id;
  AllFun.showUpdate(id, (value) => {
    res.render('edit', { item: value })
  })
})

app.post("/edit/:id", (req, res) => {
  const id = req.params.id
  const { string, integer, float, date, boolean } = req.body;
  AllFun.update(string, integer, float, date, boolean, id, () => {
    res.redirect('/');
  })
})

app.listen(port, () => {
  console.log(`Aplikasi berjalan di port ${port}`);
})