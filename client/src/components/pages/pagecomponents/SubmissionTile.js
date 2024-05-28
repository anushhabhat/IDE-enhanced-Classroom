import { GetAquestion } from "../../../Database";
import { useHistory } from 'react-router-dom';
import { useState , useEffect } from "react";
import { GetUserInfo } from "../../../Database";

const SubmissionTile = ({ questionId,index, bgClass ,submission,subjectId}) => {
    const history = useHistory();
    //const questionId = questionId;
    const [load, setLoad] = useState(false);
    const [questionInfo, setQuesInfo] = useState({});
    const [update,setupdate] = useState(false);
    const [studenttInfo, setStudentInfo] = useState({});

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
        GetUserInfo({userId:submission.userId}).then((res)=>{
            if(res!=null||undefined){
                setStudentInfo(res);
                setLoad(true);
            }else{
                window.alert("Can't load User");
                window.location = "/home";  
            }
        });
        
    },[update]);
    return (
        <>{load &&
        <div key={questionId} className={`problem-container ${bgClass}`}>
            <div className="number" id="problem-link"><p >{index}</p></div>
            {/*<div className="acceptance"><p>{problem.acceptance_rate}</p></div>*/}
            <div className="studentname"><p onClick={()=>{history.push(`/teacherViewSubmission/${subjectId}/${questionId}/${submission.userId}/${submission._id}`);}}>{studenttInfo.name}</p></div>
            <div className="difficulty"> <p className={'green'} >{submission.marks}</p> </div>
        </div >
    }
        </>
    )
}
export default SubmissionTile;