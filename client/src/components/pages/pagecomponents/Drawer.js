import React, { useEffect, useState } from 'react';
import { GetUser } from '../../../Database';

// import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';
import { Link ,useHistory } from 'react-router-dom';

export default function LeftDrawer(props) {
    const [load, setLoad] = useState(false);
    const [update,setupdate] = useState(false);
    const [userInfo, setUserInfo] = useState({
        usertype:"null"
    });
    const [userSubjects,setsubjects] = useState([{}]);
    const [openDrawer, setDrawer] = useState(true);

    useEffect(()=>{
        setLoad(false);
            GetUser().then((res)=>{
                if(res.usertype==null){
                    window.location = "/";
                }
            setUserInfo(res);
            setsubjects(res.subjects);
        }).then(()=>{
            setLoad(true);
        });
        
    },[update]);
    const history = useHistory();
    function Leftlist() {
        return (
        <div
            style={{ width: "250px", height: "500px" }}
            role="presentation"
        >
            <List>
            </List>
            <List>
            </List>
            <Divider />
            <List>
                {load &&  <div>
                    {userSubjects.map((subject)=>{
                        return (<>
                            {/*<SubjectCard name={subject.name} teacher={subject.teacher} code={subject.code} id={subject._id}/>*/}
                            <ListItem button onClick={()=>{
                                        history.push(`/subject/${subject._id}`);
                                        setDrawer(false);
                                        window.location.reload();
                                    }}
                                    key={subject._id}> 
                                <pre>
                                    <h5><strong>{subject.name}</strong></h5>
                                    Code : {subject.code}
                                </pre>
                            </ListItem>
                        </>
                        )
                    })}
                </div>}
            </List>
        </div>
        )
    }

    return (
        <>
        {openDrawer &&
        <div>
            <Drawer anchor={'left'} open={true} onClose={() => {props.setDrawer(false)}}>
            <Link to="/home"><div className='dashlogo'><h3 className='dashlogo'>Classroom</h3></div></Link>
                <Leftlist />
            </Drawer>
        </div>
        }
        </>
    );
}
