-- SQLite

-- Create Leading Companies table
CREATE TABLE leadingCompanies (
    companyId integer PRIMARY KEY AUTOINCREMENT,
    name text not null,
    litersPerYear decimal not null
);

INSERT INTO leadingCompanies (name, litersPerYear)
VALUES ('SerpentShield Biotech', 1250),
('VenoGuard Pharmaceuticals', 980),
('OuroPharm Labs', 1100),
('FangSafe Solutions', 875),
('CoilCure Therapeutics', 1320),
('Scalesure Research Group', 1040),
('ApexViper Sciences', 1160),
('Reptilix Labs', 930),
('VenaCava Innovations', 1070),
('Venotrek BioSystems', 890);

SELECT * FROM leadingCompanies;

-- Create Top Snake Milkers of 2025 table (individuals)
CREATE TABLE topSnakeMilkers (
    snakeMilkerId integer PRIMARY KEY AUTOINCREMENT,
    name text not null,
    safetyRating decimal not null,
    hoursCommitted integer not NULL
);

INSERT INTO topSnakeMilkers (name, safetyRating, hoursCommitted)
VALUES ('Ethan "Fang" Calder', 9.8, 4120),
('Marissa Venn', 9.5, 3880),
('Lucas Trent', 8.9, 2750),
('Sofia Darrow', 9.2, 3250),
('Jasper "Venom" Price', 8.4, 2100),
('Kiara Moss', 9.7, 4450),
('Dominic Rhee', 8.8, 3020),
('Natalie Brooks', 9.1, 3600),
('Felix Mendez', 8.5, 2340),
('Rina Patel', 9.4, 4000);

SELECT * FROM topSnakeMilkers;


CREATE TABLE IF NOT EXISTS snakeStatistics (
    snakeId integer PRIMARY KEY AUTOINCREMENT,
    name text not null,
    binomialName text not null,
    venomType text not null,
    danger text not null,  
    rating integer not null,
    image text not null,
    editable boolean not null DEFAULT 0
);

DROP TABLE IF EXISTS snakeStatistics;

INSERT INTO snakeStatistics (name, binomialName, venomType, danger, rating, image)
VALUES 
('King Cobra', 'Ophiophagus hannah', 'Neurotoxic', 'High', 5, 'kingCobra.png'),
('Black Mamba', 'Dendroaspis polylepis', 'Neurotoxic', 'High', 5, 'blackMamba.png'),
('Inland Taipan', 'Oxyuranus microlepidotus', 'Neurotoxic', 'Very High', 5, 'inlandTaipan.png'),
('Eastern Diamondback Rattlesnake', 'Crotalus adamanteus', 'Hemotoxic', 'High', 4, 'easternDiamondback.png'),
('Fer-de-Lance', 'Bothrops asper', 'Hemotoxic', 'High', 4, 'ferDeLance.png'),
('Puff Adder', 'Bitis arietans', 'Cytotoxic', 'Moderate', 3, 'puffAdder.png'),
('Saw-Scaled Viper', 'Echis carinatus', 'Hemotoxic', 'Moderate', 3, 'sawScaledViper.png'),
('Coastal Taipan', 'Oxyuranus scutellatus', 'Neurotoxic', 'High', 4, 'costalTaipan.png'),
('Gaboon Viper', 'Bitis gabonica', 'Hemotoxic + Cytotoxic', 'High', 4, 'gaboonViper.png'),
('Mojave Rattlesnake', 'Crotalus scutulatus', 'Neurotoxic + Hemotoxic', 'High', 4, 'mojaveRattlesnake.png');


SELECT * FROM snakeStatistics;

-- Create shop items table
CREATE TABLE snakeShop (
    shopId integer PRIMARY KEY AUTOINCREMENT,
    name text not null,
    category text not null,
    price decimal not null
);

INSERT INTO snakeShop (name, category, price)
VALUES ('Glow-in-the-Dark Keychain', 'Souvenir', 6.99),
('Snake Milker Action Figure', 'Toy', 14.95),
('Snake Milker Tee', 'Apparel', 22.00),
('Copperhead Coffee Mug', 'Kitchen', 12.50),
('Antivenom Lab DIY Kit', 'Toy', 19.99),
('Leather Snake Wrap Bracelet', 'Apparel', 16.00),
('Venomous Knowledge: Museum Guidebook', 'Book', 11.99),
('Rattlesnake Plush Toy', 'Toy', 13.75),
('Envenomation Emergency Magnet', 'Kitchen', 4.50),
('Limited Edition Venom Flask', 'Souvenir', 39.99);

SELECT * FROM snakeShop;