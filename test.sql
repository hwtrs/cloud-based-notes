CREATE DATABASE notes_app;
USE notes_app;

CREATE TABLE notes (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    contents TEXT NOT NULL,
    created TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE logins (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    password TEXT NOT NULL,
    created TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO notes (user_id, title, contents)
VALUES
(1, 'Note 1', 'Note 1 contents'),
(2, 'Note 2', 'Note 2 contents')

INSERT INTO logins (username, password)
VALUES
('hello', '123');
