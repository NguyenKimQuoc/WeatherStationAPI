ALTER USER 'root'@'localhost' IDENTIFIED WITH 'mysql_native_password' BY 'admin123';
CREATE DATABASE weatherdb;
USE weatherdb;
CREATE TABLE nodes (
	nodeid 		varchar(100) primary key,
    nodename 	varchar(200),
    location 	varchar(200),
    latitude 	decimal(10, 6),
    longitude	decimal(10, 6)
);
CREATE TABLE openweatherdata (
	ind bigint primary key auto_increment,
    nodeid varchar(100) not null,
    humi float,
    temp float,
    timeget datetime,
    FOREIGN KEY (nodeid) REFERENCES nodes(nodeid)
);

CREATE TABLE realnodedata (
	ind bigint primary key auto_increment,
    nodeid varchar(100) not null,
    humi float,
    temp float,
    dusty float,
    co2 float,
    timeget datetime,
    FOREIGN KEY (nodeid) REFERENCES nodes(nodeid)
);
insert into nodes values ("node1", "Trạm TPHCM", "none", 10.762622, 106.660172);
insert into nodes values ("node2", "Trạm Bình Dương", "none", 11.16667, 106.66667);
select * from nodes;

