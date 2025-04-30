const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const clientRoutes = require('./routes/clients');
const produitRoutes = require('./routes/produits');
const commandeRoutes = require('./routes/commandes');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/cc1Angular-express', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('Failed to connect to MongoDB', err));

// Routes
app.use('/api/clients', clientRoutes);
app.use('/api/produits', produitRoutes);
app.use('/api/commandes', commandeRoutes);

app.get('/', (req, res) => {
    res.send('Hello from Express!');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});