CREATE TABLE games (
                       id UUID PRIMARY KEY,
                       white_player VARCHAR(50) NOT NULL,
                       black_player VARCHAR(50) NOT NULL,
                       status VARCHAR(20) NOT NULL,
                       fen VARCHAR(100) NOT NULL,
                       created_at TIMESTAMPTZ NOT NULL
);
