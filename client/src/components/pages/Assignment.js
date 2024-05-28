import './Assignment.css'
import ProblemsList from './pagecomponents/ProblemsList';

import React, { useEffect, useState } from 'react';
import { GetAsubject } from '../../Database';
import Dashboard from './pagecomponents/Dashboard';
import { GetUser } from '../../Database';

//const ProblemsListPage = () => {
const Assignment = (props) => {
    const [load, setLoad] = useState(false);
    const subjectId = props.match.params.subjectId;
    const [subjectInfo, setSubInfo] = useState({});
    const [update,setupdate] = useState(false);
    
    useEffect(()=>{
        GetAsubject({subjectId:subjectId}).then((res)=>{
            if(res!=null||undefined){
                setSubInfo(res);
                setLoad(true);
            }else{
                window.alert("Can't load Subject");
                window.location = "/home";  
            }
        });
    },[update]);
    return (
        <div>
        <Dashboard load={load} loadsubject= {true} subjectId={subjectId} />
        <div className="subpage" style={{margin: '0'}}>
        {load &&
        <>
            <div id="problemsListPage" >
                <ProblemsList subjectId={subjectId} subjectInfo={subjectInfo}/>
            </div>
        </>
        }
        </div>
    </div>
    )
}

//export default ProblemsListPage;
export default Assignment;