const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./util/database');
const userRoutes = require('./routes/user');
const User = require('./models/users');
const cors = require('cors');

const app = express();

dotenv.config();

app.use(cors({
    origin: "*",
    credentials: true,
})
);
app.use(express.json());
app.use('/user', userRoutes);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/signup.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'signup', 'signup.html'));
});

app.get('/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'login', 'login.html'));
});

sequelize
.sync({force: true})
.then(() => {
    app.listen(5000);
})
.catch(err => {
    console.log(err);
});