class CustomErrorApi extends Error {
    constructor(message , statusCode) {
        super(message) ;
        this.statusCode = statusCode ;
    }
}


const createCustomError = (message,statusCode) => {
    return new CustomErrorApi(message , statusCode)
}


const errorHandling = (err, req,res, next) => {
    if(err instanceof CustomErrorApi) {
        return res.status(err.statusCode).json({success : false , msg : err.message})
    } else {
       return  res.status(500).json({success : false , msg : 'something went wrong  , please try again later' , error : err.stack})
    }
}


module.exports = {
    createCustomError , errorHandling
};
