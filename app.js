const express = require('express');
const morgan = require('morgan');
const models = require('./models');
const wikiRouter = require('./routes/wiki');
const userRouter = require('./routes/user');

const app = express();

app.use(express.urlencoded({ extended: false}));
app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));

models.db.authenticate().then(() => {
    console.log('connected to the database');
});

app.use('/wiki', wikiRouter);

app.get('/', (req, res) => {
    res.redirect('/wiki');
});

const PORT = 3000;

async function init() {
    await models.db.sync();
    app.listen(PORT, () => {
        console.log(`app listening to port ${PORT}`);
    });
}

init();
