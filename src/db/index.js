import mongoose from "mongoose"


async function connectDB(){
    try {
        await mongoose.connect("mongodb://localhost:27017/backend")
        console.log("mongodb connected");
        
    } catch (error) {
        console.error(error);
        process.exit(1)
        
        
    }
    
    
}

export default connectDB