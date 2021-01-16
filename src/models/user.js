const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true
        }
    },
    {
        timestamps: true
    }
)

userSchema.pre('remove', function(next) {
    this.model('DreamEntry').deleteMany({user: this._id}, next);
})

const User = mongoose.model('User', userSchema);

module.exports.User = User;