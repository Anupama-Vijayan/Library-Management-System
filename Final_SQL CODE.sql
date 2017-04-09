

CREATE TABLE `Books` (
  `ID` smallint(6) NOT NULL AUTO_INCREMENT,
  `Name` varchar(20) DEFAULT NULL,
  `Author_ID` smallint(6) DEFAULT NULL,
  `Type` varchar(10) DEFAULT NULL,
  `Description` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`ID`)
);

CREATE TABLE `Magazine` (
  `IBBN` smallint(6) NOT NULL,
  `Book_ID` smallint(6) DEFAULT NULL,
  `Issue_No` smallint(6) DEFAULT NULL,
  `Format_type` varchar(5) DEFAULT NULL,
  `M_Date` DATE DEFAULT NULL,
  `Pages` smallint(3) NOT NULL,
  PRIMARY KEY (`IBBN`)
);

CREATE TABLE `Movie` (
  `ISSN` smallint(6) NOT NULL,
  `Book_ID` smallint(6) DEFAULT NULL,
  `Duration` TIME DEFAULT NULL,
  `Rating_type` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`ISSN`)
);

CREATE TABLE `PBook` (
  `IBSN` smallint(6) NOT NULL,
  `Book_ID` smallint(6) DEFAULT NULL,
  `Pages` smallint(3) NOT NULL,
  PRIMARY KEY (`IBSN`)
);

CREATE TABLE `User_Profile` (
  `ID` smallint(6) NOT NULL,
  `Username` varchar(20) DEFAULT NULL,
  `Password` varchar(8) DEFAULT NULL,
  `FName` varchar(20) DEFAULT NULL,
  `LName` varchar(20) DEFAULT NULL,
  `Address_ID` smallint(6) DEFAULT NULL,
  `Email` varchar(20) DEFAULT NULL,
  `Pnum` smallint(10) DEFAULT NULL,
  `User_Type` smallint(1) DEFAULT NULL,
  PRIMARY KEY (`ID`)
);

CREATE TABLE `Branch` (
  `ID` smallint(6) NOT NULL,
  `Address_ID` smallint(6) DEFAULT NULL,
  `Pnum` smallint(10) DEFAULT NULL,
  PRIMARY KEY (`ID`)
);

CREATE TABLE `Author` (
  `ID` smallint(6) NOT NULL AUTO_INCREMENT,
  `Fname` varchar(20) DEFAULT NULL,
  `Lname` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`ID`)
);

CREATE TABLE `Book_Author` (
  `Author_ID` smallint(6) NOT NULL,
  `Book_ID` smallint(6) NOT NULL,
  PRIMARY KEY (`Author_ID`,`Book_ID`),
  FOREIGN KEY (`Author_ID`) REFERENCES Author(`ID`),
  FOREIGN KEY (`Book_ID`) REFERENCES Books(`ID`)
);



create table `Address`
(
`ID` smallint(6) NOT NULL AUTO_INCREMENT,
`Street` Varchar(20) NOT NULL ,
`City` Varchar(10) NOT NULL ,
`State_Name` Varchar(2) NOT NULL ,
PRIMARY KEY (`ID`)
    
);

CREATE TABLE `Publisher` (
  `ID` smallint(6) NOT NULL AUTO_INCREMENT,
  `Address_ID` smallint(6) NOT NULL,
  `Book_ID` smallint(6) NOT NULL,
  `Name` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  FOREIGN KEY (`Address_ID`) REFERENCES Address(`ID`),
  FOREIGN KEY (`Book_ID`) REFERENCES Books(`ID`)
);

CREATE TABLE `Book_Copies` (
  `Book_ID` smallint(6) NOT NULL,
  `Branch_ID` smallint(6) NOT NULL,
  `Num_Copies` smallint(6) NOT NULL,
  PRIMARY KEY (`Branch_ID`,`Book_ID`),
  FOREIGN KEY (`Branch_ID`) REFERENCES Branch(`ID`),
  FOREIGN KEY (`Book_ID`) REFERENCES Books(`ID`)
);

CREATE TABLE `Holds` (
  `ID` smallint(6) NOT NULL AUTO_INCREMENT,
  `Book_ID` smallint(6) NOT NULL,
  `User_ID` smallint(6) NOT NULL,
  `Branch_ID` smallint(6) NOT NULL,
  PRIMARY KEY (`ID`),
  FOREIGN KEY (`Branch_ID`) REFERENCES Branch(`ID`),
  FOREIGN KEY (`Book_ID`) REFERENCES Books(`ID`),
  FOREIGN KEY (`User_ID`) REFERENCES User_Profile(`ID`)
);

create table `Fines`
(
`ID` smallint(6) NOT NULL AUTO_INCREMENT,
`User_ID` smallint(6) NOT NULL,
`Book_ID` smallint(6) NOT NULL,
`Amount` Decimal(19,4) NOT NULL,
PRIMARY KEY (`ID`),
FOREIGN KEY (`User_ID`) REFERENCES User_Profile(`ID`),
FOREIGN KEY (`Book_ID`) REFERENCES Books(`ID`)

);

create table `Searches`
(
`ID` smallint(6) NOT NULL AUTO_INCREMENT,
`User_ID` smallint(6) NOT NULL,
`Book_ID` smallint(6) NOT NULL,
`Search_Date` DATE NOT NULL,
PRIMARY KEY (`ID`),
FOREIGN KEY (`User_ID`) REFERENCES User_Profile(`ID`),
FOREIGN KEY (`Book_ID`) REFERENCES Books(`ID`)

);

create table `Lists`
(
`ID` smallint(6) NOT NULL AUTO_INCREMENT,
`User_ID` smallint(6) NOT NULL,
`Book_ID` smallint(6) NOT NULL,
`Branch_ID` Smallint(6) NOT NULL,
PRIMARY KEY (`ID`),
FOREIGN KEY (`User_ID`) REFERENCES User_Profile(`ID`),
FOREIGN KEY (`Book_ID`) REFERENCES Books(`ID`),
FOREIGN KEY (`Branch_ID`) REFERENCES Branch(`ID`)
);



create table `Checkouts`
(
`ID` smallint(6) NOT NULL AUTO_INCREMENT,
`User_ID` smallint(6) NOT NULL,
`Book_ID` smallint(6) NOT NULL,
`Branch_ID` Smallint(6) NOT NULL,
`Due_Date` Date NOT NULL,
`Checkout_Date` Date NOT NULL,
`Returned_Date` Date NOT NULL,
PRIMARY KEY (`ID`),
FOREIGN KEY (`User_ID`) REFERENCES User_Profile(`ID`),
FOREIGN KEY (`Book_ID`) REFERENCES Books(`ID`),
FOREIGN KEY (`Branch_ID`) REFERENCES Branch(`ID`)
);



