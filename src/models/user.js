const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        vfid: {
            type: Number,
            unique: true,
            required: true
        },
        dreams: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'DreamEntry'
        }],

        hobbies: String,
        goals: String,
        passion: String,
        inspiration: String
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