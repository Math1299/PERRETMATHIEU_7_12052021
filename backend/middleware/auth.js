const jwt = require("jsonwebtoken");

//METHODE D AUTHENTIFICATION VIA TOKEN
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]; //REFERENCE AU FORMAT DU TOKEN
        const decodedToken = jwt.verify(token, `${process.env.JWT_KEY}`); //ON LE DECODE AVEC VERIFY
        const userId = decodedToken.userId; //ON EXTRAIT LE USERID
        if (req.body.userId && req.body.userId !== userId) {
            //ON COMPARE
            throw "User ID non valable";
        } else {
            next();
        }
    } catch (error) {
        res.status(401).json({ error: error | "Requête non identifiée" });
    }
};
