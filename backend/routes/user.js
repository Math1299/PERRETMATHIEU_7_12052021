const express = require("express");
const router = express.Router();

//ASSOCIATION DES LOGIQUES METIER AUX ROUTES
const userCtrl = require("../controllers/user");

//2 POST CAR LE FRONT VA AUSSI ENVOYER DES INFOS ===> EMAIL ET MDP
router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);

module.exports = router;
