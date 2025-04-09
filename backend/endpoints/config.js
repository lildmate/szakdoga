import mysql from 'mysql2/promise';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

export const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'racedatabase',
});

export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});