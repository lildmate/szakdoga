import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
import { db } from './config.js';

const router = express.Router();

// Admin jogosultság ellenőrzése adatbázis lekérdezéssel, hogyha nem találja a felhasználót, akkor false-t ad vissza
// Ha találja, akkor megnézi, hogy admin-e, ha igen, akkor true-t ad vissza
const checkAdmin = async (decodedToken) => {
    const [user] = await db.query("SELECT isAdmin FROM users WHERE id = ?", [decodedToken.id]);
    if(user.length === 0) {
        return false;
    }
    else if (user[0].isAdmin !== 1) {
        return false;
    }
    else {
        return true;
    }
};
// Autók lekérése
router.get("/allUsers", async (req, res) => {
    try {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ message: "Hitelesítés szükséges" });
    }
        const token = authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        if (! await checkAdmin(decoded)) {
            return res.status(403).json({ message: "Nincs admin jogosultság" });
        }

        const [users] = await db.query("SELECT id, username, firstname, lastname, email, isAdmin FROM users WHERE id != ?", [decoded.id]);
        res.json(users);
    } catch (err) {
        console.error("Hiba a felhasználók lekérésekor:", err);
        res.status(500).json({ message: "Hiba a felhasználók lekérésekor" });
    }
});
//Rendelések lekérdezése
router.get("/allOrders", async (req, res) => {
    try {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ message: "Hitelesítés szükséges" });
    }

    
        const token = authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        if (! await checkAdmin(decoded)) {
            return res.status(403).json({ message: "Nincs admin jogosultság" });
        }

        const [orders] = await db.query("SELECT * FROM orders");
        res.json(orders);
    } catch (err) {
        console.error("Hiba a rendelések lekérésekor:", err);
        res.status(500).json({ message: "Hiba a rendelések lekérésekor" });
    }
});
//Egy adott felhasználó törlése
// A felhasználó ID-ját a URL-ben adjuk meg, pl. /deleteUser/1
router.delete("/deleteUser/:id", async (req, res) => {
    try {
    const { authorization } = req.headers;
    const userId = req.params.id;

    if (!authorization) {
        return res.status(401).json({ message: "Hitelesítés szükséges" });
    }
        const token = authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        if (! await checkAdmin(decoded)) {
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
// Az autó ID-ját a URL-ben adjuk meg, pl. /deleteCar/1
router.delete("/deleteCar/:id", async (req, res) => {
    try {
    const { authorization } = req.headers;
    const carId = req.params.id;

    if (!authorization) {
        return res.status(401).json({ message: "Hitelesítés szükséges" });
    }

    
        const token = authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        if (! await checkAdmin(decoded)) {
            return res.status(403).json({ message: "Nincs admin jogosultság" });
        }

        await db.query("DELETE FROM cars WHERE id = ?", [carId]);
        res.json({ message: "Autó sikeresen törölve" });
    } catch (err) {
        console.error("Hiba az autó törlésekor:", err);
        res.status(500).json({ message: "Hiba az autó törlésekor" });
    }
});

// Rendelés törlése
// A rendelés ID-ját a URL-ben adjuk meg, pl. /deleteOrder/1
router.delete("/deleteOrder/:id", async (req, res) => {
    try {
    const { authorization } = req.headers;
    const orderId = req.params.id;

    if (!authorization) {
        return res.status(401).json({ message: "Hitelesítés szükséges" });
    }

    
        const token = authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        if (! await checkAdmin(decoded)) {
            return res.status(403).json({ message: "Nincs admin jogosultság" });
        }

        await db.query("DELETE FROM orders WHERE id = ?", [orderId]);
        res.json({ message: "Rendelés sikeresen törölve" });
    } catch (err) {
        console.error("Hiba a rendelés törlésekor:", err);
        res.status(500).json({ message: "Hiba a rendelés törlésekor" });
    }
});

// Egy adott felhasználó jogosultságainak frissítése (admin státusz)
// A felhasználó ID-ját a URL-ben adjuk meg, pl. /updateAdminStatus/1
router.put("/updateAdminStatus/:id", async (req, res) => {
    try {
    const { authorization } = req.headers;
    const userId = req.params.id;
    const { isAdmin } = req.body;

    if (!authorization) {
        return res.status(401).json({ message: "Hitelesítés szükséges" });
    }
        const token = authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        if (! await checkAdmin(decoded)) {
            return res.status(403).json({ message: "Nincs admin jogosultság" });
        }
        const adminValue = isAdmin ? 1 : 0;
        
        await db.query("UPDATE users SET isAdmin = ? WHERE id = ?", [adminValue, userId]);
        
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
//Egy adott autó adatainak módosítása (csak admin)
// Az autó ID-ját a URL-ben adjuk meg, pl. /updateCar/1
router.put("/updateCar/:id", async (req, res) => {
    try {
    const { authorization } = req.headers;
    const carId = req.params.id;
    const { brand, name, year, engine, price, image_url } = req.body;

    if (!authorization) {
        return res.status(401).json({ message: "Hitelesítés szükséges" });
    }
        const token = authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (! await checkAdmin(decoded)) {
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
router.post("/addCar", async (req, res) => {
    try {
    const { authorization } = req.headers;
    const { brand, name, year, engine, price, image_url } = req.body;

    if (!authorization) {
        return res.status(401).json({ message: "Hitelesítés szükséges" });
    }

        const token = authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        if (! await checkAdmin(decoded)) {
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

export default router;