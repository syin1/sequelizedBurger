create database burgers_db;
use burgers_db;

create table burgers (
	id INT NOT NULL AUTO_INCREMENT,
  burger_name VARCHAR(100) NULL,
  devoured BOOLEAN DEFAULT false,
  PRIMARY KEY (id)
);

