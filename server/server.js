const express = require('express');
const connectDB = require('./config/DB');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const userRoute = require('./Routes/user');
const postsRoute = require('./Routes/post');
const { errorHandling } = require('./Middlewares/ErrorHandler');
const { notFound } = require('./Middlewares/notFound');


const app = express()
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cors({
    // origin : ['http://localhost:5176']
}))
app.use(cookieParser())


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


app.use(errorHandling)
app.use(notFound)