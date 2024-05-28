const express = require("express");
const router  = express.Router();
const passport = require("../passport");
router.use(express.urlencoded({ extended: true }));

const User = require("../models/Usermodel");
const Subject = require("../models/SubjectModel");
const Question = require("../models/QuestionModel");
const Submission = require("../models/SubmissionModel");


function AddSubmision(information,user,res){
    /*information format
completed_assignments:[{
    classId:String,or class:subject id
    quesId:String,//Qid,classid already with question
    submission_details:[{
            lang:String,
            plag:String,
            submitTime:String,//submitted at what time
            time_complete:String,//how much time to submit assignment
            time_out:String,//how much time outside window : (in / out)
            result:String,//output of submitted code
            marks:String//later by teacher
            }],//add lang that is attempted & delete prev if already exist
        }]
    */
    //new_submission.save(); //to load as a model in database
    console.log("entered function")
    console.log(information)
    console.log("user- "+user)

    const assignment=Submission({
        userId:user._id,
        classId:information.subjectId,
        quesId:information.qId,
        lang:information.lang,
        plag:information.plag,
        //submitTime:information.submitTime,
        //time_complete:information.time_complete,
        //time_out:information.time_out,
        code:information.code,
        result:information.result,
        marks:'Not Evaluated'
        });
        assignment.save();
    
        User.findOne({_id:user._id}, (err, found)=>{
            if(!err){
                found.completed_assignments.push(assignment._id);
                found.save((err, result)=>{
                    if(err) console.log(err);
                    res.send("Submitted Succesfully");
                });
            }
            else{
                res.send("Null");
            }
        });
}
router.post("/addSubmission",
(req, res)=>{
    if(req.isAuthenticated()){
    if(req.user.usertype!="teacher"){
        console.log("req received")
        AddSubmision(req.body,req.user,res)
        console.log("leaving")
    }else{
        res.send("Cannot proceed with submission");
    }
}else{
    res.send("null");
}
});


function ViewAllSubmission(information,user,res){
    //All submissions of a question
    const filtered=Submission.find().where('quesId').equals(information.questionId)
    filtered.find({}, (err, found)=>{
        if(!err){
            console.log("here : "+found)
            const dataArr=found;
            console.log("dataa : ",dataArr)
            res.send(dataArr);
        }
        else{
            res.send("Null");
        }
    });
}

router.post("/viewAllSubmission",
(req, res)=>{
    if(req.isAuthenticated()){
        console.log("req received")
        ViewAllSubmission(req.body,req.user,res)
        console.log("leaving")
}else{
    res.send("null");
}
});

router.post("/getsubmissioninfo",(req,res)=>{
    if(req.isAuthenticated()){
        Submission.findOne({_id:req.body.submissionId}, (err, found)=>{
            if(found){
                res.send(found);                
            }else{
                res.send("null");
            }
        });
    }else{
        res.send("null");
    }
});
router.post("/getmarks",(req,res)=>{
    if(req.isAuthenticated()){
        const filtered=Submission.findOne().where('userId').equals(req.body.studentId)
        filtered.findOne({quesId:req.body.questionId}, (err, found)=>{
            if(!err){
            if(found){
                const marks_obtained=found;
                console.log("marks output = "+found.marks)
                res.send(marks_obtained);                
            }else{
                console.log("not found = "+found)
                res.send("null");
            }}
            else
            {
                console.log("error = "+err)
                res.send('Not Evaluated')
            }
        });
    }else{
        res.send("null");
    }
});
router.post("/updatemarks",(req,res)=>{
    if(req.isAuthenticated()){
        Submission.updateOne({_id:req.body.submissionId}, {marks:req.body.marksToUpdate}, (err, found)=>{
            if(!err){
                console.log("no error")
            if(found){
                res.send('Marks Updated');                
            }else{
                res.send("null");
            }}
            else{console/log(err)}
        });
    }else{
        res.send("null");
    }
});


module.exports = router;