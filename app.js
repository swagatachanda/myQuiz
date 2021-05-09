const express=require('express')
const mongoose=require('mongoose')
const quizRoute= require('./routes/quizRoute')
const clientRoute=require('./routes/clientRoute')
const QuizDetails= require('./models/quizdetails')
const app=express()
require('dotenv/config')

app.use('/api',quizRoute)
app.use('/quiz',clientRoute)
app.use(express.static(__dirname+'/css'))
app.set('view engine', 'ejs')

app.get('/',async (req,res)=>{
    try{
        const quizDetails=await QuizDetails.find()
        res.render('createquiz',{data : quizDetails})
    }
    catch(err)
    {
        console.log("err");
    }
    
})

mongoose.connect(process.env.DB_CONNECTION,{ 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})

app.listen(process.env.PORT || 3000 )