import { Router } from 'express';
import {deleteUserByID, getUser, getUserByID, updateUserByID} from "../controller/user.controller.js";
import {authorize} from "../middleware/auth.middleware.js";
const userRoutes = Router();

/**
 * @route GET /api/v1/user
 * @desc the route allows authorized users to fetch all users
 * @private
 */
userRoutes.get('/get-users', authorize, getUser); // needs to be a secure route admin only possibly

/**
* @route GET /api/v1/user
* @desc the route allows authorized users to fetch a user with provided id
* @private
*/

userRoutes.get('/get-user/:id', authorize, getUserByID); // needs to be secure route as well only authenticated users can use this route, so we can use auth middleware to make sure it is a secure route

/**
 * @route PUT /api/v1/user
 * @desc the route allows authorized users to update a user with provided id
 * @private
 */

userRoutes.put('/update-user/:id', authorize, updateUserByID); // only authenticated users can update their details

/**
 * @route DELETE /api/v1/user
 * @desc the route allows authorized users to delete a user with provided id
 * @private
 */

userRoutes.delete('/delete-user/:id', authorize, deleteUserByID); // authenticated users can delete their account/user

export default userRoutes;