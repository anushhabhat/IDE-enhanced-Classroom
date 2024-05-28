import IdeInterface from "./pagecomponents/IdeInterface";
import AssignmentDesc from "./pagecomponents/AssignmentDesc";
import './AssignmentIDE.css'
import { useParams } from "react-router-dom";
import Split from '@uiw/react-split';
import React, { useState , useEffect} from "react";
import { GetAquestion, GetUser } from "../../Database";
import Dashboard from "./pagecomponents/Dashboard";



function AssignmentIDE(props) {
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
                {load && <IdeInterface questionId={questionId} subjectId={subjectId} studentId={userInfo._id}/>}
            </Split>
            </div>
        </div >
    )
}
export default AssignmentIDE;
