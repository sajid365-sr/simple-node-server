
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
client.connect(err => {
  const collection = client.db("simpleNode").collection("users");
  // perform actions on the collection object
  console.log('database connected')
  client.close();
});



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

app.post('/users', (req, res) =>{
    // console.log("Post API Called")
    
    const user = req.body;
    user.id = users.length + 1;
    users.push(user);

    console.log(req.body);
    console.log(user);

    res.send(users);
})

// app.delete('/users', (req, res) =>{
//     const dltUser = req.body.deleteUser;
//     const remain = users.filter(user => user.email !== dltUser);
//     console.log(remain)
//     res.send(remain)
// })

app.listen(port, () =>{
    console.log(`Simple node server running on port: ${port}`);
});