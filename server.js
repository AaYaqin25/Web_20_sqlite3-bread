import express  from 'express';
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

  const page = parseInt(req.query.page) || 1
  AllFun.read(page, (data, offset, totalPage) => {
    res.render("index", { data, offset, totalPage})
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

app.get('/search', (req, res) => {
  const param = req.query
  AllFun.searchId(param, () => {
    if (param.idch == 'on' && param.id !== '') {
      return res.send({
        id: param.id,
        string: param.string,
        integer: param.integer,
        float: param.float,
        date: param.date,
        boolean: param.boolean
      })
    }
  })
})

app.listen(port, () => {
  console.log(`Aplikasi berjalan di port ${port}`);
})