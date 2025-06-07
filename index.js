const express =require("express");
const users=require("./MOCK_DATA.json")
const fs =require("fs")
const read=require("./read.js");
const lastId = require("./lastId.js");

const app = express();
const port = 9000;

app.use(express.urlencoded({extended:false}));

app.use(express.json());

// for broweser in html form
app.get("/users",(req,res)=>{

    const html=`
    <ul>
    ${users.map((user) =>`<li>${user.first_name}</li>`).join("")}
    </ul> 
    `;
    return res.status(200).send(html);

})

// for api in json form 

app.get("/api/users",(req,res)=>{
    res.setHeader('X-myName',"Kiran Dhungana")
    return res.status(200).json(users);
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
    return res.status(200).json(user);
});

app.post("/api/users",(req,res)=>{
  const body = req.body;
  if(!body || !body.first_name || !body.last_name || !body.email|| !body.gender|| !body.job_title)
  {
    return res.status(400).send("something is wrong with your request");
  }

   const user =read();
   const last_id=lastId();

     user.push({...body, id: last_id +1});
    fs.writeFile(path,JSON.stringify(user),(err)=>{
        console.log("sussefully writen in the file");
    })

    return res.status(201).send({status:"sucess",id:user.length});
})


app.get("/length",(req,res)=>{
    users= read();
    return res.status(200).send(users.length);
})

app.patch("/api/users/:id", (req, res) =>{
    const Id = Number(req.params.id);
    const userData = read();

    const index = userData.findIndex(data => data.id === Id); //if u dont find it sends -1
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

        return res.status(200).send(`Successfully updated data of user with id ${userData[index].id}`);
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

        return res.status(204).send(`Successfully deleted ${deletedUser.first_name}'s data`);
    });
});

app.listen(port,()=>{ console.log("server started at port "+ port)})