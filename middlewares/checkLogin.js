

const checkLogin = (req, res, next) => {
    try {
        const token = req.cookies.authToken
        console.log("token", token);


        if (!token) {

        }

        
        next();
    } catch (e) {
        console.log(e);
        return res.status(400).json({ message: "auth token required" });
    }

}


module.exports = {
    checkLogin
}