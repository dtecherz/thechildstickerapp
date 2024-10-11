var CryptoJS = require("crypto-js");


const decodeUser = (req, res, next) => {
    try {
        const token = req.cookies.authToken
        console.log("token",token);
        // const token = req.cookies.pk2;

        // console.log("TOKEN", decodeURIComponent(token));
        // if (!token) return res.status(400).json({ message: "auth token required" }).render('login');;
        if (!token) return res.redirect('/'); 

        var bytes = CryptoJS.AES.decrypt(decodeURIComponent(token), process.env.encryptionSecret);
        var originalText = bytes.toString(CryptoJS.enc.Utf8);
        req.user = JSON.parse(originalText)
        next();

    } catch (e) {
        console.log(e);
        return res.status(400).json({ message: "auth token required" });
    }

}


module.exports = {
    decodeUser
}