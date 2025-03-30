import cors from 'cors';
import express from 'express';
import argon from 'argon2';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise'
import nodemailer from 'nodemailer';

dotenv.config();
const app = express();
app.use(cors({
    exposedHeaders: ['Authorization']
}));
app.use(express.json());
const PORT = 3000;
app.use(cors({ origin: 'http://localhost:3001' }));

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'racedatabase',
});

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})

const checkAdmin = (decodedToken) => {
    return decodedToken.isAdmin === true;
};

app.post("/register", async (req, res) => {
    const { username, lastname, firstname, email, password } = req.body;

    try {
        const [users] = await db.query("SELECT * FROM users WHERE username = ?", [username]);
        if (users.length > 0) {
            return res.status(400).json({ message: "Már létezik ilyen felhasználónév." });
        }

        const hashedPassword = await argon.hash(password);
        
        // Alapértelmezés szerint nem admin (isAdmin = 0)
        await db.query(
            "INSERT INTO users (username, lastname, firstname, email, password, isAdmin) VALUES (?, ?, ?, ?, ?, 0)",
            [username, lastname, firstname, email, hashedPassword]
        );
    
        const mailOptions = {
            from: "kucsikgabor22@gmail.com",
            to: email,
            subject: "Sikeres regisztráció!",
            text: `Kedves ${username},\n\nÜdvözlünk a Race-001 Autókölcsönző weboldalán! 🎉\n\nÖrömmel értesítünk, hogy sikeresen regisztráltál a weboldalunkra!\nHa bármiben segítségedre lehetünk, akkor a Kapcsolat fülnél találsz rólunk információkat, és írhatsz is nekünk!\n\nKellemes időt kívánunk a platformon!\n\nÜdv,\nA Race-001 csapata 🚗`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Hiba az e-mail küldése közben!");
            } else {
                console.log(`Az e-mail sikeresen elküldve a ${email} címre.`)
            }
        });
        
        res.status(201).json({ message: "Sikeres regisztrálás!" });
    } catch (err) {
        console.error("Hiba regisztráció közben: ", err);
        res.status(500).json({ message: "Hiba a regisztráció közben." });
    }
});


// Login
app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        const [users] = await db.query("SELECT * FROM users WHERE username = ?", [username]);
        if (users.length === 0) {
            return res.status(400).json({ message: "Nincs ilyen felhasználó." });
        }
        const user = users[0];

        const isMatch = await argon.verify(user.password, password);
        if (!isMatch) {
            return res.status(400).json({ message: "Hibás jelszó." });
        }

        const token = jwt.sign(
            {
                id: user.id,
                username: user.username,
                isAdmin: user.isAdmin === 1 // Itt az adatbázisból olvassuk az admin státuszt
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
        res.json({ token, isAdmin: user.isAdmin === 1 });
    } catch (err) {
        console.error("Hiba a bejelentkezésnél (backend)", err);
        res.status(500).json({ message: "Hiba a bejelentkezésnél." });
    }
});


app.get("/user", async (req, res) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ message: "Hitelesítés sikertelen: Nincs token." });
    }

    const token = authorization.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Hitelesítés sikertelen: Nincs ilyen formátumú token." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const [users] = await db.query("SELECT id, username, firstname, lastname, email, isAdmin FROM users WHERE id = ?", [decoded.id]);

        if (users.length === 0) {
            return res.status(404).json({ message: "Nem található felhasználó." });
        }

        res.json({ 
            id: users[0].id, 
            username: users[0].username, 
            firstname: users[0].firstname, 
            lastname: users[0].lastname, 
            email: users[0].email,
            isAdmin: users[0].isAdmin === 1 // Itt is az adatbázisból olvassuk
        });
    } catch (err) {
        console.error("Hiba a backendben:", err);
        res.status(401).json({ message: "Sikertelen hitelesítés: Hibás token." });
    }
});

app.get("/allUsers", async (req, res) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ message: "Hitelesítés szükséges" });
    }

    try {
        const token = authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        if (!checkAdmin(decoded)) {
            return res.status(403).json({ message: "Nincs admin jogosultság" });
        }

        const [users] = await db.query("SELECT id, username, firstname, lastname, email, isAdmin FROM users");
        res.json(users);
    } catch (err) {
        console.error("Hiba a felhasználók lekérésekor:", err);
        res.status(500).json({ message: "Hiba a felhasználók lekérésekor" });
    }
});

app.get("/allOrders", async (req, res) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ message: "Hitelesítés szükséges" });
    }

    try {
        const token = authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        if (!checkAdmin(decoded)) {
            return res.status(403).json({ message: "Nincs admin jogosultság" });
        }

        const [orders] = await db.query("SELECT * FROM orders");
        res.json(orders);
    } catch (err) {
        console.error("Hiba a rendelések lekérésekor:", err);
        res.status(500).json({ message: "Hiba a rendelések lekérésekor" });
    }
});

app.delete("/deleteUser/:id", async (req, res) => {
    const { authorization } = req.headers;
    const userId = req.params.id;

    if (!authorization) {
        return res.status(401).json({ message: "Hitelesítés szükséges" });
    }

    try {
        const token = authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        if (!checkAdmin(decoded)) {
            return res.status(403).json({ message: "Nincs admin jogosultság" });
        }

        await db.query("DELETE FROM users WHERE id = ?", [userId]);
        res.json({ message: "Felhasználó sikeresen törölve" });
    } catch (err) {
        console.error("Hiba a felhasználó törlésekor:", err);
        res.status(500).json({ message: "Hiba a felhasználó törlésekor" });
    }
});

// Autó törlése (csak admin)
app.delete("/deleteCar/:id", async (req, res) => {
    const { authorization } = req.headers;
    const carId = req.params.id;

    if (!authorization) {
        return res.status(401).json({ message: "Hitelesítés szükséges" });
    }

    try {
        const token = authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        if (!checkAdmin(decoded)) {
            return res.status(403).json({ message: "Nincs admin jogosultság" });
        }

        await db.query("DELETE FROM cars WHERE id = ?", [carId]);
        res.json({ message: "Autó sikeresen törölve" });
    } catch (err) {
        console.error("Hiba az autó törlésekor:", err);
        res.status(500).json({ message: "Hiba az autó törlésekor" });
    }
});

app.delete("/deleteOrder/:id", async (req, res) => {
    const { authorization } = req.headers;
    const orderId = req.params.id;

    if (!authorization) {
        return res.status(401).json({ message: "Hitelesítés szükséges" });
    }

    try {
        const token = authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        if (!checkAdmin(decoded)) {
            return res.status(403).json({ message: "Nincs admin jogosultság" });
        }

        await db.query("DELETE FROM orders WHERE id = ?", [orderId]);
        res.json({ message: "Rendelés sikeresen törölve" });
    } catch (err) {
        console.error("Hiba a rendelés törlésekor:", err);
        res.status(500).json({ message: "Hiba a rendelés törlésekor" });
    }
});

// Admin státusz frissítése
app.put("/updateAdminStatus/:id", async (req, res) => {
    const { authorization } = req.headers;
    const userId = req.params.id;
    const { isAdmin } = req.body;

    if (!authorization) {
        return res.status(401).json({ message: "Hitelesítés szükséges" });
    }

    try {
        const token = authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        if (!checkAdmin(decoded)) {
            return res.status(403).json({ message: "Nincs admin jogosultság" });
        }

        // Convert boolean to tinyint (1 or 0) for MySQL
        const adminValue = isAdmin ? 1 : 0;
        
        await db.query("UPDATE users SET isAdmin = ? WHERE id = ?", [adminValue, userId]);
        
        // Also update the JWT if the user is modifying their own status
        if (decoded.id === parseInt(userId)) {
            const newToken = jwt.sign(
                {
                    id: decoded.id, 
                    username: decoded.username,
                    isAdmin: isAdmin
                }, 
                process.env.JWT_SECRET, 
                {expiresIn: "1h"}
            );
            return res.json({ message: "Admin státusz sikeresen frissítve", token: newToken });
        }
        
        res.json({ message: "Admin státusz sikeresen frissítve" });
    } catch (err) {
        console.error("Hiba az admin státusz frissítésekor:", err);
        res.status(500).json({ message: "Hiba az admin státusz frissítésekor" });
    }
});

app.put("/updateCar/:id", async (req, res) => {
    const { authorization } = req.headers;
    const carId = req.params.id;
    const { brand, name, year, engine, price, image_url } = req.body;

    if (!authorization) {
        return res.status(401).json({ message: "Hitelesítés szükséges" });
    }

    try {
        const token = authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        if (!checkAdmin(decoded)) {
            return res.status(403).json({ message: "Nincs admin jogosultság" });
        }

        await db.query(
            "UPDATE cars SET brand = ?, name = ?, year = ?, engine = ?, price = ?, image_url = ? WHERE id = ?",
            [brand, name, year, engine, price, image_url, carId]
        );
        
        res.json({ message: "Autó sikeresen frissítve" });
    } catch (err) {
        console.error("Hiba az autó frissítésekor:", err);
        res.status(500).json({ message: "Hiba az autó frissítésekor" });
    }
});

// Új autó hozzáadása (csak admin)
app.post("/addCar", async (req, res) => {
    const { authorization } = req.headers;
    const { brand, name, year, engine, price, image_url } = req.body;

    if (!authorization) {
        return res.status(401).json({ message: "Hitelesítés szükséges" });
    }

    try {
        const token = authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        if (!checkAdmin(decoded)) {
            return res.status(403).json({ message: "Nincs admin jogosultság" });
        }

        const [result] = await db.query(
            "INSERT INTO cars (brand, name, year, engine, price, image_url) VALUES (?, ?, ?, ?, ?, ?)",
            [brand, name, year, engine, price, image_url]
        );
        
        res.status(201).json({ 
            message: "Autó sikeresen hozzáadva",
            id: result.insertId
        });
    } catch (err) {
        console.error("Hiba az autó hozzáadásakor:", err);
        res.status(500).json({ message: "Hiba az autó hozzáadásakor" });
    }
});

app.put("/profile", async (req, res) => {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Nincs jogosultság." });
    }

    const token = authorization.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { username, newPassword, email } = req.body;

        const [users] = await db.query("SELECT * FROM users WHERE id = ?", [decoded.id]);
        if (users.length === 0) {
            return res.status(400).json({ message: "A felhasználó nem található." });
        }

        const user = users[0];
        const hashedPassword = newPassword ? await argon.hash(newPassword) : user.password;

        await db.query("UPDATE users SET username = ?, password = ?, email = ? WHERE id = ?", [
            username || user.username,
            hashedPassword,
            email,
            user.id,
        ]);

        res.json({ message: "Profil sikeresen frissítve!" });
    } catch (err) {
        console.error("Hiba a profil frissítése közbel:", err);
        res.status(500).json({ message: "Hiba történt a profil frissítése közben." });
    }
});

app.post("/placeOrder", async (req, res) =>{
    const {fullname, email, phonenumber, address, comment, carId} = req.body;

    try{
        const [existingOrders] = await db.query("SELECT * FROM orders where fullname = ?", [fullname]);
        if(existingOrders.length > 0){
            return res.status(400).json({message: "Már van kölcsönzés ezzel a névvel."});
        }

        await db.query("INSERT INTO orders (fullname, email, phonenumber, address, comment, carId) VALUES (?, ?, ?, ?, ?, ?)", [fullname, email, phonenumber, address, comment, carId]);
        res.status(201).json({message: "Rendelés feldolgozás alatt áll."});
    }
    catch (err){
        console.error("Hiba a rendelés feldolgozása közben:", err);
        res.status(500).json({message: "Hiba a rendelés feldolgozása közben!"});
    }
});

app.get("/getAllCars", async (req, res) =>{
    try{
        const [cars] = await db.query("SELECT * FROM cars");
        res.json(cars);
    }
    catch(err){
        console.error("Hiba az autók lekérésekor: ", err);
        res.status(500).json({message: "Hiba az autók lekérésekor"});
    }
});

//Bentley autók lekérése
app.get("/Bentleys", async (req, res) => {
    try {
        const [bentleys] = await db.query("SELECT * FROM cars WHERE brand = 'Bentley'");
        res.json(bentleys);
    }
    catch (err) {
        console.error("Hiba a Bentley-k lekérésekor: ", err);
        res.status(500).json({ message: "Hiba a Bentley-k lekérésekor." });
    }
});

app.get("/Koenigseggs", async (req, res) => {
    try{
        const [koenigseggs] = await db.query("SELECT * FROM cars WHERE brand = 'Koenigsegg'");
        res.json(koenigseggs);
    }
    catch (err) {
        console.error("Hiba a Koenigsekk-ek lekérésekor: ", err);
        res.status(500).json({message: "Hiba a Koenigsekk-ek lekérésekor."});
    }
});

app.get("/Mercedes", async (req, res) =>{
    try{
        const [mercedes] = await db.query("SELECT * FROM cars WHERE brand = 'Mercedes-Benz'");
        res.json(mercedes);
    }
    catch (err){
        console.error("Hiba a Mercedes-ek lekérésekor: ", err);
        res.status(500).json({message: "Hiba a Mercedes-ek lekérésekor."});
    }
});

app.get("/Porsche", async (req, res) =>{
    try{
        const [porsche] = await db.query("SELECT * FROM cars WHERE brand = 'Porsche'");
        res.json(porsche);
    }
    catch (err){
        console.error("Hiba a Porsche-k lekérésekor: ", err);
        res.status(500).json({message: "Hiba a Porsche-k lekérésekor."});
    }
});

app.get("/Lamborghini", async (req, res) =>{
    try{
        const [lamborghini] = await db.query("SELECT * FROM cars WHERE brand = 'Lamborghini'");
        res.json(lamborghini);
    }
    catch(err){
        console.error("Hiba a Lamborghini-k lekérésekor: ", err);
        res.status(500).json({message: "Hiba a Lamborghini-k lekérésekor."});
    }
})

app.get("/Pagani", async (req, res) => {
    try {
        const [pagani] = await db.query("SELECT * FROM cars WHERE brand = 'Pagani'");
        res.json(pagani);
    } catch (err) {
        console.error("Hiba a Pagani-k lekérésekor: ", err);
        res.status(500).json({message: "Hiba a Pagani-k lekérésekor."});
    }
});

app.get("/BMW", async (req, res) => {
    try {
        const [bmw] = await db.query("SELECT * FROM cars WHERE brand = 'BMW'");
        res.json(bmw);
    } catch (err) {
        console.error("Hiba a BMW-k lekérésekor: ", err);
        res.status(500).json({message: "Hiba a BMW-k lekérésekor."});
    }
});

app.get("/RollsRoyce", async (req, res) => {
    try {
        const [rollsRoyce] = await db.query("SELECT * FROM cars WHERE brand = 'Rolls-Royce'");
        res.json(rollsRoyce);
    } catch (err) {
        console.error("Hiba a Rolls Royce-k lekérésekor: ", err);
        res.status(500).json({message: "Hiba a Rolls Royce-k lekérésekor."});
    }
});

app.get("/AstonMartin", async (req, res) => {
    try {
        const [astonMartin] = await db.query("SELECT * FROM cars WHERE brand = 'Aston Martin'");
        res.json(astonMartin);
    } catch (err) {
        console.error("Hiba az Aston Martinok lekérésekor: ", err);
        res.status(500).json({message: "Hiba az Aston Martinok lekérésekor."});
    }
});

app.get("/Ferrari", async (req, res) => {
    try {
        const [ferrari] = await db.query("SELECT * FROM cars WHERE brand = 'Ferrari'");
        res.json(ferrari);
    } catch (err) {
        console.error("Hiba a Ferrari-k lekérésekor: ", err);
        res.status(500).json({message: "Hiba a Ferrari-k lekérésekor."});
    }
});

app.post("/sendMail", async (req, res) => {
    const { name, email, message } = req.body;

    const mailOptions = {
        from: email,
        replyTo: email,
        to: "kucsikgabor22@gmail.com",
        subject: `${name} üzenete`,
        text: `Név: ${name}\nEmail: ${email}\n\nÜzenet:\n${message}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Üzenet elküldve!" });
    } catch (error) {
        console.error("Hiba az email küldésekor:", error);
        res.status(500).json({ message: "Nem sikerült elküldeni az üzenetet." });
    }
});

app.get("/getOrder", async (req, res) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ message: "Hitelesítés sikertelen: Nincs token." });
    }

    const token = authorization.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Hitelesítés sikertelen: Nincs érvényes token." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const [user] = await db.query(`SELECT firstname, lastname FROM users WHERE id = ?`, [decoded.id]);

        if (user.length === 0) {
            return res.status(404).json({ message: "Felhasználó nem található." });
        }

        const fullname = `${user[0].firstname} ${user[0].lastname}`;

        const [orders] = await db.query(`SELECT cars.brand, cars.name, cars.image_url FROM orders INNER JOIN cars ON orders.carId = cars.id WHERE orders.fullname = ?`, [fullname]);

        if (orders.length === 0) {
            return res.status(404).json({ message: "Nem található rendelés." });
        }

        res.json(orders);
    } catch (err) {
        console.error("Hiba a rendelés lekérése közben:", err);
        res.status(500).json({ message: "Hiba történt a rendelés lekérése közben." });
    }
});

app.post('/getFavoriteCars', async (req, res) => {
    try {
      const { carIds } = req.body;
      const cars = await Car.find({ _id: { $in: carIds } });
      res.json(cars);
    } catch (error) {
      res.status(500).json({ error: "Hiba a kedvenc autók lekérésekor" });
    }
});
// ADMIN

const reviews = [
    { id: 1, userName: "Kelemen Dávid", rating: 5, comment: "Remek ügyfélszolgálat és gyönyőrű autók!" },
    { id: 2, userName: "Jagep20", rating: 3, comment: "Szerintem a Mitsubishi Carisma Sokkal kényelmesebb mint egy nagypapa Bentley, de kinek mi." },
    { id: 3, userName: "Szabó Arnold", rating: 5, comment: "Gyors kiszállítás, jó ár/érték arány!" },
    { id: 4, userName: "ValyiIstvan", rating: 5, comment: "A Bentley Continental GT Speed egy igazi élmény, minden kanyarban érezni a luxust;)" },
    { id: 5, userName: "Race001 Gábor", rating: 5, comment: "A Bentley egyáltalán nem nagypapa autó. Kényelmes és elegáns." },
    { id: 6, userName: "FeketePuma32", rating: 5, comment: "10/10, legjobb autók amiket lehet kínálni. Legközelebb legyen Miata:)" },
    { id: 7, userName: "Komy28", rating: 2, comment: "Végre kijavítottátok az autómárkás kártyákat a főoldalon, már látom őket." },


];

app.get("/reviews", (req, res) => {
    res.json(reviews);
});

app.post("/logout", (req, res) => {
    res.json({message: "Sikeresen kijelentkeztél."});
});

app.listen(PORT, () => {
    console.log(`A szerver a ${PORT}-es porton fut.`);
})