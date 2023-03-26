const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes.js');
const peepRoutes = require('./routes/peepRoutes.js');


const dotenv = require('dotenv').config({ path: '.env.development' });;


const app = express();

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/peeps', peepRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;