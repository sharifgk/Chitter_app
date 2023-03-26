const Peep = require('../models/Peep');

exports.createPeep = async (req, res) => {
    try {
        const { content, user } = req.body;
        const peep = new Peep({ content, user });
        await peep.save()
        res.status(201).json({ peep });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllPeeps = async (req, res) => {
    try {
        const peeps = await Peep.find().populate('user','username').sort({ createdAt: -1 });
        res.status(200).json( peeps );
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};