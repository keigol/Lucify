require('dotenv').config();
const cors = require('cors');
const express = require('express');
const models = require('./models/models');
const { connectDb } = require('./models/index');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    req.context = {
        models,
        me: models.users[1]
    }
    next();
})

app.get('/api/:userId', (req, res) => {
    return res.send(req.context.models.users[req.context.me.id]);
});

app.post('/api/:userId', (req, res) => {
    const message = {
        text: req.body.text,
        userId: req.context.me.id,
    };

    return res.send(message);
})


connectDb()
    .then(async () => {
        app.listen(process.env.PORT, () => {
            console.log(`listening on port ${process.env.PORT}`);
        });
    })
    .catch(console.error);