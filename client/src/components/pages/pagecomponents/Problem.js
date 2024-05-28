import { GetAquestion ,GetMarks } from "../../../Database";
import { useHistory } from 'react-router-dom';
import { useState , useEffect } from "react";

const Problem = ({ questionId, bgClass ,subjectId,userInfo}) => {
    const history = useHistory();
    //const questionId = questionId;
    const [load, setLoad] = useState(false);
    const [questionInfo, setQuesInfo] = useState({});
    const [update,setupdate] = useState(false);
    const [submission,setSubmission] = useState({marks:"Unattempted"});

    function setDiffClass(diff){
        let diffclass ="green"
        if (diff === "Hard") diffclass = "red";
        else if (diff === "Medium") diffclass = "yellow";
        else diffclass = "green";
        return diffclass;
    };
    useEffect(()=>{
        GetAquestion({questionId:questionId}).then((res)=>{
            if(res!=null||undefined){
                setQuesInfo(res);
                setLoad(true);
            }else{
                window.alert("Can't load Question");
                window.location = "/home";  
            }
        });       
        GetMarks({questionId:questionId,studentId:userInfo._id}).then((res)=>{
            if(res!=null && res!=undefined){
                setSubmission(res);
                setLoad(true);
            }else{
                setSubmission({marks:'Unattempted'});
            }
        });
    },[update]);
    return (
        <>{load &&
        <div key={questionId} className={`problem-container ${bgClass}`}>
            <div className="title" id="problem-link"><p onClick={()=>{userInfo.usertype==="student" && history.push(`/assignmentIde/${subjectId}/${questionId}`);
        userInfo.usertype==="teacher" && history.push(`/teacherView/${subjectId}/${questionId}`);}}>{questionInfo.Qcode}. {questionInfo.Qname}</p></div>
            {/*<div className="acceptance"><p>{problem.acceptance_rate}</p></div>*/}
            <div className="acceptance"><p>{questionInfo.Qpoints}</p></div>
            <div className="difficulty"> <p className={setDiffClass(questionInfo.Qlevel)} >{questionInfo.Qlevel}</p> </div>
            {userInfo.usertype==="student" && <div className="marks"><p>{submission.marks}</p></div>}
        </div >
    }
        </>
    )
}
export default Problem;