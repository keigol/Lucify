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

const DreamEntry = mongoose.model('DreamEntry', dreamEntrySchema);

module.exports.DreamEntry = DreamEntry;