CREATE DATABASE racedatabase DEFAULT CHARACTER SET utf8 COLLATE utf8_hungarian_ci;

USE racedatabase;

CREATE TABLE cars(
    id int AUTO_INCREMENT PRIMARY KEY,
    brand VARCHAR(255),
    name VARCHAR(255),
    year int,
    engine VARCHAR(255),
    image_url VARCHAR(255),
    price VARCHAR(255)
);

CREATE TABLE users(
    id int AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255),
    lastname VARCHAR(255),
    firstname VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255)
);

CREATE TABLE orders(
    id int AUTO_INCREMENT PRIMARY KEY,
    fullname VARCHAR(255),
    email VARCHAR(255),
    phonenumber VARCHAR(255),
    address varchar(255),
    comment varchar(255),
    carId int,
    FOREIGN KEY (carId) REFERENCES cars(id)
);

ALTER TABLE users ADD isAdmin TINYINT(1) DEFAULT 0;
ALTER TABLE users MODIFY COLUMN isAdmin TINYINT(1) DEFAULT 0;

INSERT INTO cars(brand, name, year, engine, price, image_url) VALUES 
("Bentley", "Flying Spur Mulliner", 2024, "6.0L, W12, benzinmotor", "300.000 Ft", "Bentley_Flying-Spur-Mulliner_2024.jpg"),
("Bentley", "Bentayga", 2020, "4.0L, V8, benzinmotor", "180.000 Ft", "Bentley_Bentayga_2020.jpg"),
("Bentley", "Continental GT Speed", 2025, "4.0L, V8, Plug-in hibrid", "225.000 Ft", "Bentley_Continental-GT_2025.jpg"),
("Bentley", "Flying Spur V8", 2021, "4.0L, V8, benzinmotor", "210.000 Ft", "Bentley_Flying-Spur-V8_2021.jpg"),
("Bentley", "Continental GT V8 Convertible", 2022, "4.0L, V8, benzinmotor", "230.000 Ft", "Bentley_Continental-GT-V8-Convertible_2022.jpg"),
("Bentley", "Bentayga Speed", 2021, "6.0L, W12, benzinmotor", "250.000 Ft", "Bentley_Bentayga-Speed_2021.jpg"),
("Bentley", "Continental GT Mulliner", 2022, "4.0L, V8, benzinmotor", "270.000 Ft", "Bentley_Continental-GT-Mulliner_2022.jpg"),
("Bentley", "Flying Spur Hybrid", 2022, "2.9L, V6, Plug-in hibrid", "220.000 Ft", "Bentley_Flying-Spur-Hybrid_2022.jpg"),
("Bentley", "Continental GT V8", 2023, "4.0L, V8, benzinmotor", "240.000 Ft", "Bentley_Continental-GT-V8_2023.jpg"),
("Bentley", "Mulsanne W.O. Edition", 2020, "6.75L, V8, benzinmotor", "325.000 Ft", "Bentley_Mulsanne-W.O.-Edition_2020.jpg");

INSERT INTO cars(brand, name, year, engine, price, image_url) VALUES 
("Koenigsegg", "CC850", 2023, "5.0L, V8, benzinmotor", "3.800.000 Ft", "Koenigsegg_CC850_2023.jpg"),
("Koenigsegg", "Jesko", 2020, "5.0L, V8, benzinmotor", "3.200.000 Ft", "Koenigsegg_Jesko_2020.jpg"),
("Koenigsegg", "Gemera", 2020, "2.0L, háromhengeres hibrid", "2.500.000 Ft", "Koenigsegg_Gemera_2020.jpg"),
("Koenigsegg", "Jesko Absolut", 2021, "5.0L, ikerturbós V8", "3.400.000 Ft", "Koenigsegg_Jesko-Absolut_2021.jpg"),
("Koenigsegg", "Agera RS", 2017, "5.0L, ikerturbós V8", "3.500.000 Ft", "Koenigsegg_Agera-RS_2017.jpg"),
("Koenigsegg", "Regera", 2020, "5.0L, ikerturbós V8 + hibrid", "4.000.000 Ft", "Koenigsegg_Regera_2020.jpg");

INSERT INTO cars(brand, name, year, engine, price, image_url) VALUES 
("Mercedes-Benz", "S-Class", 2021, "4.0L, V8, benzinmotor", "140.000 Ft", "Mercedes-Benz_S-Class_2021.jpg"),
("Mercedes-Benz", "Maybach S-Class", 2021, "6.0L, V12, benzinmotor", "180.000 Ft", "Mercedes-Benz_Maybach-S-Class_2021.jpg"),
("Mercedes-Benz", "EQS", 2022, "Elektromos, kettős motor", "110.000 Ft", "Mercedes-Benz_EQS_2022.jpg"),
("Mercedes-Benz", "G-Class", 2021, "4.0L, V8, benzinmotor", "160.000 Ft", "Mercedes-Benz_G-Class_2021.jpg"),
("Mercedes-Benz", "Maybach GLS", 2021, "4.0L, V8, benzinmotor", "170.000 Ft", "Mercedes-Benz_Maybach-GLS_2021.jpg");

INSERT INTO cars(brand, name, year, engine, price, image_url) VALUES 
("Porsche", "911 Turbo", 2021, "3.8L, ikerturbós 6-hengeres", "150.000 Ft", "Porsche_911-Turbo_2021.jpg"),
("Porsche", "Taycan 4S", 2021, "Elektromos, kettős motor", "120.000 Ft", "Porsche_Taycan-4S_2021.jpg"),
("Porsche", "Panamera Turbo", 2020, "4.0L, V8, ikerturbós", "130.000 Ft", "Porsche_Panamera-Turbo_2020.jpg"),
("Porsche", "Cayenne Turbo", 2021, "4.0L, V8, ikerturbós", "140.000 Ft", "Porsche_Cayenne-Turbo_2021.jpg"),
("Porsche", "911 Carrera S", 2021, "3.0L, 6-hengeres", "135.000 Ft", "Porsche_911-Carrera S_2021.jpg"),
("Porsche", "Macan Turbo", 2021, "2.9L, V6, ikerturbós", "110.000 Ft", "Porsche_Macan-Turbo_2021.jpg"),
("Porsche", "718 Cayman GTS", 2021, "4.0L, 6-hengeres", "125.000 Ft", "Porsche_718 Cayman-GTS_2021.jpg");

INSERT INTO cars(brand, name, year, engine, price, image_url) VALUES 
("Lamborghini", "Aventador LP 780-4 Ultimae", 2022, "6.5L, V12, benzinmotor", "350.000 Ft", "Lamborghini_Aventador-LP-780-4-Ultimae_2022.jpg"),
("Lamborghini", "Huracán STO", 2021, "5.2L, V10, benzinmotor", "300.000 Ft", "Lamborghini_Huracán-STO_2021.jpg"),
("Lamborghini", "Sián FKP 37", 2020, "6.5L, V12 + hibrid", "500.000 Ft", "Lamborghini_Sián-FKP-37_2020.jpg"),
("Lamborghini", "Aventador SVJ", 2019, "6.5L, V12, benzinmotor", "400.000 Ft", "Lamborghini_Aventador-SVJ_2019.jpg"),
("Lamborghini", "Huracán EVO", 2020, "5.2L, V10, benzinmotor", "350.000 Ft", "Lamborghini_Huracán-EVO_2020.jpg"),
("Lamborghini", "Urus", 2021, "4.0L, V8, ikerturbós", "270.000 Ft", "Lamborghini_Urus_2021.jpg");

INSERT INTO cars(brand, name, year, engine, price, image_url) VALUES 
("BMW", "M5 CS", 2021, "4.4L, V8, ikerturbós", "200.000 Ft", "BMW_M5-CS_2021.jpg"),
("BMW", "X5 M", 2021, "4.4L, V8, ikerturbós", "210.000 Ft", "BMW_X5-M_2021.jpg"),
("BMW", "i4", 2022, "Elektromos, kettős motor", "120.000 Ft", "BMW_i4_2022.jpg"),
("BMW", "M8", 2020, "4.4L, V8, ikerturbós", "250.000 Ft", "BMW_M8_2020.jpg"),
("BMW", "X6 M", 2021, "4.4L, V8, ikerturbós", "230.000 Ft", "BMW_X6-M_2021.jpg"),
("BMW", "iX M60", 2022, "Elektromos, kettős motor", "230.000 Ft", "BMW_iX-M60_2022.jpg");

INSERT INTO cars(brand, name, year, engine, price, image_url) VALUES 
("Pagani", "Huayra Roadster BC", 2020, "6.0L, V12, ikerturbós", "3.000.000 Ft", "Pagani_Huayra-Roadster-BC_2020.jpg"),
("Pagani",  "Huayra R", 2021, "6.0L, V12, atmoszférikus", "2.800.000 Ft", "Pagani_Huayra-R_2021.jpg"),
("Pagani", "Huayra BC", 2019, "6.0L, V12, ikerturbós", "2.500.000 Ft", "Pagani_Huayra-BC_2019.jpg"),
("Pagani", "Zonda HP Barchetta", 2019, "7.3L, V12, benzinmotor", "4.500.000 Ft", "Pagani_Zonda-HP-Barchetta_2019.jpg"),
("Pagani", "Huayra Roadster", 2020, "6.0L, V12, ikerturbós", "3.200.000 Ft", "Pagani_Huayra-Roadster_2020.jpg"),
("Pagani", "Zonda Cinque Roadster", 2021, "7.3L, V12, benzinmotor", "4.800.000 Ft", "Pagani_Zonda-Cinque-Roadster_2021.jpg");

INSERT INTO cars(brand, name, year, engine, price, image_url) VALUES 
("Rolls-Royce", "Ghost", 2021, "6.75L, V12, benzinmotor", "400.000 Ft", "Rolls-Royce_Ghost_2021.jpg"),
("Rolls-Royce", "Cullinan", 2021, "6.75L, V12, benzinmotor", "450.000 Ft", "Rolls-Royce_Cullinan_2021.jpg"),
("Rolls-Royce", "Phantom", 2022, "6.75L, V12, benzinmotor", "500.000 Ft", "Rolls-Royce_Phantom_2022.jpg"),
("Rolls-Royce", "Dawn", 2020, "6.6L, V12, benzinmotor", "380.000 Ft", "Rolls-Royce_Dawn_2020.jpg"),
("Rolls-Royce", "Wraith", 2020, "6.6L, V12, benzinmotor", "350.000 Ft", "Rolls-Royce_Wraith_2020.jpg"),
("Rolls-Royce", "Ghost Series II", 2021, "6.75L, V12, benzinmotor", "480.000 Ft", "Rolls-Royce_Ghost-Series-II_2021.jpg");

INSERT INTO cars (brand, name, year, engine, price, image_url) VALUES
("Ferrari", "Roma", 2021, "3.9L, V8, benzinmotor", "350.000 Ft", "Ferrari_Roma_2021.jpg"),
("Ferrari", "F8 Tributo", 2021, "3.9L, V8, benzinmotor", "400.000 Ft", "Ferrari_F8-Tributo_2021.jpg"),
("Ferrari", "SF90 Stradale", 2022, "4.0L, V8, hibrid", "550.000 Ft", "Ferrari_SF90-Stradale_2022.jpg"),
("Ferrari", "812 Superfast", 2020, "6.5L, V12, benzinmotor", "500.000 Ft", "Ferrari_812-Superfast_2020.jpg"),
("Ferrari", "Portofino M", 2021, "3.9L, V8, benzinmotor", "380.000 Ft", "Ferrari_Portofino-M_2021.jpg"),
("Ferrari", "LaFerrari", 2015, "6.3L, V12, hibrid", "1.000.000 Ft", "Ferrari_LaFerrari_2015.jpg");

INSERT INTO cars (brand, name, year, engine, price, image_url) VALUES
("Aston Martin", "DB11", 2021, "4.0L, V8, benzinmotor", "320.000 Ft", "Aston-Martin_DB11_2021.jpg"),
("Aston Martin", "Vantage", 2022, "4.0L, V8, benzinmotor", "350.000 Ft", "Aston-Martin_Vantage_2022.jpg"),
("Aston Martin", "DBS Superleggera", 2021, "5.2L, V12, benzinmotor", "500.000 Ft", "Aston-Martin_DBS-Superleggera_2021.jpg"),
("Aston Martin", "Rapide AMR", 2020, "6.0L, V12, benzinmotor", "450.000 Ft", "Aston-Martin_Rapide-AMR_2020.jpg"),
("Aston Martin", "Valhalla", 2023, "4.0L, V8, hibrid", "600.000 Ft", "Aston-Martin_Valhalla_2023.jpg"),
("Aston Martin", "Valkyrie", 2022, "6.5L, V12, hibrid", "1.200.000 Ft", "Aston-Martin_Valkyrie_2022.jpg");