import { Router } from 'express';
import {deleteUserByID, getUser, getUserByID, updateUserByID} from "../controller/user.controller.js";
const userRoutes = Router();

userRoutes.get('/get-users', getUser); // needs to be a secure route admin only possibly

userRoutes.get('/get-user/:id', getUserByID); // needs to be secure route as well only authenticated users can use this route, so we can use auth middleware to make sure it is a secure route

userRoutes.put('/update-user/:id', updateUserByID); // only authenticated users can update their details

userRoutes.delete('/delete-user/:id', deleteUserByID); // authenticated users can delete their account/user

export default userRoutes;