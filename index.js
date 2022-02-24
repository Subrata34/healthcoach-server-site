const express = require('express')
const app = express()
const cors = require('cors');
require('dotenv').config();
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const fileUpload = require('express-fileupload');

const port = process.env.PORT || 5000;



app.use(cors());
app.use(express.json());
app.use(fileUpload());

const uri = `mongodb+srv://subrata:abcd1234@cluster0.g4aj0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true});



async function run() {
    try {
        await client.connect();
        const database = client.db('user');
        const appointmentsCollection = database.collection('people');
        const peopleCollection=database.collection('appiont');
        
        app.post('/appiont', async (req, res) => {
            console.log(req.body.discription);
            const name=req.body.name;
            const discription =req.body.discription;
            const pic =req.files.image;
            const picData=pic.data;
            const encoded=picData.toString('base64');
            const imageBuffer=Buffer.from(encoded,'base64');
            const user={
                name,
                discription,
                image:imageBuffer
            }
            console.log(user);
            const result =await peopleCollection.insertOne(user);
            res.json(result);
        });

       

      

        

      
    }
    finally {
        // await client.close();
    }
}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Hello Doctors portal!')
})

app.listen(port, () => {
    console.log(`listening at ${port}`)
})

// app.get('/users')
// app.post('/users')
// app.get('/users/:id')
// app.put('/users/:id');
// app.delete('/users/:id')
// users: get
// users: postconst express = require('express')
