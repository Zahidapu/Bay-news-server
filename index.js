const express = require('express');
const cors = require('cors');
const fs = require('fs-extra');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();
const app = express();

// databse connection uri
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.t8p0s.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
console.log(process.env.DB_USER);

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// PORT
const PORT = process.env.PORT || 4444;


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const collection = client.db("bay-news").collection("services");
    console.log('Error ', err);
    console.log('Database connection successfully')


    // Contact Form API
    app.post('/formData', (req, res) => {
        const data = req.body;
        console.log(data);
        collection.insertOne(data)
            .then(result => {
                res.send(result.insertedCount > 0)
                console.log(result);
            })
    })


    // Review Create Form API 
    app.post('/reviewForm', (req, res) => {
        const reviewData = req.body;
        collection.insertOne(reviewData)
            .then(result => {
                res.send(result.insertedCount > 0)
                console.log(result)
            })
    })


    // Review Read data from server
    app.get('/review', (req, res) => {
        collection.find({})
            .toArray((error, documents) => {
                res.send(documents);
            })
    })

    app.post('/addService', (req, res) => {
        const newEvent = req.body;

        console.log("adding new events", newEvent);
        collection.insertOne(newEvent)
            .then(result => {
                console.log("inserted Count", result.insertedCount);
                res.send(result.insertedCount > 0)
            })
    })


    // booking formData
    app.post('/booking', (req, res) => {
        const reviewData = req.body;
        collection.insertOne(reviewData)
            .then(result => {
                res.send(result.insertedCount > 0)
                console.log(result)
            })
    })


    // login admin
    app.post('/loginAdmin', (req, res) => {
        const reviewData = req.body;
        collection.insertOne(reviewData)
            .then(result => {
                res.send(result.insertedCount > 0)
                console.log(result)
            })
    })



});


// Create API 
app.get('/', (req, res) => {
    res.send('Hello this is jahid, working everthing fine ! ')
})
app.listen(PORT, () => {
    console.log(`listening on port http://localhost:${PORT}`)
});