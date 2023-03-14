const mongoose = require("mongoose");

const connectDatabase=()=>{
    mongoose.set("strictQuery", false);
    mongoose.connect(process.env.DB_LOCAL_URL,{
        useNewUrlParser:true,
    }).then(con=>{
        console.log(`MongoDB id connected to the host:${con.connection.host}`);
    })
}

module.exports={connectDatabase};