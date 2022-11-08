import sqlite3 from 'sqlite3';
import path from 'path';

const pathDB = path.join(path.resolve(), 'db', 'alltype.db');
const db = new sqlite3.Database(pathDB);

export default class AllFun {
    static read(page, callback) {

        const limit = 3
        const offset = (page - 1) * limit

        db.all("SELECT COUNT(*) AS total FROM gabungan", (err, rows) => {
            if (err) return console.log("gagal", err);
            const total = rows[0].total
            const totalPage = Math.ceil(total / limit)

            db.all("SELECT * FROM gabungan LIMIT ? OFFSET ?", [limit, offset], (err, rows) => {
                if (err) return console.log("gagal", err);
                callback(
                    rows,
                    offset,
                    totalPage,
                );
            })
        })
    }

    static add(string, integer, float, date, boolean, callback) {
        db.run("INSERT INTO gabungan(st, it, ft, dt, bn) VALUES (?,?,?,?,?)", [string, integer, float, date, boolean], (err, rows) => {
            if (err) return console.log("gagal", err);
            callback(rows);
        })
    }

    static remove(del, callback) {
        db.run("DELETE FROM gabungan WHERE gabungan.id = ?", [del], (err, rows) => {
            if (err) return console.log("gagal", err);
            callback(rows);
        })
    }

    static showUpdate(id, callback) {
        db.get("SELECT * FROM gabungan WHERE gabungan.id = ?", [id], (err, row) => {
            if (err) return console.log("gagal", err);
            callback(row)
        })
    }

    static update(str, itr, flt, dte, bon, upt, callback) {
        db.run("UPDATE gabungan SET st = ?, it = ?, ft = ?, dt = ?, bn = ? WHERE gabungan.id = ?", [str, itr, flt, dte, bon, upt], (err) => {
            if (err) return console.log("gagal", err);
            callback()
        })
    }

    static search(id, str, int, flt , dte, bon, callback) { 
       db.all("SELECT * FROM gabungan WHERE gabungan.id = ?, AND gabungan.st = ?, AND gabungan.it = ?, AND gabungan.ft = ?, AND gabungan.dt = ?, AND gabungan.bn = ?", [id,str,int,flt,dte,bon], (err, rows) => {
        if (err) return console.log("gagal", err);
        callback(rows);
       })
    }
}
