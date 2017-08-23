const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const SaxophoneSchema = ({
    yearAcquired: Number,
    manufacturer: {
        type: String,
        required: true
    },
    model: {
        type: String,
        enum: ['soprano', 'alto', 'tenor', 'baritone', 'bass'],
        required: true
    },
    condition: {
        type: String,
        enum: ['lamp', 'playable', 'good', 'pristine']
    },
    fSharpKey: {
        type: Boolean,
        required: true
    },
    setup: {
        mouthpiece: String,
        reed: String,
        case: String,
        mute: Boolean
    }
});

module.exports = mongoose.model('SaxophoneCollection', SaxophoneSchema);