import React, { useState, useMemo, useEffect } from "react";
import "./SubmissionList.css";
import Problem from "./Problem";
import Pagination from "./pagination";
import { GetUser ,ViewAllSubmission } from "../../../Database";
import SubmissionTile from "./SubmissionTile"

const SubmissionList = (props) => {

  //const problems=props.subjectInfo.assignments;
  //here taking list of students as problems
  const [load, setLoad] = useState(false);
    const [update,setupdate] = useState(false);
  const [users, setUsers] = useState([]);
  useEffect(()=>{
    setLoad(false);
    ViewAllSubmission({questionId:props.questionId}).then((res)=>{
            if(res==null || res==undefined){
                alert("Undefined")
                window.location = "/";
            }
        setUsers(res);
    }).then(()=>{
        setLoad(true);
    }); 
},[update]);

  const currentTableData = useMemo(() => {
    return users;
  }, []);


  return (
    <div id="problems" >
      <div className="problems-header">
        <div className="number">
          <p>No.</p>
        </div>
        <div className="studentname">
          {/*<p>Acceptance</p>*/}
          <p>Student Name</p>
        </div>
        <div className="difficulty">
          <p>Marks</p>
        </div>
      </div>

      {
        users.map(element => {
        const index=users.indexOf(element);
        const isEven = index % 2 === 0;
        const bgClass = isEven ? "even" : "odd";
        return (<>
          <SubmissionTile
            questionId={props.questionId}
            index = {index+1}
            key={element._id}
            bgClass={bgClass}
            submission={element}
            subjectId={props.subjectId}
          />
          </>
        );
      })
    }
    </div>
  );
};

export default SubmissionList;
