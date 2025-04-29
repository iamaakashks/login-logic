const express = require('express')
require('./config/dotenv.js')
const {connectDB} = require('./config/db.js');
const authRoutes = require('./routes/auth_routes.js')

const app = express();
const PORT = process.env.PORT;
app.use(express.json())
connectDB();

app.get('/', (req, res)=>{
    res.status(200).send({msg: "Welcome to the Home page"})
})
app.use('/api', authRoutes)

app.listen(PORT, ()=>{
    console.log(`Server is live at PORT ${PORT}`)
})