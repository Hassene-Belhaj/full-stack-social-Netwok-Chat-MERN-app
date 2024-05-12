const express = require('express');
const connectDB = require('./config/DB');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const userRoute = require('./Routes/user');
const postsRoute = require('./Routes/post');
const chatRoute = require('./Routes/chat');
const { errorHandling } = require('./Middlewares/ErrorHandler');
const { notFound } = require('./Middlewares/notFound');
const cloudinary = require('cloudinary').v2;


const app = express()
app.use(express.json({limit : "35mb"}))
app.use(express.urlencoded({extended : true}))
app.use(cors({
    origin : ['http://localhost:5173'],
    credentials : true
}))
app.use(cookieParser())


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY , 
    api_secret:process.env.CLOUDINARY_API_SECRET,
})


const server = ()  => app.listen(process.env.PORT || 5000 , ()=>console.log('server is running'))


const Start = async() => {
    try {
        await connectDB(process.env.DB, console.log('connected to database'))
        server()
    } catch (error) {
        console.log(error)
    }

}


Start()


app.use('/api/user',userRoute)
app.use('/api/posts',postsRoute)
app.use('/api/chat',chatRoute)


app.use(errorHandling)
app.use(notFound)