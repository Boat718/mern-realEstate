import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';


export const signup = async (req, res, next) => {
    const {username, email, password} = req.body;
    const hashedpwd = bcrypt.hashSync(password, 10);
    const newUser = new User({username, email, password:hashedpwd});
    try {
        await newUser.save();
        res.status(201).json("User is created successfully!!");
    } catch (error) {
        next(error );
    }
};