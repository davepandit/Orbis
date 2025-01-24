import mongoose from 'mongoose'

export const connectToDB = async() => {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Mongo DB connected at: ${connectionInstance.connection.host}✨`);
    } catch (error) {
        console.log(`Error occured: ${error}⁉️`)
        process.exit(1);
    }
}