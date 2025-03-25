CREATE TABLE departement (
    id SERIAL PRIMARY KEY,
    code VARCHAR(50) NOT NULL UNIQUE,
    designation VARCHAR(255) NOT NULL
);
