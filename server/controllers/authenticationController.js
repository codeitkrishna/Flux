const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const dotenv = require('dotenv');

dotenv.config();

const createToken = (_id) => {
    return jwt.sign(
        {_id},
        process.env.SECRET_TOKEN,
        {expiresIn: "3d"}
    )
}

const register = async(req, res) =>{

    try{
        const {firstname, lastname, mobilenumber, username, email, password} = req.body;
        if(!(email && password && username && mobilenumber && firstname && lastname)){
            return res.status(400).json({error: "All input data is required"});
        }

        
        const existingUser = await  User.findOne({ $or: [{ mobilenumber }, { username } ,{ email }] });
        if (existingUser) {
            if (existingUser.mobilenumber === mobilenumber) {
                return res.status(409).json({ error: "User already exists with this mobile number." });
            }
            if (existingUser.username === username) {
                return res.status(409).json({ error: "User already exists with this mobile number." });
            }
            if (existingUser.email === email) {
                return res.status(409).json({ error: "User already exists with this email id." });
            }
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            firstname,
            lastname,
            mobilenumber,
            username,
            email,
            password: hashedPassword
        })

        const token = createToken(user._id);


        user.password = undefined

        const options = {
            expires: new Date(Date.now() + 3*24*60*60*1000),
            httpOnly: true
        };
        res.status(200).cookie("token", token, options).json({
            success: true,
            token,
            user
        });
        // user.password = undefined

    }catch(error){
        console.error(error); // Log the error for debugging
        return res.status(500).json({ error: "Something went wrong. Please try again!" });
    }

};

const login = async(req, res) =>{
    try{
        const { username, password } = req.body;
        if(!(username && password )){
            return res.status(400).json({error: "All input data is required"});
        }

        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ error: 'User not found' });

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) return res.status(400).json({ error: 'Invalid credentials' });

        const token = createToken(user._id);

        user.password = undefined;

        const options = {
            expires: new Date(Date.now() + 3*24*60*60*1000),
            httpOnly: true
        };
        
        res.status(200).cookie("token", token, options).json({
            success: true,
            token,
            user
        });
    } catch(error) {
        console.error(error); // Log the error for debugging
        return res.status(500).json({ error: "Something went wrong. Please try again!" });
    }
};

module.exports = {register, login}