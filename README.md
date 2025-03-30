Telepitéshez szükséges frontend és backend inicializálások
Frontend mappába futtassuk a következőket:
npm i -  feltelepíti a függőségeket
npm start -  elindítja a react-scriptsel a frontendet



Backend:
Backend mappába futtassuk a következőket:
npm i -  feltelepíti a függőségeket
npm start -  elindítja a backend szervert


!!!!! Ha nem menne akkor telepitsük a szükséges packageket.

Frontend
Frontend (React) csomagok:

React és React DOM
npm install react react-dom

React Router DOM (az útválasztáshoz)
npm install react-router-dom

Bootstrap (stílusozáshoz)
npm install bootstrap

React Helmet (oldal fejléc kezeléséhez)
npm install react-helmet

React Bootstrap (Bootstrap komponensek Reacthez)
npm install react-bootstrap

Font Awesome ikonok (ha használod)
npm install @fortawesome/fontawesome-fre

--------------------------------

Backend (Node.js/Express) csomagok:

Express (szerver keretrendszer)
npm install express

CORS (cross-origin kérések kezeléséhez)
npm install cors

MySQL2 (MySQL adatbázis kapcsolathoz)
npm install mysql2

Argon2 (jelszó hasheléshez)
npm install argon2

JSON Web Token (JWT) (hitelesítéshez)
npm install jsonwebtoken

Dotenv (környezeti változók kezeléséhez)
npm install dotenv

Nodemailer (e-mail küldéshez)
npm install nodemailer

Nodemon (fejlesztés közbeni automatikus újraindításhoz, opcionális)
npm install --save-dev nodemon

Ezek után a package.json-ba a version alá irjuk hogy type: "modules";
