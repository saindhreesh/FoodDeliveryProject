import mongoose from "mongoose";

export const connectDB =  async () =>{
    try {
        await mongoose.connect(process.env.MONGODB_URI.trim())
        .then(()=>console.log('Database Connected'))
        .catch((err)=> console.log(err))
    } catch (error) {
        console.log(error);
    }
};

