import { Router } from 'express';
import {authorize} from "../middleware/auth.middleware.js";
import {createSubscription, getSubscription, getUserSubscription} from "../controller/subscription.controller.js";
const subscriptionRoutes = Router();

/**
 * @route GET /api/v1/subscription/get-subscription/:id
 * @desc fetches a subscription with provided id, lets one know which user the subscription with the provided id belongs to
 * @private
 */

subscriptionRoutes.get('/get-subscription/:id', authorize, getSubscription);

/**
 * @route GET /api/v1/subscription/user-subscription/:id
 * @desc fetches all the subscriptions of a user with provided user id
 * @private
 */

subscriptionRoutes.get('/user-subscription/:id', authorize, getUserSubscription);

/**
 * @route POST /api/v1/subscription/new-subscription
 * @desc creates a new subscription for a user
 * @private
 */

subscriptionRoutes.post('/new-subscription', authorize, createSubscription);

/**
 * @route PUT /api/v1/subscription/update-subscription/:id
 * @desc updates a subscription with provided id
 * @private
 */

subscriptionRoutes.put('/update-subscription/:id', authorize,async (req, res) => {
    res.send({
        title: 'Update subscription',
    })
});

/**
 * @route DELETE /api/v1/subscription/delete-subscription/:id
 * @desc deletes a subscription with provided id
 * @private
 */

subscriptionRoutes.delete('/delete-subscription/:id', authorize,async (req, res) => {
    res.send({
        title: 'Delete subscription',
    })
});

/**
 * @route GET /api/v1/subscription/upcoming-renewals
 * @desc fetches subscription with upcoming renewals
 * @private
 */

subscriptionRoutes.get('/upcoming-renewals', authorize,async (req, res) => {
    res.send({
        title: 'Get upcoming renewals',
    })
});

export default subscriptionRoutes;