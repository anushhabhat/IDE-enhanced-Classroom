import React, { useEffect, useState } from 'react'
import Dashboard from './pagecomponents/Dashboard';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Link } from "react-router-dom";
import { GetAsubject } from '../../Database';
import IdeInterface from './pagecomponents/IdeInterface';

function IdePage(props) {
    const subjectId = props.match.params.subjectId;
    const [load, setLoad] = useState(false);
    const [teacher,setTeacher] = useState("");
    const [user,setuser] = useState([]);
    
    useEffect(() => {
        GetAsubject({subjectId:subjectId}).then((res)=>{setTeacher(res.teacher);setuser(res.user)}).then(()=>setLoad(true));
    }, []);
    return (
        <div>
        <Dashboard load={load} loadsubject={true} subjectId={subjectId} />
        <div className='subpage'>
            <div className='testbox'>
            {load &&
                <>
                    <IdeInterface />
                </>
            }
            </div>
        </div>
        </div>
    )
}

export default IdePage
