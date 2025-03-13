import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        trim: true,
        minlength: 5,
        maxlength: 50,
    },

    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        unique: [true, 'Email must be unique'],
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'],
    },

    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 6,
    }
}, { timestamps: true });

const userModel = mongoose.model('userModel', userSchema);
export default userModel;