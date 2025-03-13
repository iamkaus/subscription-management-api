import { Router } from 'express';
const subscriptionRoutes = Router();

subscriptionRoutes.get('/get-subscriptions', async (req, res) => {
    res.send({
        title: 'Get all the subscriptions',
    })
}); // secure route possibly admin only

subscriptionRoutes.get('/get-subscriptions/:id', async (req, res) => {
    res.send({
        title: 'Get subscription details',
    })
}); // secure route possibly admin only

subscriptionRoutes.get('/user/:id', async (req, res) => {
    res.send({
        title: 'Get all user subscriptions',
    })
});

subscriptionRoutes.post('/new-subscription', async (req, res) => {
    res.send({
        title: 'Create new subscription',
    })
});

subscriptionRoutes.put('/update-subscription/:id', async (req, res) => {
    res.send({
        title: 'Update subscription',
    })
});

subscriptionRoutes.delete('/delete-subscription/:id', async (req, res) => {
    res.send({
        title: 'Delete subscription',
    })
});

subscriptionRoutes.put('/update-subscription/:id/cancel', async (req, res) => {
    res.send({
        title: 'Update subscription',
    })
});

subscriptionRoutes.get('/upcoming-renewals', async (req, res) => {
    res.send({
        title: 'Get upcoming renewals',
    })
});

export default subscriptionRoutes;