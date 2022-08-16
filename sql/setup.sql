-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS yawp_users CASCADE;
DROP TABLE IF EXISTS yawp_restaurants CASCADE;
DROP TABLE IF EXISTS yawp_reviews;

CREATE TABLE yawp_users (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL
);

INSERT INTO yawp_users (
    email,
    password_hash
)

VALUES ('test@example.com', '$2b$10$Q5DX2lEDUGPHZJ2y7nxbT..JbPn1pJ/VxywgBkIgdFVGqwRnqqQSO');

CREATE TABLE yawp_restaurants (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT
);

INSERT INTO yawp_restaurants (
    name, 
    type
)
VALUES
('El Burrito Azteca', 'Mexican');

CREATE TABLE yawp_reviews (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    restaurant_id BIGINT,
    user_id BIGINT,
    content VARCHAR(255) NOT NULL,
    FOREIGN KEY (restaurant_id) REFERENCES yawp_restaurants(id),
    FOREIGN KEY (user_id) REFERENCES yawp_users(id)
);

INSERT INTO yawp_reviews (
    restaurant_id,
    user_id,
    content
)
VALUES 
(1, 1, 'Try the Burrito Azteca! Wet, with shredded beef, and ask for extra salsa verde!');