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

app.get('/api/:vfid', async (req, res) => {
    models.User.findOne({_id: req.context.me.id})
        .populate('dreams')
        .then(user => {
            res.json(user);
        })
    return;
});

app.post('/api/:vfid/dream', async (req, res) => {
    let user = req.context.me;
    var dream = new models.Dream({ description: req.body.description });
    dream.save(function (err) {
        user.dreams.push(dream);
        user.save(function (err) { console.error });
    })
    console.log('dream saved');

    return res.send();
})


connectDb()
    .then(async () => {
        app.listen(process.env.PORT, () => {
            console.log(`listening on port ${process.env.PORT}`);
        });
    })
    .catch(console.error);