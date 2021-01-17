const mongoose = require('mongoose');

const dreamEntrySchema = new mongoose.Schema(
    {
        description: {
            type: String,
            unique: true,
            required: true
        },

        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('DreamEntry', dreamEntrySchema);