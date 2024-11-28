import orderModel from "../models/orderModel.js";
import userModel from '../models/userModel.js'
import {razorpayInstance} from "../config/razorpay.config.js";
// import orders from "razorpay/dist/types/orders.js";
// import crypto from "crypto";


 const currency='INR'

// added razorpay






//placinng user order for frontend
const placeOrder = async(req,res) =>{

    const frontend_url = "http://localhost:5173";
     try {

        const{userId, items,amount,address}=req.body
        const orderData={
            userId,
            items,
            amount,
            address,
            payment:false,
            date:Date.now()
        }
        // const newOrder = new orderModel({
        //     userId:req.body.userId,
        //     items:req.body.items,
        //     amount:req.body.amount,
        //     address:req.body.address 
        // })
        const newOrder = new orderModel(orderData)
        await newOrder.save();
        // await userModel.findByIdAndUpdate(userId,{cartdata:{}});
  
        const options ={
            amount: amount*100,
            currency:currency,
            receipt: newOrder._id.toString()
        }
        console.log(options);
        

        await razorpayInstance.orders.create(options,(error,order)=>{
             console.log(options);
            //  console.log(order);          
            if(error){
                console.log("Error:",error);     
                return res.json({success:false, message:"error2"  })
            }
            res.json({success:true,order})
        })     
               
    } catch (error) {
       console.log(error)
       res.json({success:false,message:"error1"}) 
    }
}
 // const order = await razorpayInstance.orders.create({
        //     amount:amount,
        //     mode:'payment',
        //     success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
        //     cancel_url:`${frontend_url}/verify?success=flase&orderId=${newOrder._id}`
        // })    
        // res.json({success:true,session_url:order})
const verifyOrder = async(req,res)=>{
    try {
        const { userId, razorpay_order_id} = req.body

        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
        // console.log(orderInfo.status)
        // console.log("123");
        if(orderInfo.status === 'paid') {
            // console.log(orderInfo.status)
            // console.log(orderInfo.receipt)
            await orderModel.findByIdAndUpdate(orderInfo.receipt,{payment:true});
            await userModel.findByIdAndUpdate(userId,{cartdata:{}})
            res.json({success: true,message:"Payment Successful"})
        }else{
            res.json({success:false,message:"Payment Failed"}) 
        }
        
        
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"error1"}) 
        
    }
}

// user order for frontend

const userOrders = async (req,res)=>{
    try {
        const orders = await orderModel.find({userId:req.body.userId});
        res.json({success:true,data:orders})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }

}

// Listing order for admin panel 
const listOrders = async(req,res)=>{
    try {
        const orders= await orderModel.find({});
        res.json({success:true,data:orders})
        // console.log(orders);
        // console.log(orders.address.firstName);
        
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})        
    }
}

// api for updating order status
const updateStatus = async(req,res)=>{
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
        res.json({success:true,message:"Status Updated"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }
}
    
export {placeOrder,verifyOrder,userOrders,listOrders,updateStatus}


  // const{orderId,success} = req.body;
    // try {
    //     if (success=="true") {
    //         await orderModel.findByIdAndUpdate(orderId,{payment:true});
    //         res.json({success:true,message:"Paid"})
    //     }
    //     else{
    //         await orderModel.findByIdAndDelete(orderId);
    //         res.json({success:false,message:"Not Paid"})
    //     }
    // } catch (error) {
    //     console.log(error);
    //     res.json({success:false,message:"Error"})
        
    // }
      // const options={
        //     amount:line_items,
        //     currency: 'INR',        // Currency, INR for Indian Rupees
        //     payment_capture: 1,     // Automatically capture payment after success
        //     callback_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,  // Success URL
        //     cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`     // Cancel URL
        // }
        // const session = await razorpayInstance.orders.create(options)
        // res.json({
        //     order_id:session.id,
        //     currency:res.currency,
        //     amount:res.amount
        // })

 // Return the session URL to the frontend so that it can redirect the user
        //   res.json({
        //     success: true,
        //     session_url: session.short_url // Razorpay short URL for the payment page
        //   });
// const line_items = req.body.items.map((item)=>({
//         price_data:{
//             currency:"INR",
//             product_data:{
//                 name:item.name
//             },
//             unit_amount:item.price*100
//         },
//         quantity:item.quanity
//     }))

//     line_items.push({
//         price_data:{
//             currency:"INR",
//             product_data:{
//                 name: "Deliver charges"
//             },
//             unit_amount:10*100
//        },
//        quantity:1 
//     })      
    // const session = await razorpayInstance.orders.create({
    //     amount: line_items,  // Amount in paise     
        // currency: 'INR',        // Currency, INR for Indian Rupees
        // payment_capture: 1,     // Automatically capture payment after success
        // callback_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,  // Success URL
        // cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`     // Cancel URL
    //   });

 // const session = await razorpayInstance.orders.create({
        //     amount: line_items,  // Ensure `line_items` contains the correct amount in paise (1 INR = 100 paise)
        //     currency: 'INR', // Optional: Define currency if not already set globally
        //     payment_capture: 1, // Optional: Automatically capture payment
        //     mode: 'payment', // This should be 'payment', but this is a default, so it can be omitted
        //     callback_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
        //     cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
        // });


          // razorpayInstance.checkout.sessions.create
        // const session = await razorpayInstance.orders.create({
        //     amount:line_items,
        //     mode:'payment',
        //     callback_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
        //     cancel_url:`${frontend_url}/verify?success=flase&orderId=${newOrder._id}`
        // });      
        // res.json({success:true,session_url:session.short_url})



        
      
        // const amount = req.body.items.map((item)=>({
        //     price_data:{
        //         currency:"INR",
        //         product_data:{
        //             name:item.name
        //         },
        //         unit_amount:item.price*100
        //     },
        //     quantity:item.quanity
        // }))
    
        // amount.push({
        //     price_data:{
        //         currency:"INR",
        //         product_data:{
        //             name: "Deliver charges"
        //         },
        //         unit_amount:10*100
        //    },
        //    quantity:1 
        // }) 