CREATE DATABASE IF NOT EXISTS contactListExpress;

USE contactListExpress;

CREATE TABLE IF NOT EXISTS contact_list (
    id INT AUTO_INCREMENT PRIMARY KEY,
    lastName VARCHAR(255) NOT NULL,
    firstName VARCHAR(255) NOT NULL,
    emailAddress VARCHAR(255) NOT NULL,
    contactNumber VARCHAR(20) NOT NULL,
    isDeleted TINYINT(1) DEFAULT 0
);
