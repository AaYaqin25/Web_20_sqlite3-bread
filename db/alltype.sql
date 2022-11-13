CREATE TABLE gabungan (
    id integer primary key autoincrement,
    st varchar(255),
    it number,
    ft float,
    dt date,
    bn varchar(5)
);

INSERT INTO gabungan (st, it, ft, dt, bn) VALUES (
    ("yaqin"), 
    (25), 
    (2.5), 
    ("1999-09-25"), 
    ('true')
);