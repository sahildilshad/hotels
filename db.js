const mongoose =  require("mongoose")


const mongoURL = "mongodb://localhost:27017/hotels"

mongoose.connect(mongoURL,{
    useNewUrlParser:true,
    useUnifiedTopology: true
})

const db = mongoose.connection;

db.on("connected",()=>{
    console.log("connect to mongoDB server");
    
})
db.on("error",()=>{
    console.log("connect to mongoDB error");
    
})
db.on("disconnected",()=>{
    console.log("mongoDB disconnected");
    
})

module.exports = db;