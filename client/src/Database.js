
import axios from "axios";
import { Redirect } from "react-router";

//User API's
export async function GetUser(){
    let response=null;
    await axios.get("/api/user/getuser").then((res)=>{response=res});
    return response.data;
}

export async function Googleauth(){
    return     
}
export async function GetUserInfo(userId){
    let response = null;
    await axios({
        method:"post",
        url:"/api/user/getuserinfo",
        data:userId
    }).then((res)=>{response=res.data});
    return response;
}

export async function Loginuser(props) {
    let response = null;
    await axios({
        method: "post",
        url: "/api/user/login",
        data: props
      }).then((res)=>{response=res.data});
    return response;
}

export async function Registeruser(props){
    const response =   await axios({
        method:"post",
        url:"/api/user/register",
        data: props
    });
    return response.data;
}

export async function Logout(){
    let response = null;
    await axios.get("/api/user/logout").then((res)=>{
        response = res.data;
    });
    return response;
}


//Subjects API's

export async function Addsubject(subject) {
    let response = null;
    await axios({
        method:"post",
        url:"/api/subject/addSubject",
        data:subject
    }).then((res)=>{response=res.data});
    return response;
}

export async function GetAsubject(subject) {
    let response =  null;
    await axios({
        method:"post",
        url:"/api/subject/getasubject",
        data:subject
    }).then((res)=>{response = res.data});

    return response;
}

export async function Addpost(props){
    let response = null;
    await axios({
        method:"post",
        url:"/api/subject/addpost",
        data:{
            subjectId:props.subjectId,
            description:props.description
        }
   }).then((res)=>{response = res.data});
    return response;
}

export async function JoinSubject(user){
    let response="null";
    await axios({
        method:"post",
        url:"/api/subject/joinsubject",
        data:{user}
    }).then((res)=>{response = res.data});
    return response;

}

//Questions API
export async function Addquestion(question) {
    let response = null;
    await axios({
        method:"post",
        url:"/api/question/addQuestion",
        data:question
    }).then((res)=>{response=res.data});
    return response;
}

export async function GetAquestion(questionId) {
    let response =  null;
    await axios({
        method:"post",
        url:"/api/question/getaquestion",
        data:questionId
    }).then((res)=>{response = res.data});

    return response;
}
export async function GetExamples(questionId) {
    let response =  null;
    await axios({
        method:"post",
        url:"/api/question/getexamples",
        data:questionId
    }).then((res)=>{response = res.data});

    return response;
}


/** submissions */
export async function Addsubmission(information) {
    let response = null;
    await axios({
        method:"post",
        url:"/api/submission/addSubmission",
        data:information
    }).then((res)=>{response=res.data});
    return response;
}
export async function ViewAllSubmission(information) {
    let response = null;
    await axios({
        method:"post",
        url:"/api/submission/viewAllSubmission",
        data:information
    }).then((res)=>{response=res.data});
    return response;
}
export async function GetSubmissionInfo(submissionId) {
    let response =  null;
    await axios({
        method:"post",
        url:"/api/submission/getsubmissioninfo",
        data:submissionId
    }).then((res)=>{response = res.data});

    return response;
}
export async function UpdateMarks(info) {
    let response =  null;
    await axios({
        method:"post",
        url:"/api/submission/updatemarks",
        data:info
    }).then((res)=>{response = res.data});

    return response;
}
export async function GetMarks(info) {
    let response =  null;
    await axios({
        method:"post",
        url:"/api/submission/getmarks",
        data:info
    }).then((res)=>{response = res.data});

    return response;
}