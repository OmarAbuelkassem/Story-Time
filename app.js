const express = require('express');
const { default: mongoose } = require('mongoose');
const blogRoutes = require('./Routes/blogroutes');
const dotenv = require("dotenv");


dotenv.config();

// express app
const app = express();
const port = process.env.PORT;
const DBURI = process.env.DBURI;

mongoose.connect(DBURI)
    .then((result) => {
        console.log('connected to the database')
        app.listen(port, () => {
            console.log(`The server is listening on port number:  ${port}`)
        })
    })
    .catch((err) => console.log(err));

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));



// Basic routing

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/blogapp', (req, res) => {
    res.redirect('/blogs');
});


app.get('/about', (req, res) => {

    res.render('about');
});



// redirects
app.get('/about-us', (req, res) => {
    res.redirect('/about');
});


// blog routes
app.use('/blogs', blogRoutes);


// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: 404 });
});


