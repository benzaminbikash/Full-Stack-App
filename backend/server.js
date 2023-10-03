require('dotenv').config()
const express=require('express')
const server=express()
const mongoose=require('mongoose')
const cors=require('cors')
const morgan=require('morgan')
const { notFound, errorHandling } = require('./utils/errorHandling')
const router = require('./route/userRoute')
const route = require('./route/blogRoute')

//middleware
server.use(cors())
server.use(express.json())
server.use(morgan('dev'))

//Router
server.use('', router)
server.use('/blog', route)


//error middleware:
server.use(notFound)
server.use(errorHandling)

//connection mongodb
mongoose.connect(process.env.MONGO_URL).then(()=>{
    server.listen(process.env.PORT, ()=>{
        console.log(`Server listening on ${process.env.PORT}`)
    })
}).catch((err)=>{
    console.log(err)
})
