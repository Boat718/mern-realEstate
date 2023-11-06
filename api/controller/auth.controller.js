import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
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

const generatedTokenAndRes = (userEmail, res) => {
    console.log(userEmail._doc)
    const {password:pass, ...rest} = userEmail._doc;
    const token = jwt.sign({
            id:userEmail._id,
        }, process.env.JWT_SECRET);
    return res.cookie("access_token", token, {httpOnly: true})
            .status(200).json(rest);
}


export const signin = async (req, res, next) => {
    const {email, password} = req.body;
    try {
        const validUser = await User.findOne({email}).exec();
        if(!validUser) {
            return next(errorHandler(404, "User not found!!"));
        }
        const validPassword = bcrypt.compareSync(password, validUser.password);
        if(!validPassword) {
            return next(errorHandler(404, "Wrong cridential!!"));
        }
        generatedTokenAndRes(validUser, res);
    } catch (error) {
        next(error);
    }
};

export const google = async(req, res, next) => {
    try {
        const user = await User.findOne({email: req.body.email}).exec;
        if(!user){
            generatedTokenAndRes(user, res);
        } else {
            const generatedPassword = Math.random().toString(36).slice(-8);
            const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
            const newUsername = req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4);
            const newUser = new User({
                username: newUsername,
                email: req.body.email,
                password: hashedPassword,
                avatar: req.body.photo
            })
            await newUser.save();
            generatedTokenAndRes(newUser, res)
        }
    } catch (error) {
        next(error)
    }
}