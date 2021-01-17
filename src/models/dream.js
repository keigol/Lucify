const mongoose = require('mongoose');

const dreamSchema = new mongoose.Schema(
    {
        description: {
            type: String,
            required: true
        },
        characters: [String],
        place: [places]
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Dream', dreamSchema);