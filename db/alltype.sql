CREATE TABLE gabungan (
    id integer primary key autoincrement,
    st varchar(255),
    it number,
    ft float,
    dt datetime,
    bn varchar(10)
);

INSERT INTO gabungan (st, it, ft, dt, bn) VALUES (
    ("yaqin"), 
    (25), 
    (2.5), 
    ("25 September 1999"), 
    ("true")
);