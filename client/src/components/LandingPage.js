import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Link, useHistory } from "react-router-dom";
import { GetUser } from '../Database';

function LandingPage(props) {
    const history = useHistory();
    const [load, setload] = useState(false);
    useEffect(() => {
        GetUser().then((res)=>{
            if(res.usertype!=null){
                window.location = "/home";
            }else{
                setload(true);
            }
        });
    }, []);

    function Selectusertype() {
        return (
            <div className="landingpage">
                <div class='header'> 
                    <h1>WELCOME TO CODEFORGE</h1>
                    <p>Log In the website below:</p>
                </div>
                <div class="logo">
						<img src="logo.png"/>
				</div>
                <Router>
                    <div class='tab'>
                    <Link to="/student/login" className="student" style={{ textDecoration: 'none' }} onClick={() => {
                        props.setUsertype("student");
                        history.push("/student/login")
                    }}>Student</Link>
                    <Link to="/teacher/login" className="teacher" style={{ textDecoration: 'none' }} onClick={() => {
                        props.setUsertype("teacher");
                        history.push("/teacher/login")
                    }}>Teacher</Link>
                    </div>
                </Router>
            </div>

        )
    }

    return (
        load && <Selectusertype />
    )    
}

export default LandingPage