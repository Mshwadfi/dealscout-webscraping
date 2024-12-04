import mongoose from "mongoose";


let isConnected = false;

export const connectToDB = async () =>{
    mongoose.set('strictQuery', true);

    if(!process.env.DATABASE_URI) return console.log('please ensure your connection string is correct');

    // if(isConnected) return console.log('')
    try {
        await mongoose.connect(process.env.DATABASE_URI);
        isConnected = true;
        console.log('connected to DB');
    } catch (error) {
        console.log(error);
    }
}