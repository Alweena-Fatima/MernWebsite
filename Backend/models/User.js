import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    userid: {
        type: String,
        required: [true, 'User ID is required'],
        unique: true,
        trim: true,
        lowercase: true,
        minlength: [3, 'User ID must be at least 3 characters long'],
        maxlength: [30, 'User ID cannot exceed 30 characters'],
        match: [/^[a-zA-Z0-9_]+$/, 'User ID can only contain letters, numbers, and underscores']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    lastLogin: {
        type: Date,
        default: null
    }
}, {
    timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

// Hide password in JSON
userSchema.methods.toJSON = function() {
    const user = this.toObject();
    delete user.password;
    return user;
};

// Virtual displayName
userSchema.virtual('displayName').get(function() {
    return this.userid;
});

export default mongoose.model("User", userSchema);
