import 'dotenv/config'
import jwt from 'jsonwebtoken';

export const authenticate = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).json({error : "No Authorization header"});
    }

    const token = authHeader.split(" ")[1];

    if(!token) return res.status(401).json({error : "Token missing after Bearer"});

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error("JWT ERROR : ", error.message);
        return res.status(403).json({error : error.message});
    }
}