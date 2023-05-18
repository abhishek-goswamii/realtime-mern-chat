 const mongoose = require("mongoose")

 const connnetDB = async()=>{

    // local database connection

        // try {
        //     await mongoose.connect('mongodb://localhost/mydatabase', {
        //         useNewUrlParser: true,
        //         useUnifiedTopology: true
        //       });
        //       console.log("MongoDB Connected...");

        // } catch (err) {
        //        console.error(err.message);
        //        process.exit(1);
        // }
        
    // remote database connection
    
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