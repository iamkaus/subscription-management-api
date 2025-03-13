import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../config/env.js";
import userModel from '../models/user.model.js'

/**
 * @desc Authorization middleware to restrict access to private routes.
 * @param {import("express").Request} req - Express request object.
 * @param {import("express").Response} res - Express response object.
 * @param {import("express").NextFunction} next - Express next function.
 */

export const authorize = async  (req, res, next) => {
    try {
        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        } else {
            return res.status(401).json({
                success: false,
                error: 'Unauthorized: No token provided'
            });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await userModel.findById(decoded.userId);

        if (!user) {
            res.status(401).json({
                success: false,
                error: 'Unauthorized: No user found'
            })
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            error: 'Unauthorized: Invalid token' + error
        });
    }
}