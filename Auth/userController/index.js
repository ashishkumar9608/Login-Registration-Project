import bcrypt from 'bcrypt';
import UserModel from '../models/userModels.js'; // Adjust the path as necessary
import jwt from 'jsonwebtoken';
import { config as configDotenv } from 'dotenv';

// Load environment variables from .env file
configDotenv();

export const registerUser = async (req, res) => {
    try {
        // Create a new instance of the UserModel with the request body
        const user = new UserModel(req.body);
        
        // Hash the password before saving the user
        user.password = await bcrypt.hash(req.body.password, 10);
        
        // Save the user to the database
        const response = await user.save();
        
        // Remove the password from the response
        response.password = undefined;
        
        // Send a success response
        return res.status(201).json({ message: 'success', data: response });
    } catch (err) {
        // Send an error response
        return res.status(500).json({ message: 'error', err });
    }
};

// Login user, check user using email, compare password, and create jwt token
export const loginUser = async (req, res) => {
    try {
        // Find user by email
        const user = await UserModel.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).json({ message: 'Auth failed, Invalid username/password' });
        }

        // Compare the password
        const isPassEqual = await bcrypt.compare(req.body.password, user.password);
        if (!isPassEqual) {
            return res.status(401).json({ message: 'Auth failed, Invalid username/password' });
        }

        // Create a token object
        const tokenObject = {
            _id: user._id,
            fullName: user.fullName,
            email: user.email
        };

        // Sign the JWT token
        const jwtToken = jwt.sign(tokenObject, process.env.SECRET, { expiresIn: '4h' });
        return res.status(200).json({ jwtToken, tokenObject });
    } catch (err) {
        // Handle errors
        if (err instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ message: 'Auth failed, Invalid token' });
        }
        return res.status(500).json({ message: 'error', err });
    }
};


export const getUsers = async(req,res) => {
    try{
        const users = await UserModel.find({},{password:0});
        return res.status(200).json({data:users});

    }
    catch(err){
       return res.status(500).json({message:"error",err});
    }
}
