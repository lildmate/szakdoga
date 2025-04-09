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
("Bentley", "Flying Spur Mulliner", 2024, "6.0L, W12, benzinmotor", "300.000 Ft", "https://www.bentleyofgreenwich.com/imagetag/7165/main/l/New-2024-Bentley-Flying-Spur-Mulliner-W12.jpg"),
("Bentley", "Bentayga", 2020, "4.0L, V8, benzinmotor", "180.000 Ft", "https://d3jvxfsgjxj1vz.cloudfront.net/news/wp-content/uploads/2020/07/01101658/Image-1-The-New-Bentayga-Front.jpg"),
("Bentley", "Continental GT Speed", 2025, "4.0L, V8, Plug-in hibrid", "225.000 Ft", "https://carsguide-res.cloudinary.com/image/upload/f_auto,fl_lossy,q_auto,t_default/v1/editorial/review/hero_image/2025-Bentley-Continental-GT-Speed-Anthracite-Satin-1001x565.jpg"),
("Bentley", "Flying Spur V8", 2021, "4.0L, V8, benzinmotor", "210.000 Ft", "https://media.autoexpress.co.uk/image/private/s--X-WVjvBW--/f_auto,t_content-image-full-desktop@1/v1611675481/autoexpress/2021/01/Bentley%20Flying%20Spur%20V8.jpg"),
("Bentley", "Continental GT V8 Convertible", 2022, "4.0L, V8, benzinmotor", "230.000 Ft", "https://www.goldcoastautogallery.com/galleria_images/11271/11271_p2_l.jpg"),
("Bentley", "Bentayga Speed", 2021, "6.0L, W12, benzinmotor", "250.000 Ft", "https://www.amlu.com/wp-content/uploads/2020/08/2021-bentley-bentayga-speed-keeps-fastest-suv-crown9-730x450.jpg"),
("Bentley", "Continental GT Mulliner", 2022, "4.0L, V8, benzinmotor", "270.000 Ft", "https://editorial.pxcrush.net/carsales/general/editorial/bentley-continental-gt-mulliner-08.jpg?width=1024&height=682"),
("Bentley", "Flying Spur Hybrid", 2022, "2.9L, V6, Plug-in hibrid", "220.000 Ft", "https://hips.hearstapps.com/hmg-prod/images/2022-bentley-flying-spur-hybrid-545-1659030974.jpg?crop=0.910xw:0.681xh;0.0897xw,0.297xh&resize=1200:*"),
("Bentley", "Continental GT V8", 2023, "4.0L, V8, benzinmotor", "240.000 Ft", "https://hips.hearstapps.com/hmg-prod/images/2023-bentley-continental-gt-s-coupe-101-1654526518.jpg?crop=0.767xw:0.648xh;0.0651xw,0.220xh&resize=2048:*"),
("Bentley", "Mulsanne W.O. Edition", 2020, "6.75L, V8, benzinmotor", "325.000 Ft", "https://da4dkroembtou.cloudfront.net/wp-content/uploads/2020/03/BL4A9053-NEW00-Custom.jpg");

INSERT INTO cars(brand, name, year, engine, price, image_url) VALUES 
("Koenigsegg", "CC850", 2023, "5.0L, V8, benzinmotor", "3.800.000 Ft", "https://i.pinimg.com/originals/29/4a/d0/294ad097c1f9a1b0431e0b818e907691.jpg"),
("Koenigsegg", "Jesko", 2020, "5.0L, V8, benzinmotor", "3.200.000 Ft", "https://img.hvg.hu/Img/b2dea50fcee14f6eb810034566fbfb2e/4cdb0991-e1b3-4259-a2ad-680dc0a225e5.jpg"),
("Koenigsegg", "Gemera", 2020, "2.0L, háromhengeres hibrid", "2.500.000 Ft", "https://elektromosauto.hu/wp-content/uploads/2020/03/Koenigsegg-Gemera-01.jpg"),
("Koenigsegg", "Jesko Absolut", 2021, "5.0L, ikerturbós V8", "3.400.000 Ft", "https://www.supercars.net/blog/wp-content/uploads/2019/04/Jesko2.jpg"),
("Koenigsegg", "Agera RS", 2017, "5.0L, ikerturbós V8", "3.500.000 Ft", "https://www.supervettura.com/blobs/Cars/48/5a8c9adf-653b-49ba-b3c4-9d03f0f96158.jpg?width=1920&height=1080&mode=crop"),
("Koenigsegg", "Regera", 2020, "5.0L, ikerturbós V8 + hibrid", "4.000.000 Ft", "https://www.europeanprestige.co.uk/blobs/stock/343/images/6bfb3b2d-4f88-47ad-9d2d-c63bc36cbd0d/hi4a1842.jpg?width=2000&height=1333");

INSERT INTO cars(brand, name, year, engine, price, image_url) VALUES 
("Mercedes-Benz", "S-Class", 2021, "4.0L, V8, benzinmotor", "140.000 Ft", "https://media.autoexpress.co.uk/image/private/s--X-WVjvBW--/f_auto,t_content-image-full-desktop@1/v1620898674/autoexpress/2021/05/Mercedes%20S-Class%202021%20UK-18.jpg"),
("Mercedes-Benz", "Maybach S-Class", 2021, "6.0L, V12, benzinmotor", "180.000 Ft", "https://www.topgear.com/sites/default/files/images/news-article/2020/11/86d1c7742a1e093a83487debca97eecd/20c0535_179.jpg"),
("Mercedes-Benz", "EQS", 2022, "Elektromos, kettős motor", "110.000 Ft", "https://media.ed.edmunds-media.com/mercedes-benz/eqs/2022/oem/2022_mercedes-benz_eqs_sedan_amg-eqs_fq_oem_1_1600.jpg"),
("Mercedes-Benz", "G-Class", 2021, "4.0L, V8, benzinmotor", "160.000 Ft", "https://media.ed.edmunds-media.com/mercedes-benz/g-class/2021/oem/2021_mercedes-benz_g-class_4dr-suv_amg-g-63_fq_oem_1_1600.jpg"),
("Mercedes-Benz", "Maybach GLS", 2021, "4.0L, V8, benzinmotor", "170.000 Ft", "https://www.motortrend.com/uploads/sites/5/2020/12/2021-Mercedes-Maybach-GLS-600-4Matic-11.jpg");

INSERT INTO cars(brand, name, year, engine, price, image_url) VALUES 
("Porsche", "911 Turbo", 2021, "3.8L, ikerturbós 6-hengeres", "150.000 Ft", "https://fotografias.larazon.es/clipping/cmsimages01/2020/07/31/26E852AC-2051-454C-96BB-AA368DC33DBB/98.jpg?crop=787,443,x0,y74&width=1900&height=1069&optimize=low&format=webply"),
("Porsche", "Taycan 4S", 2021, "Elektromos, kettős motor", "120.000 Ft", "https://cdn.elferspot.com/wp-content/uploads/2021/01/porsche-taycan-1726-xxl_kfz69307501_dsc_8071..jpg?class=xl"),
("Porsche", "Panamera Turbo", 2020, "4.0L, V8, ikerturbós", "130.000 Ft", "https://hips.hearstapps.com/hmg-prod/images/2020-porsche-panamera-turbo-mmp-1-1579209005.jpg?crop=0.521xw:0.694xh;0.00651xw,0.240xh&resize=768:*"),
("Porsche", "Cayenne Turbo", 2021, "4.0L, V8, ikerturbós", "140.000 Ft", "https://player.hu/uploads/2021/07/porsche-cayenne-coupe-turbo-gt-1.jpg"),
("Porsche", "911 Carrera S", 2021, "3.0L, 6-hengeres", "135.000 Ft", "https://robbreport.com.au/application/assets/2021/05/1-13-e1621472555244.jpeg"),
("Porsche", "Macan Turbo", 2021, "2.9L, V6, ikerturbós", "110.000 Ft", "https://static0.carbuzzimages.com/wordpress/wp-content/uploads/gallery-images/original/674000/700/674788.jpg"),
("Porsche", "718 Cayman GTS", 2021, "4.0L, 6-hengeres", "125.000 Ft", "https://images-porsche.imgix.net/-/media/4824F0B3C7B742CE8E672F804BE2BDFB_8B83A23F3C8B4626AE3AB02E47D1E84A_CM21N3KOX0005-cayman-gts-40-driving?w=2560&h=1441&q=45&crop=faces%2Centropy%2Cedges&auto=format");

INSERT INTO cars(brand, name, year, engine, price, image_url) VALUES 
("Lamborghini", "Aventador LP 780-4 Ultimae", 2022, "6.5L, V12, benzinmotor", "350.000 Ft", "https://www.lamborghinigoldcoast.com/imagetag/9874/2/l/New-2022-Lamborghini-Aventador-LP-780-4-Ultimae-1647974877.jpg"),
("Lamborghini", "Huracán STO", 2021, "5.2L, V10, benzinmotor", "300.000 Ft", "https://media.autoexpress.co.uk/image/private/s--X-WVjvBW--/f_auto,t_content-image-full-desktop@1/v1632415640/autoexpress/2021/09/Lamborghini%20Huracan%20STO%202021%20review-5.jpg"),
("Lamborghini", "Sián FKP 37", 2020, "6.5L, V12 + hibrid", "500.000 Ft", "https://cdn-ds.com/blogs-media/sites/94/2022/12/18031729/Front-view-of-the-Lamborghini-Sian-FKP-37-parked-A_o.jpg"),
("Lamborghini", "Aventador SVJ", 2019, "6.5L, V12, benzinmotor", "400.000 Ft", "https://www.europeanprestige.co.uk/blobs/stock/160/images/05866226-b060-40b7-b027-93d2bf928528/1j6a9063-edit.jpg?width=2000&height=1333"),
("Lamborghini", "Huracán EVO", 2020, "5.2L, V10, benzinmotor", "350.000 Ft", "https://imageio.forbes.com/blogs-images/kbrauer/files/2019/07/2020-Lamborghini-Huracan-Evo-Spyder-Driving-Front.jpg?format=jpg&height=900&width=1600&fit=bounds"),
("Lamborghini", "Urus", 2021, "4.0L, V8, ikerturbós", "270.000 Ft", "https://i.insider.com/605a2b7a106eb50019d052a0?width=700");

INSERT INTO cars(brand, name, year, engine, price, image_url) VALUES 
("BMW", "M5 CS", 2021, "4.4L, V8, ikerturbós", "200.000 Ft", "https://img.hvg.hu/Img/b2dea50fcee14f6eb810034566fbfb2e/8804156a-b4ac-4d04-a48c-f73d9fab27fa.jpg"),
("BMW", "X5 M", 2021, "4.4L, V8, ikerturbós", "210.000 Ft", "https://hips.hearstapps.com/hmg-prod/images/2020-bmw-x5-m-104-1582911121.jpg?crop=0.721xw:0.662xh;0.256xw,0.217xh&resize=2048:*"),
("BMW", "i4", 2022, "Elektromos, kettős motor", "120.000 Ft", "https://hips.hearstapps.com/hmg-prod/images/2022-bmw-i4-m50-114-1633973115.jpg?crop=1.00xw:0.846xh;0,0&resize=2048:*"),
("BMW", "M8", 2020, "4.4L, V8, ikerturbós", "250.000 Ft", "https://media.carsandbids.com/cdn-cgi/image/width=2080,quality=70/9004500a220bf3a3d455d15ee052cf8c332606f8/photos/3BkQBnZ5-MmdMArb6Ld-(edit).jpg?t=166922317584"),
("BMW", "X6 M", 2021, "4.4L, V8, ikerturbós", "230.000 Ft", "https://img.autotrader.co.za/13324616"),
("BMW", "iX M60", 2022, "Elektromos, kettős motor", "230.000 Ft", "https://cdn.bimmertoday.de/wp-content/uploads/2021/09/Fahrbericht-BMW-iX-2022-Elektro-SUV-01-750x500.jpg");

INSERT INTO cars(brand, name, year, engine, price, image_url) VALUES 
("Pagani", "Huayra Roadster BC", 2020, "6.0L, V12, ikerturbós", "3.000.000 Ft", "https://hips.hearstapps.com/hmg-prod/images/pagani-huayra-roadster-bc-101-1634741760.jpg?crop=0.655xw:0.983xh;0.160xw,0&resize=1200:*"),
("Pagani",  "Huayra R", 2021, "6.0L, V12, atmoszférikus", "2.800.000 Ft", "https://news.dupontregistry.com/wp-content/uploads/2021/11/Pagani-main.jpg"),
("Pagani", "Huayra BC", 2019, "6.0L, V12, ikerturbós", "2.500.000 Ft", "https://vezess2.p3k.hu/app/uploads/2019/07/pagani-huayra_roadster_bc-2020-1600-02.jpg"),
("Pagani", "Zonda HP Barchetta", 2019, "7.3L, V12, benzinmotor", "4.500.000 Ft", "https://exclusivecarregistry.com/render-images?imgid=328359"),
("Pagani", "Huayra Roadster", 2020, "6.0L, V12, ikerturbós", "3.200.000 Ft", "https://hips.hearstapps.com/hmg-prod/images/pagani-huayra-bc-roadster-121-1564501509.jpg?crop=0.746xw:0.686xh;0.135xw,0.263xh&resize=2048:*"),
("Pagani", "Zonda Cinque Roadster", 2021, "7.3L, V12, benzinmotor", "4.800.000 Ft", "https://www.carscoops.com/wp-content/uploads/2021/05/Pagani-Zonda-Cinque-Roadster.jpg");

INSERT INTO cars(brand, name, year, engine, price, image_url) VALUES 
("Rolls-Royce", "Ghost", 2021, "6.75L, V12, benzinmotor", "400.000 Ft", "https://media.evo.co.uk/image/private/s--X-WVjvBW--/f_auto,t_content-image-full-desktop@1/v1622811271/evo/2021/06/2021%20Rolls-Royce%20Ghost%20review%20-3.jpg"),
("Rolls-Royce", "Cullinan", 2021, "6.75L, V12, benzinmotor", "450.000 Ft", "https://static0.carbuzzimages.com/wordpress/wp-content/uploads/gallery-images/original/829000/300/829300.jpg"),
("Rolls-Royce", "Phantom", 2022, "6.75L, V12, benzinmotor", "500.000 Ft", "https://media.autoexpress.co.uk/image/private/s--X-WVjvBW--/f_auto,t_content-image-full-desktop@1/v1641399048/autoexpress/2022/01/Rolls-Royce%20Phantom%20facelift-11.jpg"),
("Rolls-Royce", "Dawn", 2020, "6.6L, V12, benzinmotor", "380.000 Ft", "https://hips.hearstapps.com/hmg-prod/images/2020-rolls-royce-dawn-101-1585340318.jpg"),
("Rolls-Royce", "Wraith", 2020, "6.6L, V12, benzinmotor", "350.000 Ft", "https://vehicle-direct.ca/wp-content/uploads/2022/02/22033_7.jpg"),
("Rolls-Royce", "Ghost Series II", 2021, "6.75L, V12, benzinmotor", "480.000 Ft", "https://hips.hearstapps.com/hmg-prod/images/p90572193-highres-rolls-royce-ghost-se-670548514f3f2.jpg");

INSERT INTO cars (brand, name, year, engine, price, image_url) VALUES
("Ferrari", "Roma", 2021, "3.9L, V8, benzinmotor", "350.000 Ft", "https://hips.hearstapps.com/hmg-prod/images/2021-ferrari-roma-119-1599666409.jpg?crop=0.649xw:0.548xh;0.0593xw,0.377xh&resize=2048:*"),
("Ferrari", "F8 Tributo", 2021, "3.9L, V8, benzinmotor", "400.000 Ft", "https://www.topgear.com/sites/default/files/cars-car/image/2019/09/tg_-_ferrari_f8_tributo_-091.jpg"),
("Ferrari", "SF90 Stradale", 2022, "4.0L, V8, hibrid", "550.000 Ft", "https://images.collectingcars.com/014927/DSC-5299.jpg?w=1263&fit=fillmax&crop=edges&auto=format,compress&cs=srgb&q=85"),
("Ferrari", "812 Superfast", 2020, "6.5L, V12, benzinmotor", "500.000 Ft", "https://philipireland.com/_userfiles/pages/images/cars/812_superfast_blue_elettrico/ferrari_812_superfast_13_1498x1000.jpg"),
("Ferrari", "Portofino M", 2021, "3.9L, V8, benzinmotor", "380.000 Ft", "https://imageio.forbes.com/specials-images/imageserve/613bc72ea458667e500110ff/Portofino-M/960x0.jpg?format=jpg&width=960"),
("Ferrari", "LaFerrari", 2015, "6.3L, V12, hibrid", "1.000.000 Ft", "https://hips.hearstapps.com/hmg-prod/amv-prod-cad-assets/images/14q2/584476/2014-ferrari-laferrari-first-drive-review-car-and-driver-photo-584762-s-original.jpg");

INSERT INTO cars (brand, name, year, engine, price, image_url) VALUES
("Aston Martin", "DB11", 2021, "4.0L, V8, benzinmotor", "320.000 Ft", "https://media.ed.edmunds-media.com/aston-martin/db11/2021/oem/2021_aston-martin_db11_coupe_amr_fq_oem_1_1600.jpg"),
("Aston Martin", "Vantage", 2022, "4.0L, V8, benzinmotor", "350.000 Ft", "https://hips.hearstapps.com/hmg-prod/images/2021-aston-martin-vantage-f1-edition-121-1624330069.jpg?crop=0.811xw:0.608xh;0.0641xw,0.166xh&resize=1200:*"),
("Aston Martin", "DBS Superleggera", 2021, "5.2L, V12, benzinmotor", "500.000 Ft", "https://di-uploads-pod26.dealerinspire.com/mikewardastonmartin/uploads/2021/02/OEP5-Cfw.jpeg"),
("Aston Martin", "Rapide AMR", 2020, "6.0L, V12, benzinmotor", "450.000 Ft", "https://media.carsandbids.com/cdn-cgi/image/width=2080,quality=70/ee7f173e46ec801a48d1673c50f9cebaa1bf2854/photos/Kmv47nnN-6ZA2Xe62un-(edit).jpg?t=165887271964"),
("Aston Martin", "Valhalla", 2023, "4.0L, V8, hibrid", "600.000 Ft", "https://mycarheaven.com/wp-content/uploads/2023/07/Valhalla-sexy.webp"),
("Aston Martin", "Valkyrie", 2022, "6.5L, V12, hibrid", "1.200.000 Ft", "https://hips.hearstapps.com/hmg-prod/images/2022-aston-martin-valkyrie-74429-63ff6e4697378.jpg?crop=0.659xw:0.555xh;0.0705xw,0.365xh&resize=2048:*");