require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const { connection } = require('./db')

const news = require('./routes/news.routes');
const PORT = process.env.NODE_ENV || 5000;

// mongodb connection
connection();

app.use(cors())
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

app.get("/", function (req, res) {
    res.send("Hello worlddd")
})

app.listen(PORT, () => {
    console.log(`Server is up and running on ${PORT}...`)
});

// Router
app.use("/api/v1", news)