

CREATE DATABASE IF NOT EXISTS beginner_crud;

USE beginner_crud;




CREATE TABLE IF NOT EXISTS users (

    id INT AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(100) NOT NULL,

    email VARCHAR(150) NOT NULL UNIQUE,

    age INT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);



INSERT INTO users (name, email, age)
VALUES
('John Doe', 'john@example.com', 25),
('Jane Smith', 'jane@example.com', 30);