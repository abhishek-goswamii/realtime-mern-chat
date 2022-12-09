let express = require('express')
const {chats} = require('./data/data')
const dotenv = require('dotenv')
const connectDB = require('./config/db')

const userRoutes = require('./routes/userRoutes')
const chatRoutes = require('./routes/chatRoutes')

const {notFound,errorHandler} = require('./middleware/errorMiddleware')

dotenv.config()

connectDB()

const app = express()

app.use(express.json())

app.get('/',(req,res) => {
  res.send('working');
})

//register and login api's
app.use('/api/user',userRoutes)

//chat pages api's
app.use('/api/chat',chatRoutes)

app.use(notFound)

app.use(errorHandler)

const port = process.env.PORT || 4000

app.listen(port,() => {
  console.log(`at port ${port}`);
})