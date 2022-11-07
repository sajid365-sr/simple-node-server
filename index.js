
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');


app.get('/', (req, res) =>{
    res.send('Simple Node Server Running');
});

app.use(cors());
app.use(express.json());


const users = [
    {id:1, name:'player1', email:'player1@gmail.com'},
    {id:2, name:'player2', email:'player2@gmail.com'},
    {id:3, name:'player3', email:'player3@gmail.com'},
    {id:4, name:'player4', email:'player4@gmail.com'},
]

// username = dbuser1
// password = w5mUwlEfR9hphL45




const uri = "mongodb+srv://dbuser1:w5mUwlEfR9hphL45@cluster0.90qadcl.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        const userCollection = client.db('simpleNode').collection('users');
        const user = {name:'Abbas Ali', email:'aliabbas@gmail.com'};
        const user2 = {name:'Jobbar Ali', email:'alijobbar@gmail.com'};
        // const result = await userCollection.insertOne(user2);
        // console.log(result)

        app.post('/users', async(req, res) =>{
            // console.log("Post API Called")
            
            const user = req.body;
            const result = await userCollection.insertOne(user);
            user.id = result.insertedId;

            console.log(result);
            // users.push(user);
            // console.log(user);
        
            res.send(user);
        })

    }finally{

    }

}

run().catch( (e) =>{console.error(e)});



app.get('/users', (req,res) =>{
    if(req.query.name){
        //filter users by query
        const search = req.query.name;
        const filtered = users.filter(usr => usr.name.includes(search));
        res.send(filtered);
    }else{

        res.send(users);
    }
    
})

// app.post('/users', (req, res) =>{
//     // console.log("Post API Called")
    
//     const user = req.body;
//     user.id = users.length + 1;
//     users.push(user);

//     console.log(req.body);
//     console.log(user);

//     res.send(users);
// })



app.listen(port, () =>{
    console.log(`Simple node server running on port: ${port}`);
});