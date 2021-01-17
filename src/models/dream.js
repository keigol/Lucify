const mongoose = require('mongoose');

const dreamSchema = new mongoose.Schema(
    {
        description: {
            type: String,
            required: true
        },
        characters: [String],
        places: [places]
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Dream', dreamSchema);