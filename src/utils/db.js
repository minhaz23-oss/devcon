import mongoose from "mongoose";

 const dbConnect = async () => {
    try {
        if(mongoose.connection.readyState) return;
    await mongoose.connect(process.env.MONGODB_URI,
        {
            useNewUrlParser : true,
            useUnifiedTopology: true
        }
    ) 
    console.log('mongodb connected successfully')
    } catch (error) {
        console.log('mongodb connection error')
    }
}

export default dbConnect;