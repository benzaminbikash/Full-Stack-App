const notFound=(req, res, next)=>{
    const error=new Error('Route is not found')
    res.status(400)
    next(error)
}
const errorHandling=(error, req, res, next)=>{
    const statusCode=error.statusCode||500
    res.status(statusCode).json({
        status:false,
        message:error.message,
    })
}
module.exports={errorHandling, notFound}