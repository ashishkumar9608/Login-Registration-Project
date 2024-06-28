import express from 'express';
import routes from './routes/index.js';
import { config as configDotenv } from 'dotenv';
import mongoose from 'mongoose';
import connectToMongodb from './config/db.js';
import bodyParser from 'body-parser';
import swaggerjsdoc from 'swagger-jsdoc';
import swaggerui from 'swagger-ui-express';
import cors from 'cors';

configDotenv(); // Correctly configure dotenv

const app = express();
const PORT = process.env.PORT || 8080;
app.use(cors());
app.use(bodyParser.json());
app.use('/api/v1', routes);

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Login-Registration portal",
            version: "0.0.1",
            description: "This is a simple login portal",
            contact: {
                name: "Ashish",
                url: "ashish.com",
                email: "ashish@gmail.com",
            },
        },
        servers: [
            {
                url: 'http://localhost:8080',
            },
        ],
    },
    apis: ["./routes/*.js"],
};

const specs = swaggerjsdoc(swaggerOptions);
app.use('/api-docs', swaggerui.serve, swaggerui.setup(specs));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectToMongodb();
});
