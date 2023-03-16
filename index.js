const express=require("express")
const bodyParser=require("body-parser")
const dotEnv=require("dotenv")

dotEnv.config()
const app=express()
require("./config/config")
const userRoutes=require("./routes/userRoutes")

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use("/user",userRoutes)
app.listen(process.env.PORT,()=>{
    console.log(`server is running on ${process.env.PORT}`)
})





