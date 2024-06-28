import mongoose from "mongoose";

import { config as configDotenv } from 'dotenv';
configDotenv();

const url = process.env.MONGO_URL;

const connectToMongodb = () => {mongoose.connect(url)
.then(()=>{
    console.log("MongoDB connected...");
})
.catch(err => {
    console.log(`error in connecting to the mongodb ${err}`);
})}

export default connectToMongodb;
