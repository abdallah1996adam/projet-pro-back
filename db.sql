create database tours;

CREATE TABLE users (
  id int  NOT NULL AUTO_INCREMENT,
  firstName varchar(45) NOT NULL,
  latstName varchar(45) Not null,
  emailId varchar(45) NOT NULL,
  password varchar(255) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY `emailId_UNIQUE` (emailId)
)

create table tour(
id varchar(36) not null primary key,
tour_name varchar(70) not null,
guide_name varchar(70) not null,
price varchar(70) not null,
rating varchar(70) not null,
description text not null,
duration varchar(70) not null,
max_people  varchar(70) not null,
location varchar(70) not null,
tour_date date,
user_id int not null,
KEY `userIdFk1_idx` (`user_id`),
CONSTRAINT `userIdFk1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);
create table booking(
id int not null auto_increment primary key,
user_id int not null,
tour_id varchar(45) not null,
foreign key (user_id) references users(id),
foreign key (tour_id) references tour(id)
);




-- ALTER TABLE `tours_db`.`tour` 
-- CHANGE COLUMN `image` `image` TEXT NOT NULL ;

-- select * from tour inner join images on tour.id = images.tour_id