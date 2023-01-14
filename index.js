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
        const productsCollection = client.db("ReviveMobile").collection("products")
        const allUserCollection = client.db("ReviveMobile").collection("allUser")
        const wishlistCollection = client.db("ReviveMobile").collection("wishlistItems");
        const bookingCollection = client.db("ReviveMobile").collection("bookingItems");

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


        app.post("/dashboard/seller/addProduct", async (req, res) => {
            const product = req.body;
            const result = await productsCollection.insertOne(product);
            res.send(result)
        })


        app.get('/allProducts', async (req, res) => {
            const query = {}
            const result = await productsCollection.find(query).toArray()
            res.send(result)
        })


        // get products by category ID 
        app.get('/categoriesProduct', async (req, res) => {
            const categoryId = req.query.categoryId
            const query = { categoryId: categoryId }
            const categoriesProduct = await productsCollection.find(query).toArray();
            res.send(categoriesProduct)
        })


        // get specifics products for Seller
        app.get('/sellerProducts', async (req, res) => {
            const sellerEmail = req.query.sellerEmail;
            const query = { sellerEmail: sellerEmail }
            const sellerProducts = await productsCollection.find(query).toArray()
            res.send(sellerProducts)
        })


        //get product for home page 
        app.get('/advertisedHomeProduct', async (req, res) => {
            const query = { isAdvertised: "true" }
            const categoriesProduct = await productsCollection.find(query).limit(4).toArray();
            res.send(categoriesProduct)
        })


        //get product for all ads page
        app.get('/allAdvertiseItems', async (req, res) => {
            const query = { isAdvertised: "true" }
            const categoriesProduct = await productsCollection.find(query).toArray();
            res.send(categoriesProduct)
        })


        //post all user
        app.post("/dashboard/admin/allUser", async (req, res) => {
            const userDetails = req.body;
            const result = await allUserCollection.insertOne(userDetails);
            res.send(result)
        })


        //get user by email
        app.get('/allUser/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email: email }
            const user = await allUserCollection.findOne(query);
            res.send(user)
        })


        //1. get all buyers
        app.get('/dashboard/admin/allBuyers', async (req, res) => {
            const query = { role: "buyer" };
            const allUser = await allUserCollection.find(query).toArray();
            res.send(allUser)
        })


        //2. get all sellers
        app.get('/dashboard/admin/allSellers', async (req, res) => {
            const query = { role: "seller" };
            const allSeller = await allUserCollection.find(query).toArray();
            res.send(allSeller);
        })

        //post  wishlist in wishlistItems
        app.post('/dashboard/wishlist', async (req, res) => {
            const wishlistProduct = req.body;
            const wishlistItems = await wishlistCollection.insertOne(wishlistProduct);
            res.send(wishlistItems)
        })
        //get wishlist item
        app.get('/dashboard/wishlistItems', async (req, res) => {
            const userEmail = req.query.userEmail;
            const query = { userEmail: userEmail }
            const result = await wishlistCollection.find(query).toArray()
            res.send(result);
        })

        //post booking item
        app.post("/booking", async (req, res) => {
            const bookingItem = req.body;
            const result = await bookingCollection.insertOne(bookingItem);
            res.send(result);
        })

        //get booking item
        app.get('/dashboard/bookingItems', async (req, res) => {
            const userEmail = req.query.userEmail;
            const query = { buyerEmail: userEmail }
            const result = await bookingCollection.find(query).toArray()
            res.send(result);
        })

        // delete a seller 
        app.delete('/seller/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await doctorsCollection.deleteOne(query);
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