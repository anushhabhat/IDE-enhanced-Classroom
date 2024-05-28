import IdeInterface from "./pagecomponents/IdeInterface";
import AssignmentDesc from "./pagecomponents/AssignmentDesc";
//import './AssignmentIDE.css'
import { useParams } from "react-router-dom";
import Split from '@uiw/react-split';
import React, { useState , useEffect} from "react";
import { GetAquestion, GetSubmissionInfo, GetUser , GetUserInfo } from "../../Database";
import Dashboard from "./pagecomponents/Dashboard";
import './TeacherViewQ.css'
import { GetExamples} from "../../Database";
import '../../App.css';
import { UpdateMarks } from "../../Database";


function TeacherViewOneSubmission(props) {
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
    const studentId = props.match.params.studentId;
    const submissionId = props.match.params.submissionId;

    //const [load, setLoad] = useState(false);
    const [questionInfo, setQuesInfo] = useState({});
    //const [update,setupdate] = useState(false);
    const [arrExamples,setArrExamples] = useState([]);

    const [submissionInfo,setSubmissionInfo] = useState({});
    const [studentInfo,setStudentInfo] = useState({});
    const [updatedMarks,setUpdatedMarks] = useState('');

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
        GetSubmissionInfo({submissionId:submissionId}).then((res)=>{
        setSubmissionInfo(res);
        if(res==null || res==undefined)
            {
                alert("Error : Null / Undefined")
                window.location = "/";
            }
    }).then(()=>{
        setLoad(true);
    });
    GetUserInfo({userId:studentId}).then((res)=>{
        setStudentInfo(res);
        if(res==null || res==undefined)
            {
                alert("Error : Null / Undefined")
                window.location = "/";
            }
    }).then(()=>{
        setLoad(true);
    });
        
    },[update]);

    function handleSubmit() {
        const info={
            submissionId:submissionId,
            marksToUpdate:updatedMarks
        };
        UpdateMarks(info).then((res) => { 
            
            window.alert(res);  });
        }

    return (
        <div id="problemPage">
            <Dashboard load={load} loadsubject= {true} subjectId={subjectId} />
            <div className="subpage" style={{marginLeft:0 , marginTop:'60px'}}>
            <Split style={{ height: '100vh', width: '100vw',}} renderBar={({ onMouseDown, ...props }) => {
                return (
                    <div  {...props} onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)} style={{ background: 'transparent', width: "7px",backgroundColor:'red' }} >
                        <div onMouseDown={onMouseDown} style={style} />
                    </div>
                );
            }}>
                {load && <AssignmentDesc questionId={questionId} />}
                {load && //<IdeInterface questionId={questionId} subjectId={subjectId} studentId={studentId}/>
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-12 mt-5">
                            <span className="lead d-block my-0">
                                <pre>Student Name : {studentInfo.name}      Language : {submissionInfo.lang}           <label for='marks'>Marks: </label><input id='marks' type='text' onChange={(e)=>{setUpdatedMarks(e.target.value)}} placeholder={submissionInfo.marks}></input> <button className="btn btn-success" onClick={handleSubmit}>Update Marks</button>
                                </pre>
                            </span>
                             <p className="lead d-block my-0">Submitted code</p>
                             {/*<textarea type="text" id="code" placeholder='Enter Code Here' value={this.state.code} onChange={this.onCodeChangeHandler}>
                             </textarea>*/}
                             <div className='codebox'>
                             <textarea type="text" style={{height:'240px'}} id="code" placeholder='Enter Code Here' value={submissionInfo.code}>
                             </textarea>
                              </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 my-5">
                            <p className="lead d-block my-0">Obtained Result / Output</p>
                             <textarea type="text" id="result" value={submissionInfo.result} disabled={true}>
                             </textarea>
                        </div>
                    </div>
                    <div className="row">
                        <div>
                             <textarea type="text" id="plag" value={'Plagiarism Score : '+submissionInfo.plag} disabled={true}>
                             </textarea>
                        </div>
                    </div>
                </div>
            </>}
            </Split>
            </div>
        </div >
    )
}
export default TeacherViewOneSubmission;





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