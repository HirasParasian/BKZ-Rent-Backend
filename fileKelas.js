const express = require("express")
// eslint-disable-next-line no-unused-vars
const {response} = require ("express")
const app = express()

app.use(express.urlencoded({extended: true}))

app.get("/", (request, response) => {
    return response.json({
        success: true,
        message: "backend is running well2"
    })
})
const users = []
app.post("/register",(req,res)=>{
    const data = {
        id: users.length+1,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        gender: req.body.gender,
        birthdate: req.body.birthdate
    }
    users.push(data)
    return res.json({
        success:true,
        message: "Register success!"
    })
})

app.get("/users",(req,res)=>{
    return res.json({
        success:true,
        message:"list of users",
        data: users
    })
})

app.patch("/users/:id",(req,res)=>{
    const{id}=req.params //destruct aray membuat id dalam params jadi variabel
    const index = users.findIndex(val=>val.id === parseInt(id))
    users[index].name=req.body.name
    users[index].email=req.body.email
    users[index].password=req.body.password
    users[index].gender=req.body.gender
    users[index].birthdate=req.body.birthdate

    return res.json({
        success:true,
        message:"list of users",
        data: users[index]
    })
})
app.get("/users/:id",(req,res)=>{
    const{id}=req.params //destruct aray membuat id dalam params jadi variabel
    const index = users.findIndex(val=>val.id === parseInt(id))
    delete users[index]

    return res.json({
        success:true,
        message:`'user dengan id ' ${id} 'is deleted'` ,
        data:users[index]
    })
})
app.listen(5000), ()=>{
    console.log("App Running Port 5000")
}


