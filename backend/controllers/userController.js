import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from 'validator';

// create a Token

const createToken = (id) => {
    const token = jwt.sign({ id }, process.env.JWT_SECRET);
    return token;
}


// login the user
const loginUser = async (req, res) => {
    try {
        const {email, password } = req.body;

        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success:false, message:'User Doesnot exists'});
        }

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.json({success:false,message:'invalid Credentials'})
        }

        const token = createToken(user._id);

        res.json({success:true, token})

        
    } catch (error) {
        console.log('Register/Login error:', error);
        res.json({ success: false, message: error.message || 'Error' })
    }
}


// register a User
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    if (!email || typeof email !== 'string') {
        return res.json({ success: false, message: 'Email is required and must be a string' });
    }
    if (!password || typeof password !== 'string') {
        return res.json({ success: false, message: 'Password is required and must be a string' });
    }
    try {
        // check Exists user
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: 'User Already Exists' })
        }
        // validate the email
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: 'Please enter a Valid Email' })
        }
        // validate the password strength
        if (password.length < 8) {
            return res.json({ success: false, message: 'Please enter a strong password' })
        }

        // hasing the password || encrypt the password
        const salt = await bcrypt.genSalt(6);
        const hashPassword = await bcrypt.hash(password, salt);

        // create  a new User

        const newUser = new userModel({
            name: name,
            email: email,
            password: hashPassword
        })

        const user = await newUser.save();
        const token = createToken(user._id);
        res.json({success:true,token})
    } catch (error) {
        console.log('Register/Login error:', error);
        res.json({ success: false, message: error.message || 'Error' })
    }
}

export { loginUser, registerUser };