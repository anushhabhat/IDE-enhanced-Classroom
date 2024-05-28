const express = require("express");
const router  = express.Router();
const passport = require("../passport");
router.use(express.urlencoded({ extended: true }));

const User = require("../models/Usermodel");
const Subject = require("../models/SubjectModel");
const Question = require("../models/QuestionModel");
const fs = require('fs');
const saveFile = (name, data) => {
    return new Promise((resolve, reject) => {
      fs.writeFile(name,data, function(err) {
          if(err) {
              console.log(err);
              reject()
          } else {
              console.log("The file was saved!");
              resolve()
          }
      }); 
    })
    }


function AddQuestion(question,user,res){
    const new_question = Question({
        Qname:question.Qname,
        Qdescription:question.Qdescription,
        Qcode:question.Qcode,
        Qclass:question.Qclass,
        Qlevel: question.Qlevel,
        Qpoints: question.Qpoints,
        Qans: question.Qans,
        Qsolution: question.Qsolution,
        Examples: question.Examples
    });
    new_question.save();
    console.log("ola");
    User.findOne({_id:user._id}, (err, found)=>{
        console.log("USER:"+user+"&&")
        console.log("Question name:"+question.Qname+"&&")
        console.log("hey!!!!!!!!!!!!!!")
        console.log("SUBJECT:"+question.Qclass+"&&")
        if(!err){
            //if(user.subjects.includes(subject))
            //{
                Subject.findOne({_id:new_question.Qclass},(err2, found2)=>{
                    if(!err2){
                        found2.assignments.push(new_question._id);
                        found2.save((err2, result)=>{
                            if(err2) 
                            {
                                console.log("Error in finding subject [new]")
                                console.log(err2);
                            }
                            
                            new_question.Qsolution.forEach(element => {
                                fName = "./class_assignments/solutions/"+new_question._id+"_soln_"+element.Q_lang;
                                if(element.Q_lang=='c++')
                                {fName=fName+".cpp";}
                                else if(element.Q_lang=='c')
                                {fName=fName+".c";}
                                else if(element.Q_lang=='python')
                                {fName=fName+".py";}
                                else
                                {fname=null;}
                                const fileName=fName;
                                saveFile(fileName,element.Q_output);
                            });
                            
                            res.send("Question Added succesfully");
                        });
                    }
                })
            found.save((err, result)=>{
                if(err) console.log(err);
            });
        }
        else{
            console.log("Error in the function")
        }
    });



}

router.post("/addQuestion",
(req, res)=>{
    if(req.user.usertype=="teacher"){
        AddQuestion(req.body,req.user,res)
    }else{
        res.send("Cannot add Question");
    }
});

router.post("/getaquestion",(req,res)=>{
    if(req.isAuthenticated()){
        Question.findOne({_id:req.body.questionId}, (err, found)=>{
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
router.post("/getexamples",(req,res)=>{
    if(req.isAuthenticated()){
        Question.findOne({_id:req.body.questionId}, (err, found)=>{
            if(found){
                let arr=[];
                found.Examples.forEach(example=>{
                    arr.push(example.Einput);
                    arr.push(example.Eoutput)
                })
                res.send(arr);         
            }else{
                res.send("null");
            }
        });
    }else{
        res.send("null");
    }
});

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

    const info_completed_assignments={
        classId:information.subjectId,
        quesId:information.qId,
        lang:information.lang,
        //submitTime:information.submitTime,
        //time_complete:information.time_complete,
        //time_out:information.time_out,
        result:information.result,
        marks:'Not Evaluated'
        }

    /*const subjectId = req.body.subjectId;
    const description = req.body.description;
    const author = req.user.name;*/
    
        /*perfect save
        User.findOne({_id:user._id}, (err, found)=>{
            if(!err){
                found.completed_assignments.push(info_completed_assignments);;
                found.save((err, result)=>{
                    res.send("updated succesfully");
                })
                
            }else{
                res.send("null");
            }
        });*/

        /*perfect filter
        const filtered=User.findOne({},{}).where('_id').equals(user._id);
        filtered.findOne({}, (err, found)=>{
        
            if(!err){
                found.completed_assignments.push(info_completed_assignments);;
                found.save((err, result)=>{
                    res.send("updated succesfully");
                })
                
            }else{
                res.send("null");
            }
        })*/

        const filtered=User.findOne({},{}).where('_id').equals(user._id)
        /*.where('completed_assignments.classId').equals(info_completed_assignments.classId).
        where('completed_assignments.quesId').equals(info_completed_assignments.quesId)*/
        filtered.findOne({}, (err, found)=>{
            if(!err){
                found.completed_assignments.push(info_completed_assignments);;
                found.save((err, result)=>{
                    res.send("Submitted Succesfully");
                })
                
            }else{
                res.send("null");
            }
        })

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



module.exports = router;


/////////////////////////////////////////////////////////
function ViewAllSubmission(information,user,res){
    /*information format
    subject
    question

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

    const info_completed_assignments={
        classId:information.subjectId,
        quesId:information.qId,
        lang:information.lang,
        //submitTime:information.submitTime,
        //time_complete:information.time_complete,
        //time_out:information.time_out,
        result:information.result,
        marks:'Not Evaluated'
        }

    /*const subjectId = req.body.subjectId;
    const description = req.body.description;
    const author = req.user.name;*/
    
        /*perfect save
        User.findOne({_id:user._id}, (err, found)=>{
            if(!err){
                found.completed_assignments.push(info_completed_assignments);;
                found.save((err, result)=>{
                    res.send("updated succesfully");
                })
                
            }else{
                res.send("null");
            }
        });*/

        /*perfect filter
        const filtered=User.findOne({},{}).where('_id').equals(user._id);
        filtered.findOne({}, (err, found)=>{
        
            if(!err){
                found.completed_assignments.push(info_completed_assignments);;
                found.save((err, result)=>{
                    res.send("updated succesfully");
                })
                
            }else{
                res.send("null");
            }
        })*/

        const filtered=User.findOne({},{}).where('_id').equals(user._id)
        /*.where('completed_assignments.classId').equals(info_completed_assignments.classId).
        where('completed_assignments.quesId').equals(info_completed_assignments.quesId)*/
        filtered.findOne({}, (err, found)=>{
            if(!err){
                found.completed_assignments.push(info_completed_assignments);;
                found.save((err, result)=>{
                    res.send("Submitted Succesfully");
                })
                
            }else{
                res.send("null");
            }
        })

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
