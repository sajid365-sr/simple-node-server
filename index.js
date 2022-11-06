
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');


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

app.get('/users', (req,res) =>{
    res.send(users);
})

app.post('/users', (req, res) =>{
    console.log("Post API Called")
    console.log(req.body)
})

app.listen(port, () =>{
    console.log(`Simple node server running on port: ${port}`);
});