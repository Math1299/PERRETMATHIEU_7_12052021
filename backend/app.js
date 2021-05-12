require("dotenv").config(); //STOCK LES CONFIG D ENVIRONNEMENT HORS DU CODE
const express = require("express"); //FRAMEWORK EXPRESS
const bodyParser = require("body-parser"); //TRANSFORM CORPS DE LA REQUETE EN JSON UTILISABLE
const helmet = require("helmet"); //PROTECTION DES HEADERS
const path = require("path"); //ACCEDER AU CHEMIN DES FICHIERS
const rateLimit = require("express-rate-limit");
const mysql = require("mysql"); //UTILISATION DE LA BASE DE DONNEES

//LIMITER LES DEMANDES D ACCES REPETEES A L API
const limiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 50,
    message: "Too many request from this IP",
});

//IMPORT DES ROUTES
const userRoutes = require("./routes/user");

const app = express();
app.use(helmet());

//CONNEXION A LA BASE DE DONNEES
let connectDb = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

connectDb.connect(function (err) {
    if (err) {
        console.log("Erreur de connexion à la base de données", err);
        return;
    }
    console.log("Connecté à la base de données MySQL");
});

module.exports = connectDb;

//MIDDLEWARE GENERAL POUR EVITER LES PB DE CORS
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    next();
});

app.use((req, res, next) => {
    res.json({ message: "Votre requête a bien été reçue !" });
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(limiter);
app.use("/images", express.static(path.join(__dirname, "images"))); //ROUTE PATH POUR LES IMAGES

app.use("/api/auth", userRoutes);

module.exports = app;
