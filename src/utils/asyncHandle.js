function asyncHandler(asyncreq){
    return (req,res,next) => {
        Promise.resolve(asyncreq(req,res,next)).catch((err) =>{
            next()
        })
    }
}

export {asyncHandler}