ALTER TABLE personne ADD COLUMN departement_id BIGINT;

ALTER TABLE personne
ADD CONSTRAINT fk_personne_departement
FOREIGN KEY (departement_id) REFERENCES departement(id);