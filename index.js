const express = require('express');
const cors = require('cors');

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express()
const port = process.env.PORT || 4000;

// For dotenv 
require('dotenv').config();


// Middleware:
app.use(cors())
app.use(express.json())

// for mongoDb doc 

const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASSWORD}@cluster0.dptn3ue.mongodb.net/?retryWrites=true&w=majority`;


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



async function run() {
    try {
        const categoryCollection = client.db("ReviveMobile").collection("categoriesItems");

        app.get('/categories', async (req, res) => {
            const query = {}
            const result = await categoryCollection.find(query).toArray();
            res.send(result)
        })
        app.get('/categories/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await categoryCollection.findOne(query);
            res.send(result)
        })




    }
    finally {

    }


}
run().catch(console.error);




app.get('/', async (req, res) => {
    res.send("Revive Mobile Server is Running now...")
})

app.listen(port, () => {
    console.log(`ReviveMobile server running on port ${port}`);
})