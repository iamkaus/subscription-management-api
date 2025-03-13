import mongoose from 'mongoose';

const blacklistSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        ref: 'userModel'
    }
}, { timestamps: true });

const blacklistModel = mongoose.model('blacklistModel', blacklistSchema);
export default blacklistModel;