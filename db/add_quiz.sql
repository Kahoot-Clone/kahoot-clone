INSERT INTO quizes
(user_id, quiz_name, info)
VALUES
($1, $2, $3);
select * from quizes where quiz_name = $2