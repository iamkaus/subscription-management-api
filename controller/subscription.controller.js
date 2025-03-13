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

/**
 * @route DELETE /api/v1/subscription/delete-subscription/:id
 * @desc deletes a subscription with provided id
 * @private
 */

export const deleteSubscription = async (req, res, next) => {
    try {
        const deletedSubscription = await subscriptionModel.findByIdAndDelete(req.params.id)

        if (!deletedSubscription) {
            res.status(404).json({
                success: false,
                error: `Subscription with id: ${req.params.id} not found`
            })
        }
        res.status(200).json({
            success: true,
            message: `Subscription with id: ${req.params.id} deleted`,
        })
    } catch (error) {
        next(error);
    }
}

/**
 * @route PUT /api/v1/subscription/update-subscription/:id
 * @desc update subscription with provided subscription id
 * @private
 */

export const updateSubscription = async (req, res, next) => {
    try {
        const { price, currency, frequency, paymentMethod, status } = req.body;

        if (!price && !currency && !frequency && !paymentMethod && !status) {
            res.status(400).json({
                success: false,
                error: 'Error updating Subscription. Missing required fields (price, currency, frequency, paymentMethod, status)'
            })
        }

        let updateFields = {};
        if (price) updateFields.price = price;
        if (currency) updateFields.currency = currency;
        if (frequency) updateFields.frequency = frequency;
        if (paymentMethod) updateFields.paymentMethod = paymentMethod;
        if (status) updateFields.status = status;

        const updatedSubscription = await subscriptionModel.findByIdAndUpdate(req.params.id,
            {$set: updateFields},
            {new: true}
            )
        if (!updatedSubscription) {
            return res.status(404).json({
                success: false,
                error: `Subscription with id: ${req.params.id} not found`
            })
        }

        res.status(200).json({
            success: true,
            message: `Subscription with id: ${req.params.id} updated successfully.`,
        })
    } catch (error) {
        next(error);
    }
}

/**
 * @route GET /api/v1/subscription/upcoming-renewals
 * @desc fetches subscriptions with upcoming renewal dates
 * @private
 */

export const getUpcomingSubscription = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const oneDayAhead = new Date(currentDate);
        oneDayAhead.setDate(oneDayAhead.getDate() + 1);

        const sevenDaysAhead = new Date(currentDate);
        sevenDaysAhead.setDate(sevenDaysAhead.getDate() + 7);

        const oneDayStart = new Date(oneDayAhead);
        const oneDayEnd = new Date(oneDayStart);
        oneDayEnd.setHours(23, 59, 99, 999);

        const sevenDaysStart = new Date(sevenDaysAhead);
        const sevenDaysEnd = new Date(sevenDaysStart);
        sevenDaysEnd.setHours(23, 59, 99, 999);

        const upcomingSubscriptionRenewals = await subscriptionModel.find({
            $or: [
                {
                    renewalDate: {
                        $gte: oneDayStart,
                        $lte: oneDayEnd,
                    }

                },

                {
                    renewalDate: {
                        $gte: sevenDaysStart,
                        $lte: sevenDaysEnd,
                    }
                }
            ],
            status: 'active'
        });

        if (!upcomingSubscriptionRenewals || upcomingSubscriptionRenewals.length === 0) {
            return res.status(404).json({
                success: false,
                error: 'No upcoming subscription found'
            })
        }

        res.status(200).json({
            success: true,
            data: upcomingSubscriptionRenewals
        })
    } catch (error) {
        next(error);
    }
}