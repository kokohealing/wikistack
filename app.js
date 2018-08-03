const express = require('express');
const morgan = require('morgan');
const models = require('./models');

const app = express();

app.use(express.urlencoded({ extended: false}));
app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));

models.db.authenticate().then(() => {
    console.log('connected to the database');
});

app.get("/", async (req, res, next) => {
    res.send(`
    <!DOCTYPE HTML>
    <html>
        <head>
            <title>"Hello Everyone"</title>
            <link rel="stylesheet" href="stylesheets/style.css" />
        </head>
        <body>"Hello Everyone!"</body>
    </html>
    `);
});

const PORT = 3000;

async function init() {
    await models.db.sync({force: true});
    app.listen(PORT, () => {
        console.log(`app listening to port ${PORT}`);
    });
}

init();
