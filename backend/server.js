import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"
// import { razorpayInstance } from "./config/razorpay.config.js"



//app config
const app=express()
// const port = 4000

const port = process.env.PORT || 4000;
// middle ware 

app.use(express.json())
app.use(cors())


// db connection
connectDB();
//razorpay
app.get("/api/getkey",(req,res)=>
res.status(200).json({key:process.env.RAZORPAY_KEY_ID}))
// razorpayInstance();

// api endpoints

app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)



app.get("/",(req,res)=>{
    res.send("API WORKING")
})

app.listen(port,()=>{
    console.log(`Server Started on http://localhost:${port}`)
})



