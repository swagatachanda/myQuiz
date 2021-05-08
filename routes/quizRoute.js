const e = require('express');
const express = require('express')
const Quiz= require('../models/quizdetails')
const Question=require('../models/questions')
const router= express.Router();

router.use(express.json())

const validateQuizID= async (id)=>{
    try{
        const response=await Quiz.findById(id)
        if(response != null)
            return true
        return false
    }
    catch(err)
    {
        console.log(err);
    }   
}
router.get('/',(req,res)=>{
    res.send("This is api page")
})
router.post('/create',async (req,res)=>{
    console.log(req.body)
    const quizdet=new Quiz({
        name: req.body.name,
        author:req.body.author,
        authorEmail: req.body.authorEmail,
        dot : new Date(),
        attempts: req.body.attempts 
    })
    try{
        const newQuiz=await quizdet.save()
        res.json({'status' : true, 'data' : newQuiz})
    }
    catch(err){
        res.json({"status" : false , 'error': err, 'code' : 10}) 
    }
})
router.post('/create/:id', async (req,res)=>{
    var status={}
    var response= await validateQuizID(req.params.id)
    if(response==false)
    {
        status.status=false
        status.code=12
    }
    else
    {
        status.status=true
        const newQuestion= new Question({
            quizId: req.params.id,
            ques: req.body.ques,
            options: req.body.options,
            answer:req.body.answer,
            marks: req.body.marks,
            isNegative: req.body.isNegative,
            negative: req.body.negative
        })
        try{
            const quesSubmit= await newQuestion.save();
            status.data=quesSubmit;
        }
        catch(err){
            status.status=false;
            status.code=12;
        }
    }
    res.json(status)
})
router.post('/assessment/:quizid',async (req,res)=>{
    var status={}
    var response= await validateQuizID(req.params.quizid)
    if(response==false)
    {
        status.status=false
        status.code=12
    }
    else
    {
        status.status=true
        var questionIds=await Question.find({'quizId':req.params.quizid})
        console.log(questionIds)
    }
})


module.exports=router

