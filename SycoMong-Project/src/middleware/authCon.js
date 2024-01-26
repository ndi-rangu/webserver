const jwt = require('jsonwebtoken');

module.exports = function(req,res,next){
    //get token from header
    const token = req.header('x-auth-token');

    //check for token
    if(!token) {
        console.log("UNAUTHORIZED");
        return res.status(401).json({message: "Prohibited from accessing this page"});
    }

    //verify user token
    try{
        const decoded = jwt.verify(token, "secretKey");

        const userPosition = ['conductor'];
        if(!userPosition.includes(decoded.user.position)){
            console.log("UNAUTHORIZED ACCESS");
            return res.status(401).json({ message: "YOU DO NOT HAVE THE RIGHTS TO ACCESS THIS PAGE"});
        }

        req.user = decoded.user; //queried from the payload in the registered controller
        next();
    } catch(error){
        //invalid token key
        res.status(401).json({ message: "Authorization access denied"}) 
    }
}