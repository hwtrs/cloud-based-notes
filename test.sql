CREATE DATABASE notes_app;
USE notes_app;

CREATE TABLE notes (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    contents TEXT NOT NULL,
    created TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE logins (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    pword TEXT NOT NULL,
    created TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO notes (title, contents)
VALUES
('Note 1', 'Test Test Test'),
('Note 2', 'Test Test')

INSERT INTO logins (username, password)
VALUES
('hello', '123');
