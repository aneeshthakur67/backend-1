import multer from "multer";


let storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"./upload")
        // console.log(file);
        
    },
    filename:function(req,file,cb){
        cb(null,`${Date.now()}-${file.originalname}`)
        // console.log(file);
        
    }
})

const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
export let upload = multer({
    storage,
    fileFilter:function(req,file,cb){
        if(allowedTypes.includes(file.mimetype)){
            cb(null,true)
        }else{
            cb(new Error("File type is not valid"),false)
        }
    }
})

