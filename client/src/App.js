import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import LandingPage from "./components/LandingPage";

import Login from "./components/Login";
import Register from "./components/Register";
import PageNotFound from "./components/PageNotFound";

// import Logged from "./components/Logged";
import SubjectPage from "./components/pages/SubjectPage";
import Homepage from "./components/pages/Homepage";
// import TestPage from "./components/pages/TestPage";
import People from "./components/pages/People";
import IdePage from "./components/pages/IdePage";
import Assignment from "./components/pages/Assignment";
import AssignmentIDE from "./components/pages/AssignmentIDE";
import TeacherView from "./components/pages/TeacherView";
import TeacherViewOneSubmission from "./components/pages/TeacherViewQ";

function App() {
  const [usertype, setUsertype] = useState("");
  
  
  return (
    <Router>
      <Switch>
        <Route exact path="/"><LandingPage setUsertype={setUsertype} /></Route>
        <Route path={"/" + usertype + "/login"}><Login usertype={usertype} /></Route>
        <Route path={"/" + usertype + "/register"}><Register usertype={usertype} /></Route>
        {/* <Route path="/logged"><Logged /></Route>  This route is under construction */}

        <Route path="/home"><Homepage /></Route>
        <Route path="/subject/:subjectId" component={SubjectPage}></Route>
        <Route path="/people/:subjectId" component={People}></Route>
        <Route path="/ide/:subjectId" component={IdePage}></Route>
        <Route path="/assignment/:subjectId" component={Assignment}></Route>
        <Route path="/assignmentIde/:subjectId/:questionId" component={AssignmentIDE}></Route>
        <Route path="/teacherView/:subjectId/:questionId" component={TeacherView}></Route>
        <Route path="/teacherViewSubmission/:subjectId/:questionId/:studentId/:submissionId" component={TeacherViewOneSubmission}></Route>
        {/* <Route path="/tests"><TestPage /></Route> */}
        
        <Route path="/:random" component={PageNotFound} />
      </Switch>
    </Router>

  );
}

export default App;
