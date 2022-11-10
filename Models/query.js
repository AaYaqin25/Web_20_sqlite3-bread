import sqlite3 from 'sqlite3';
import path from 'path';

const pathDB = path.join(path.resolve(), 'db', 'alltype.db');
const db = new sqlite3.Database(pathDB);

export default class AllFun {
    static read(page, key, link,callback) {
        let array = []
        const url = link == '/' ? '/?page = 1' : link

        if (key.idch == 'on' && key.id != '') {
            array.push(`id = ${key.id}`)
        }

        if (key.stringch == 'on' && key.string != '') {
            array.push(`st LIKE '%${key.string}%'`)
        }

        if (key.integerch == 'on' && key.integer != '') {
            array.push(`it = ${key.integer}`)
        }

        if (key.floatch == `on` && key.float != '') {
            array.push(`ft = ${key.float}`)
        }

        if (key.datech == 'on' && key.startdate != '' && key.enddate != '') {
            array.push(`dt BETWEEN '${key.startdate}' AND '${key.enddate}'`)
        }

        if (key.booleanch == 'on' && key.boolean != '') {
            array.push(`bn = '${key.boolean}'`)
        }

        let sql = "SELECT COUNT(*) AS total FROM gabungan"
        if (array.length > 0) {
            sql += ` WHERE ${array.join(' AND ')}`
        }

        const limit = 3
        const offset = (page - 1) * limit

        db.all(sql, (err, rows) => {
            if (err) return console.log("gagal", err);

            const total = rows[0].total
            const totalPage = Math.ceil(total / limit)

            sql = "SELECT * FROM gabungan"
            if (array.length > 0) {
                sql += ` WHERE ${array.join(' AND ')}`
            }
                sql += ` LIMIT ${limit} OFFSET ${offset}`
            
            db.all(sql, (err, rows) => {
                if (err) return console.log("gagal", err);
                callback(
                    rows,
                    offset,
                    totalPage,
                    url
                )

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
}
