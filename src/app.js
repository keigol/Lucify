require('dotenv').config();
const cors = require('cors');
const express = require('express');

const { models, connectDb } = require('./models');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/:vfid', async (req, res, next) => {
    let user = await models.User.findByVoiceflowId(req.params.vfid);

    if (user == null) {
        user = new models.User({ vfid: req.params.vfid });
        user.save(function (err) {
            if (err) {
                console.log(err);
                return;
            }
        });
        console.log('user created');
    }

    req.context = {
        models,
        me: user
    }

    next();
})


// return dreams
app.get('/api/:vfid', async (req, res) => {
    models.User.findOne({ _id: req.context.me.id })
        .populate('dreams')
        .then(user => {
            res.json(user);
        })
    return;
});

// post dream
app.post('/api/:vfid/dream', async (req, res) => {
    let user = req.context.me;
    var dream = new models.Dream({
         description: req.body.description,
         characters: req.body.characters,
         places: req.body.places
        });
    dream.save(function (err) {
        user.dreams.push(dream);
        user.save(function (err) { console.error });
    })
    console.log('dream saved');

    return res.send();
})

// add starting fields
app.post('/api/:vfid/init', async (req, res) => {
    req.context.me.hobbies = req.body.hobbies;
    req.context.me.goals = req.body.goals;
    req.context.me.inspiration = req.body.inspiration;
    req.context.me.passion = req.body.passion;

    req.context.me.save(function (err) { console.error });

    return res.send();
})

connectDb()
    .then(async () => {
        app.listen(getPort());
    })
    .catch(console.error);

function getPort() {
    let port = process.env.PORT;
    if (port == null || port == "") {
        port = 8000;
    }

    return port;
}