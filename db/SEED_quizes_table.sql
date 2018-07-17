CREATE TABLE quizes (
    id SERIAL PRIMARY KEY, 
    user_id INTEGER,
    quiz_name VARCHAR(128),
    info VARCHAR(256)
);


/*Sample Data*/
INSERT INTO quizes
(user_id, quiz_name, info)
VALUES
(1, 'First Sample Quiz', 'This is our first sample quiz. Neet!'),
(1, 'second Quiz', 'another quizz. Neeter')