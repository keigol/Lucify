require('dotenv').config();
const cors = require('cors');
const express = require('express');

const { models, connectDb } = require('./models');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use( async (req, res, next) => {
    req.context = {
        models,
        me: await models.User.findByVoiceflowId(1)
    }
    next();
})

app.get('/api/:userId', async (req, res) => {
    // const user = await req.context.models.User.findById(req.context.me.id);
    return res.send(req.context.me);
});

app.post('/api/:userId', async (req, res) => {
    let user = req.context.me;
    var dreamEntry = new models.DreamEntry({description: 'I had a dream'});
    dreamEntry.save(function(err) {
        user.dreams.push(dreamEntry);
        user.save(function(err) {console.error});
    })

    return res.send();
})


connectDb()
    .then(async () => {
        app.listen(process.env.PORT, () => {
            console.log(`listening on port ${process.env.PORT}`);
        });
    })
    .catch(console.error);