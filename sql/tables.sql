-- CREATE TABLE cot.rutinas (
--     id                        SERIAL PRIMARY KEY,
--     created               bigint NOT NULL,
--     uuid
--     idusuario                 INTEGER REFERENCES cot.usuarios(uuid),
--     idstars                   INTEGER REFERENCES cot.stars(idstars),
--     idbien                    INTEGER REFERENCES cot.bien(idbien),
-- );

CREATE TABLE rutinasCompletadas (
    id                    INTEGER UNIQUE PRIMARY KEY,
    created               bigint NOT NULL,
    minutos               INTEGER NOT NULL,
    tipo                  TEXT NOT NULL,
);

INSERT INTO
	rutinasCompletadas
	(created, minutos, tipo)
VALUES
	(date('now'),30,"Cardio"),
	( date('now'),30,"Cardio")