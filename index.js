const express =require("express");
const users=require("./MOCK_DATA.json")
const fs =require("fs")
const read=require("./read.js")

const app = express();
const port = 9000;

app.use(express.json());

// for broweser in html form
app.get("/users",(req,res)=>{
    const html=`
    <ul>
    ${users.map((user) =>`<li>${user.first_name}</li>`).join("")}
    </ul> 
    `;
    res.send(html);
})

// for api in json form 

app.get("/api/users",(req,res)=>{
    return res.json(users);
})

//without using find (my own method) 
// app.get("/api/users/:id",(req,res)=>{
//     const Id=req.params.id;
//     return res.json(users[(Id-1)]);
// })

// by using find (better to use this)
app.get("/api/users/:id",(req,res)=>{
    const Id=Number(req.params.id);
    const user=(users.find((user)=> user.id===Id))
    return res.json(user);
});

app.use(express.json());

app.post("/api/users",(req,res)=>{
  const body = req.body;
  user =read();
     users.push({...body, id: user.length+1});
    fs.writeFile(path,JSON.stringify(user),(err)=>{
        console.log("sussefully writen in the file");
    })
    res.send("pending");
})


app.get("/length",(req,res)=>{
    users= read();
    res.send(users.length);
})

app.patch("/api/users/:id", (req, res) =>{
    const Id = Number(req.params.id);
    const userData = read();

    const index = userData.findIndex(data => data.id === Id);
    if (index === -1) {
        return res.status(404).send("User not found");
    }
    userData[index]={
        ...userData[index]
        ,...req.body
    }
      fs.writeFile(path, JSON.stringify(userData), (err) => {
        if (err) {
            return res.status(500).send("Failed to update user file");
        }

        res.send(`Successfully updated data of user with id ${userData[index].id}`);
    });
    
})

app.delete("/api/users/:id", (req, res) => {
    const Id = Number(req.params.id);
    const userData = read();

    const index = userData.findIndex(data => data.id === Id);
    const deletedUser = userData.find(data => data.id === Id);

    if (index === -1) {
        return res.status(404).send("User not found");
    }

    userData.splice(index, 1); // remove the user from the array

    fs.writeFile(path, JSON.stringify(userData), (err) => {
        if (err) {
            return res.status(500).send("Failed to update user file");
        }

        res.send(`Successfully deleted ${deletedUser.first_name}'s data`);
    });
});

app.listen(port,()=>{ console.log("server started at port "+ port)})