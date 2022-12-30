const express = require ('express');
const cors = require ('cors');
require ('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');

//middleware
app.use (cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.mwoallb.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        const postCollection = client.db('endgameFirst').collection('postSubmit');
        
        app.get('/postSubmit', async(req, res) =>{
            const query = {};
            const cursor = postCollection.find(query);
            const post = await cursor.toArray();
            res.send(post);
        });

        app.post('/postSubmit', async(req, res) =>{
            const post = req.body;
            const result = await postCollection.insertOne(post);
            res.send(result);
        });


    }
    finally{

    }
}

run().catch(err => console.error(err));

app.get ('/', (req,res) =>{
    res.send('Endgame First App Server');
})

app.listen (port, () =>{
    console.log(`server running on : ${port}`)
})

// end