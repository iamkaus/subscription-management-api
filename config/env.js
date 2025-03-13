import { config } from 'dotenv';

config({path: `.env.${process.env.NODE_ENV || 'development'}.local`});

export const {
    PORT,
    NODE_ENV,
    MONGO_DB_URI,
    MONGO_DB_USER_NAME,
    MONGO_DB_PASSWORD,
    JWT_SECRET,
    JWT_EXPIRES_IN
} = process.env;