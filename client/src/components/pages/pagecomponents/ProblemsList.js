import React, { useState, useMemo, useEffect } from "react";



//import problems from "../../data.json";
import "./ProblemsList.css";
import Problem from "./Problem";
import Pagination from "./pagination";
import { GetUser } from "../../../Database";

const Problems = (props) => {

  const problems=props.subjectInfo.assignments;
  // const PageSize = 10;
  

  const [PageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return problems.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, PageSize]);

  const [load, setLoad] = useState(false);
    const [update,setupdate] = useState(false);
    const [userInfo, setUserInfo] = useState({
        usertype:"null"
    });
    useEffect(()=>{
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

  function handlePageSizeChange(event) {
    const newPageSize = parseInt(event.target.value);
    const newPageCount = Math.ceil(problems.length / newPageSize);
    const newCurrentPage = Math.min(currentPage, newPageCount); // make sure current page is within the new page count
    setPageSize(newPageSize);
    setCurrentPage(newCurrentPage);
  }

  return (
    <div id="problems" >
      <div className="problems-header">
        <div className="title">
          <p>Title</p>
        </div>
        <div className="acceptance">
          {/*<p>Acceptance</p>*/}
          <p>Max Marks</p>
        </div>
        <div className="difficulty">
          <p>Difficulty</p>
        </div>
        {userInfo.usertype==="student" &&
        <div className="marks">
          <p>Marks Obtained</p>
        </div>}
      </div>

      {currentTableData.map((problem, index) => {
        const isEven = index % 2 === 0;
        const bgClass = isEven ? "even" : "odd";
        return (<>
          <Problem
            questionId={problem}
            key={problem}
            bgClass={bgClass}
            subjectId={props.subjectId}
            userInfo={userInfo}
          />
          </>
        );
      })}
      <div className="pagination-box">
        <div className="pagination-limit">
          <select
            name="pageSize"
            id="pageSize"
            value={PageSize}
            onChange={handlePageSizeChange}
          >
            <option value={5}>5 / page</option>
            <option defaultValue value={10}>
              10 / page
            </option>
            <option value={20}>20 / page</option>
          </select>
        </div>
        <div className="pagination-buttons">
          <Pagination
            className="pagination-bar"
            currentPage={currentPage}
            totalCount={problems.length}
            pageSize={PageSize}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </div>
  );
};

export default Problems;
