CREATE TABLE users (
  username VARCHAR(20) PRIMARY KEY,
  password TEXT NOT NULL,
  email TEXT NOT NULL,
  bio TEXT 
);

CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  message_from TEXT NOT NULL REFERENCES users ON DELETE CASCADE ON UPDATE CASCADE,
  message_to TEXT NOT NULL REFERENCES users ON DELETE CASCADE ON UPDATE CASCADE,
  body text NOT NULL,
  sent_at timestamp with time zone NOT NULL,
  read_at timestamp with time zone
);

CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  owner_username TEXT NOT NULL REFERENCES users on DELETE CASCADE ON UPDATE CASCADE,
  name VARCHAR (50) UNIQUE NOT NULL,
  project_desc TEXT NOT NULL,
  timeframe TEXT NOT NULL,
  github_repo TEXT 
);

CREATE TABLE project_members(
  id SERIAL PRIMARY KEY,
  project_id INT NOT NULL REFERENCES projects ON DELETE CASCADE,
  username TEXT NOT NULL REFERENCES users on DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE matches (
  id SERIAL PRIMARY KEY,
  project_id INT NOT NULL REFERENCES projects ON DELETE CASCADE,
  username TEXT NOT NULL REFERENCES users ON DELETE CASCADE ON UPDATE CASCADE
);