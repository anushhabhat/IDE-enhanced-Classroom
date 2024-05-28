const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
        userId:String,
        classId:String,
        quesId:String,//Qid,classid already with question
        /*submission_details:[{
            lang:String,
            plag:String,
            //submitTime:String,//submitted at what time
            //time_complete:String,//how much time to submit assignment
            //time_out:String,//how much time outside window : (in / out)
            result:String,//output of submitted code
            marks:String//later by teacher
            }],//add lang that is attempted & delete prev if already exist
        }*/
        lang:String,
        plag:String,
        //submitTime:String,//submitted at what time
        //time_complete:String,//how much time to submit assignment
        //time_out:String,//how much time outside window : (in / out)
        code:String,
        result:String,//output of submitted code
        marks:String//later by teacher
})
const Submission = mongoose.model("submission",submissionSchema);

module.exports = Submission;