import './AssignmentDesc.css'
import { GetAquestion ,GetExamples} from "../../../Database";
import { useState , useEffect } from 'react';



const AssignmentDesc = (props) => {
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
            <div className='tag-container'>
                <div className="tag"  >Maximum Marks : {questionInfo.Qpoints}</div>
                <div className="tag"  >Difficulty Level : {questionInfo.Qlevel}</div>
            </div>
            <br />
            <div className="prob-desc"><p>{questionInfo.Qdescription}</p> </div>
            <br /><br />
            <div className='examples'>
            <div className='example' key='1'>
                <h3>Example 1:</h3>
                <div className='example-container'><p><b>Input: </b>{arrExamples[0]}</p>
                    <p><b>Output: </b>{arrExamples[1]}</p>
                </div>
            </div>
            <br />
            <div className='example' key='2'>
                <h3>Example 2:</h3>
                <div className='example-container'><p><b>Input: </b>{arrExamples[2]}</p>
                    <p><b>Output: </b>{arrExamples[3]}</p>
                </div>
            </div>
            </div>
            
            {/*
                questionInfo.Examples.map((Einput,Eoutput) => {
                        return (
                            <div className='example' >{/*key={questionInfo.Examples.indexOf(example)}>}
                                <h3>Example {/*questionInfo.Examples.indexOf(example) + 1}:</h3>
                                <div className='example-container'><p><b>Input: </b>{Einput}</p>
                                    <p><b>Output: </b>{Eoutput}</p>
                                </div>
    
                            </div>
                        )
                })*/
                /*Examples.forEach(example => {
                    return (
                        <div className='example' >
                            <h3>Example :</h3>
                            <div className='example-container'><p><b>Input: </b>{example}</p>
                                <p><b>Output: </b>{example}</p>
                            </div>
                        </div>
                    )
                })*/
                
            }
        </div>
    )
}

export default AssignmentDesc;