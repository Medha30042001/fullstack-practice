import bcrypt from 'bcrypt';
import supabase from '../config/supabase.config.js';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const signup = async (req, res) => {
    const {email, password, role = "user"} = req.body;

    if(!email || !password || !role){
        return res.status(400).json({error : 'Missing fields'});
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const {error} = await supabase
        .from('ussers')
        .insert({email, password : hashedPassword, role});

    if(error){
        if(error.code === '23505'){
            return res.status(409).json({error : "Email already registered"});
        }
        return res.status(400).json({error : error.message});
    }

    res.status(201).json({message : "User registered successfully"});
}

export const login = async (req, res) => {
    const {email, password} = req.body;

    if(!email || !password) {
        return res.status(400).json({error : "Missing fields"});
    }

    const {data : user} = await supabase
        .from('ussers')
        .select()
        .eq("email", email)
        .single();

    if(!user){
        return res.status(401).json({error : "Invalid credentials"});
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if(!validPassword) {
        res.status(401).json({error : "Invalid credentials"});
    }

    const token = jwt.sign(
        {id : user.id, role: user.role},
        process.env.JWT_SECRET,
        {expiresIn : "1h"}
    );

    res.status(201).json({
        token,
        role : user.role
    });
}