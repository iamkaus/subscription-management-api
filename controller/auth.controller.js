import mongoose from 'mongoose';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import userModel from "../models/user.model.js";
import {JWT_SECRET, JWT_EXPIRES_IN} from "../config/env.js";
import blacklistModel from "../models/blacklist.model.js";

/**
 * @route POST /api/v1/auth/sign-up
 * @desc signs up a user and creates a new user
 * @public
 */

export const signUp = async (req, res, next) => {
    const session = await mongoose.startSession()
    session.startTransaction();

    try {
        const { username, email, password } = req.body;

        const existingUser = await userModel.findOne({email});
        if (existingUser) {
            res.status(409).json({
                success: false,
                error: 'User already exists'
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await userModel.create([{
            username,
            email,
            password: hashedPassword,
        }], {session})

        const token = jwt.sign(
            {
                userId: newUser[0]._id
            },
            JWT_SECRET,
            {
                expiresIn: JWT_EXPIRES_IN
            }
        )

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            success: true,
            message: 'User successfully signed up',
            data: {
                token,
                user: newUser,
            }
        })

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
}

/**
 * @route POST /api/v1/auth/sign-in
 * @desc signs in a user
 * @public
 */

export const signIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });
        if (!user) {
            res.status(404).json({
                success: false,
                error: 'User not found'
            })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({
                success: false,
                error: 'Provided password does not match. Please provide correct password and try again.'
            })
        }

        const token = jwt.sign(
            {
                userId: user._id
            },
            JWT_SECRET,
            {
                expiresIn: JWT_EXPIRES_IN
            }
        )

        res.status(200).json({
            success: true,
            message: 'User successfully signed in',
            data: {
                token,
                user: user
            }
        })

    } catch (error) {
        next(error);
    }
}

/**
 * @route POST /api/v1/auth/sign-out
 * @desc signs out a user
 * @public
 */

export const signOut = async (req, res, next) => {
    try {
        let cookie;
        if (!req.headers.authorization || req.headers.authorization.startsWith('Bearer')) {
            res.status(204).json({
                success: false,
                error: 'You are not logged in'
            })
        }

        cookie = req.headers.authorization.split(' ')[1];
        const accessToken = cookie.split(':')[0];

        const checkIfBlacklisted = await blacklistModel.findOne({
            token: accessToken
        })

        if (checkIfBlacklisted) {
            res.status(204).end();
        }

        const newBlacklist = new blacklistModel({
            token: accessToken,
        });
        await newBlacklist.save();

        res.setHeader('Clear-Site-Data', '"cookies"');
        res.status(200).json({
            success: true,
            message: 'User successfully signed out',
        })
    } catch (error) {
        next(error);
        res.end();
    }
}