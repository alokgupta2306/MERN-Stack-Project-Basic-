const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cors = require('cors')  // ADD THIS

const workoutRoutes = require('./routes/workout')
const userRoutes = require('./routes/user')

dotenv.config()

const app = express()
const PORT = process.env.PORT

// ADD CORS
app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
        ? 'https://mern-basic.netlify.app'
        : 'http://localhost:3000',
    credentials: true
}))

app.use(express.json())

app.use((req, res, next)=>{
    console.log(req.path, req.method)
    next()
})

app.get('/',(req, res)=> {
    res.json({msg: 'welcome to our appln'})
})

app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)

mongoose.connect(process.env.MONGO_URI)
.then(()=> {
    app.listen(PORT,()=>(
        console.log(`Server is up and listening at: http://localhost:${PORT} & connected to our DB`)
    ))
})
.catch((error)=>(console.log(error)))