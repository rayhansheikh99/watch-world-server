const express = require('express')
const cors = require("cors");
require('dotenv').config()
const { MongoClient } = require('mongodb');
// const ObjectId = require('mongodb').ObjectId;

const app = express();
const port = process.env.PORT || 5000

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ouksj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        const database = client.db('watch_world');
        const productCollection = database.collection('products');
        const orderCollection = database.collection('orders');
        

        //GET Products API
        app.get('/products', async (req, res) => {
            const cursor = productCollection.find({});
            const products = await cursor.toArray();
            res.send(products);
        });

        // app.get('/orders', async (req, res) => {
        //     const cursor = orderCollection.find({});
        //     const orders = await cursor.toArray();
        //     res.send(orders);
        //     console.log(orders)
        // })

        // POST API
        app.post('/orders', async (req, res) => {
            const order = req.body;
            const result = await orderCollection.insertOne(order);
            res.json(result);
            console.log(result)
        })

        
       

    }

        finally {
            // await client.close();
        }
    }
    run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Get Ready to Fight')
})

app.listen(port, () => {
  console.log(`Server is running`,port)
})