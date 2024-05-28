const mongoose = require("mongoose");
const passportlocalmongoose = require("passport-local-mongoose");
var findOrCreate = require('mongoose-findorcreate')
const userSchema = new mongoose.Schema({
    //id,Questions =[{qid:string,plag:string,lang:string}]
    name:String,
    email: String,
    password: String,
    googleId: String,
    usertype:String,
    subjects:[{
        id:String,
        name:String,
        code:String,
        teacher:String
    }],//initially we store all questions in to do list
        //then when a question is submitted we remove from todo and add to completed
    completed_assignments:[]
});



userSchema.plugin(passportlocalmongoose);
userSchema.plugin(findOrCreate);

const UserModel = new mongoose.model("user",userSchema);

module.exports = UserModel;