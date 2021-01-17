const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true
        },
        vfid: {
            type: Number,
            unique: true,
            required: true
        }
    },
    {
        timestamps: true
    }
);

userSchema.statics.findByVoiceflowId = async function (id) {
    let user = await this.findOne({
        vfid: id
    });
    return user;
};

userSchema.pre('remove', function (next) {
    this.model('DreamEntry').deleteMany({ user: this._id }, next);
});

module.exports = mongoose.model('User', userSchema);