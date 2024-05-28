import IdeInterface from "./pagecomponents/IdeInterface";
import AssignmentDesc from "./pagecomponents/AssignmentDesc";
//import './AssignmentIDE.css'
import { useParams } from "react-router-dom";
import Split from '@uiw/react-split';
import React, { useState , useEffect} from "react";
import { GetAquestion, GetUser } from "../../Database";
import Dashboard from "./pagecomponents/Dashboard";
//import './TeacherView.css'
import { GetExamples} from "../../Database";
import SubmissionList from "./pagecomponents/SubmissionList";


function TeacherView(props) {
    //const problem = GetAquestion(Qid)
    const [isHovered, setIsHovered] = useState(false);


    const defaultStyle = {
        backgroundColor: "#1d1d1d",

    };

    const hoverStyle = {
        backgroundColor: '#1b7fcb',
    };
    const style = isHovered ? { ...defaultStyle, ...hoverStyle } : defaultStyle;

    const [load, setLoad] = useState(false);
    const [update,setupdate] = useState(false);
    const [userInfo, setUserInfo] = useState({
        usertype:"null"
    });


    const subjectId = props.match.params.subjectId;
    const questionId = props.match.params.questionId;
    //const [load, setLoad] = useState(false);
    const [questionInfo, setQuesInfo] = useState({});
    //const [update,setupdate] = useState(false);
    const [arrExamples,setArrExamples] = useState([]);

    useEffect(()=>{
        const urlSearchString = window.location.search;
        const params = new URLSearchParams(urlSearchString);
        setLoad(false);
            GetUser().then((res)=>{
                if(res.usertype==null){
                    window.location = "/";
                }
            setUserInfo(res);
        }).then(()=>{
            setLoad(true);
        });
        
    },[update]);

    return (
        <div>
            <Dashboard load={load} loadsubject= {true} subjectId={subjectId} />
            <div className="subpage" style={{margin: '0'}}>
            {load &&
            <>
                <div><p>Submitted Assignment For This Question</p></div>
                <div id="problemsListPage">
                    {load && <SubmissionList questionId={questionId } subjectId={subjectId} />}
                </div>
            </>
            }
            </div>
        </div >
    )
}
export default TeacherView;





/*
const TeacherView = (props) => {
    const questionId = props.questionId;
    const [load, setLoad] = useState(false);
    const [questionInfo, setQuesInfo] = useState({});
    const [update,setupdate] = useState(false);
    const [arrExamples,setArrExamples] = useState([]);
    
    useEffect(()=>{
        GetAquestion({questionId:questionId}).then((res)=>{
            if(res!=null||undefined){
                setQuesInfo(res);
                setLoad(true);
            }else{
                window.alert("Can't load Question "+questionId);
                window.location = "/home";  
            }
        });
        GetExamples({questionId:questionId}).then((res)=>{
            if(res!=null||undefined){
                setArrExamples(res);
                setLoad(true);
            }else{
                window.alert("Can't load Examples "+questionId);
                window.location = "/home";  
            }
        });

    },[update]);
    function example_tiles(){
        arrExamples.forEach(example => {
            return (
                <div className='example' >
                    <h3>Example :</h3>
                    <div className='example-container'><p><b>Input: </b>{example}</p>
                        <p><b>Output: </b>{example}</p>
                    </div>
                </div>
            )
        })
    }


    //AssignmentDesc ot problemPanel
    return (
        <div id='problem-panel'>
            <div className="prob-title"><h2>{questionInfo.Qcode}: {questionInfo.Qname}</h2></div>
            <br />
            <div className="prob-desc"><p>{questionInfo.Qdescription}</p> </div>
            <br /><br />
            <div>
            <div className='example' key='1'>
                <h3>Example 1:</h3>
                <div className='example-container'><p><b>Input: </b>{arrExamples[0]}</p>
                    <p><b>Output: </b>{arrExamples[1]}</p>
                </div>
            </div>
            <div className='example' key='2'>
                <h3>Example 2:</h3>
                <div className='example-container'><p><b>Input: </b>{arrExamples[2]}</p>
                    <p><b>Output: </b>{arrExamples[3]}</p>
                </div>
            </div>
            </div>
        </div>
    )
}

export default TeacherView;
*/