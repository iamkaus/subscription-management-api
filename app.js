import express from 'express';
import {PORT} from "./config/env.js";
const app = express();
import authRoutes from './routes/auth.route.js'
import userRoutes from "./routes/user.route.js";
import subscriptionRoutes from "./routes/subscription.route.js";
import {connectToDatabase} from "./database/mongoDB.js";

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
    res.send('Welcome to the subscription tracking api gateway')
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/subscription', subscriptionRoutes);

app.listen(PORT, async () => {
    console.log(`Subscription tracking api gateway is running on port: http://localhost:${PORT}`)

    await connectToDatabase();
});