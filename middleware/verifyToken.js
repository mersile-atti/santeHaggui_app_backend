import jwt from 'jsonwebtoken';
import User from '../models/userModel.js'; 

const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.token;

    if(authHeader){
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
            if(err) res.status(403).json("Token is not valid");
            req.user = await User.findById(user.id);
            next();
        
        })
    } else {
        return res.status(401).json("You are not authenticated");
    }

}

const verifyAndAuthorizationTokn = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.id === req.params.id){
            next();
        } else {
            res.status(403).json("You are not allowed to do that");
        }
    })

}

export {verifyToken, verifyAndAuthorizationTokn};
