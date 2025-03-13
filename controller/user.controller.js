import userModel from '../models/user.model.js'
import bcrypt from "bcryptjs";

/**
 * @route GET /api/v1/user/get-use
 * @desc lists all the user
 * @private
 */

export const getUser = async (req, res, next) => {
    try {
        const users = await userModel.find();

        if (!users) {
            res.status(404).json({
                success: false,
                error: 'No such user found'
            })
        }

        res.status(200).json({
            success: true,
            data: users,
        });

    } catch (error) {
        next(error);
    }
}

/**
 * @route GET /api/v1/user/get-user/:id
 * @desc lists user by id
 * @private
 */

export const getUserByID = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.params.id).select('-password');

        if (!user) {
            res.status(404).json({
                success: false,
                error: 'User not found'
            })
        }

        res.status(200).json({
            success: true,
            data: user
        })
    } catch (error) {
        next(error);
    }
}

/**
 * @route PUT /api/v1/user/update-user/:id
 * @desc updates user with provided id
 * @private
 */

export const updateUserByID = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email && !password) {
            res.status(400).json({
                success: false,
                error: 'At least one update field (email or password) must be provided.'
            })
        }

        let updateFields = {};
        if (email) updateFields.email = email;
        if (password) {
            const salt = await bcrypt.genSalt(10);
            updateFields.password = await bcrypt.hash(password, salt);
        }

        const updatedUser = await userModel.findByIdAndUpdate(
            req.params.id,
            {$set: updateFields},
            { new: true }
        );

        if (!updatedUser) {
            res.status(404).json({
                success: false,
                error: `No user found with id: ${req.params.id}.`
            })
        }

        res.status(200).json({
            success: true,
            data: updatedUser
        })
    } catch (error) {
        next(error);
    }
}

/**
 * @route DELETE /api/v1/user/delete-user/:id
 * @desc deletes a user with provided id
 * @private
 */

export const deleteUserByID = async (req, res, next) => {
    try {
        const deletedUser = await userModel.findByIdAndDelete(
            req.params.id,
        );

        if (!deletedUser) {
            res.status(404).json({
                success: false,
                error: `User with id: ${req.params.id} not found.`
            })
        }
        res.status(200).json({
            success: true,
            message: `User with id: ${req.params.id} deleted successfully.`
        })
    } catch(error) {
        next(error);
    }
}