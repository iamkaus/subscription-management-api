import mongoose from 'mongoose';
import { MONGO_DB_URI, NODE_ENV, MONGO_DB_USER_NAME, MONGO_DB_PASSWORD } from "../config/env.js";

/**
 * Database connection module for MongoDB.
 * @module database/connection
 */

if (!MONGO_DB_URI) {
    throw new Error('Please specify the mongoDB URI environment variable inside .env<development/production>.local');
}

export const connectToDatabase = async () => {
    try {
        await mongoose.connect(
            MONGO_DB_URI,
            {
                user: MONGO_DB_USER_NAME,
                pass: MONGO_DB_PASSWORD
            }
        )
    console.log(`Connected to Database in ${NODE_ENV} environment`);
    } catch (error) {
        console.error('Error connecting to database: ', error.message);
        process.exit(1);
    }
}