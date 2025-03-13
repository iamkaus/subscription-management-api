import subscriptionModel from "../models/subscription.model.js";

/**
 * @route POST /api/v1/subscription/new-subscription
 * @desc allows authorized users to create a new subscription
 * @private
 */

export const createSubscription = async (req, res, next) => {
    try {
        const newSubscription = await subscriptionModel.create({
            ...req.body,
            user: req.user._id
        })

        if (!newSubscription) {
            res.status(500).json({
                success: false,
                error: 'Error creating Subscription'
            })
        }

        res.status(201).json({
            success: true,
            message: 'Subscription created',
            data: newSubscription
        })
    } catch (error) {
        next(error);
    }
}

/**
 * @route GET /api/v1/subscription/get-subscription/:id
 * @desc fetches the subscription detail with provided id
 * @private
 */

export const getSubscription = async (req, res, next) => {
    try {
        const subscription = await subscriptionModel.findById(req.params.id);

        if (!subscription) {
            res.status(404).json({
                success: false,
                error: `Subscription with id: ${req.params.id} not found`
            })
        }

        res.status(200).json({
            success: true,
            data: subscription
        })
    } catch (error) {
        next(error);
    }
}

/**
 * @route GET /api/v1/subscription/user-subscription/:id
 * @desc fetches all the subscriptions of a user with provided id
 * @private
 */

export const getUserSubscription = async (req, res, next) => {

    try {

        const userSubscriptions = await subscriptionModel.find({
            user: req.params.id
        });

        if (!userSubscriptions || userSubscriptions.length === 0) {
            return res.status(404).json({
                success: false,
                error: `Subscription with provided user id: ${req.params.id} not found`
            })
        }

        res.status(200).json({
            success: true,
            data: userSubscriptions
        })
    } catch (error) {
        next(error);
    }
}