const jwt=require('jsonwebtoken')

const generateToken=(id)=>{
    return jwt.sign({id}, process.env.SECRET, {expiresIn:"4d"})
}
module.exports={generateToken}