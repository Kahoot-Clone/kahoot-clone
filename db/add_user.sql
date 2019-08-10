INSERT INTO users
(user_name, auth_id)
VALUES
($1, $2)
returning *;
