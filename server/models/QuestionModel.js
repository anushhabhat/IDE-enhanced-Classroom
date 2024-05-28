const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    Qname:String,
    Qdescription:String,
    Qcode:String,
    Qpoints:String,
    Qsolution:[
        {
            Q_output:String,
            Q_lang:String
        }
    ],
    Qclass:String,//storing subject _id instead of instance
    Qlevel:String,
    Qans:String,
    Quser:[{}],
    Examples:[
        {
            Einput:String,
            Eoutput:String
        }
    ]
});

const Question = mongoose.model("question",questionSchema);

module.exports = Question;