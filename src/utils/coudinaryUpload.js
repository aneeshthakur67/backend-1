import { v2 as cloudinary } from "cloudinary";
import fs from "fs"
import dotenv from "dotenv";
import { fileURLToPath } from "url";
dotenv.config()
console.log(process.env.CLOUD_API);


cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API,
    api_secret:process.env.CLOUD_SECRET
})

async function uploadOnCloudinary(file){
    try {
        const result  = await cloudinary.uploader.upload(file)
        fs.unlinkSync(file)
        return result
    } catch (error) {
        console.log(error);
        fs.unlinkSync(file)
    }

}


export default uploadOnCloudinary
