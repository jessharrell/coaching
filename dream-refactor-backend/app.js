const express = require('express')
const app = express()
const port = 3003

const cors = require('cors')
app.use(cors())
app.use(express.json())

let approvals = [];

let allUsers = [
    { firstName: "Arya", lastName: "Meadows", joinDate: "12/31/2020"},
    { firstName: "Levi", lastName: "Palmer", joinDate: "06/01/2021"},
];

app.get('/users', (req, res) => {
    res.json({ users: allUsers });
})

app.post('/addUser', (req, res) => {
    if(!req.body.override && parseInt(req.body.user.joinDate.substring(req.body.user.joinDate.length - 4)) < 2022) {
        approvals.push({type: "add", user: req.body.user});
    } else {
        if(req.body.override){
            approvals = approvals.filter( a => a.user === req.body.user );
        }
        allUsers.push(req.body.user);
    }

    res.sendStatus(200);
})

app.get('/approvals', (req, res) => {
    res.json({ approvals: approvals });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
