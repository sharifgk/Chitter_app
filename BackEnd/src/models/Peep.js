const mongoose = require('mongoose');

const PeepSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        maxlength: 280
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Peep = mongoose.model('Peep', PeepSchema);

module.exports = Peep;