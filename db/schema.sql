DROP DATABASE IF EXISTS wepost_db;

CREATE DATABASE wepost_db;

-- USE wepost_db;

-- CREATE TABLE comments (
--     commentID INT AUTO_INCREMENT NOT NULL,
--     author VARCHAR(20) DEFAULT "anonymous",
--     comment VARCHAR(250) NOT NULL,
--     PRIMARY KEY (commentID)
-- );

-- CREATE TABLE post (
--     postID INT AUTO_INCREMENT NOT NULL,
--     author VARCHAR(20) DEFAULT "anonymous",
--     title VARCHAR(100) NOT NULL,
--     post VARCHAR(250) NOT NULL,
--     PRIMARY KEY (postID),
--     CONSTRAINT FK_CommentID FOREIGN KEY (postID) REFERENCES comments(commentID)
--     -- CONSTRAINT FK_Comment FOREIGN KEY (comment) REFERENCES comments(comment)
-- );