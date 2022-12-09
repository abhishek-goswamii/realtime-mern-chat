 const mongoose = require("mongoose")

 const connnetDB = async()=>{


    try {
        const con = await mongoose.connect(process.env.MONGO_URI,{

            useNewUrlParser: true,
            useUnifiedTopology: true 

        })

        console.log(`MongoDB Connected ${con.connection.host}`);
        
    } catch (error) {

        console.log(error.message );
        process.exit()

    }

 }

 module.exports = connnetDB