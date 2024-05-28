import React, { Component } from 'react'
import '../../../App.css';
import axios from 'axios';

import './codeEditor.css'

export default class IdeInterface extends Component 
//function IdeInterface()
{
    state = {
        code: "",
        result: "Submit Code to See Result",
        lang: 'c++',
        plag: "Plagiarism Value",
        //sId: "student1",
        sId: this.props.studentId,//studentId
        //qId: "question1",
        qId: this.props.questionId,
        continue_or_not:false
    }

    continue_or_not
   onSubmitHandler = (e) => {
    e.preventDefault()
    this.setState({
        continue_or_not:window.confirm("Submit Code ?")
    })
    //continue_or_not=window.confirm("Submit Code ?")
    /*if(!this.continue_or_not)
    {return false}*/
    axios.post("http://localhost:5000/code/submit",this.state)
        .then(res=>{
            console.log(res.data)
            const data = res.data
            if(data.err){
                // Error in user code
                this.setState({
                    result: data.error,
                    plag: data.plag
                })
            }
            else{
                this.setState({
                    result: data.output,
                    plag: data.plag
                })
            }
        })
        .catch(err=>{
            //console.log(err)
            if (err.response) {
                console.log('Server responded with status code:', err.response.status);
                console.log('Response data:', err.response.data);
              } else if (err.request) {
                console.log('No response received:', err.request);
              } else {
                console.log('Error creating request:', err.message);
              }
        })
}


    onCodeChangeHandler = (e) => {
        this.setState({
            code: e.target.value
        })
    }
    onInputChangeHandler = (e) => {
        this.setState({
            input: e.target.value
        })
    }

    /*call= ()=>{
        const [load, setLoad] = useState(false);
    const [update,setupdate] = useState(false);
    const [userInfo, setUserInfo] = useState({
        usertype:"null"
    });
    const [userSubjects,setsubjects] = useState([{}]);

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
        this.setState({
            sId: userInfo._id,
            qId: this.props.questionId
        })
        
    },[update]);
    }*/

    render() {
       console.log(this.state)
        return (
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-12 mt-5">
                        <span title='Select Language'>
                        <select id="lang" onChange={(e) => this.setState({ lang: e.target.value })}>
                            <option value="c++">C++</option>
                            <option value="c">C</option>
                            <option value="python">Python</option>
                        </select>
                        </span>
                             <p className="lead d-block my-0">Code your code here</p>
                             <textarea type="text" id="code" placeholder='Enter Code Here' value={this.state.code} onChange={this.onCodeChangeHandler}>
                             </textarea>
                        </div>
                        <div className="col-12 mt-3">
                            <p className="lead d-block my-0">Provide Input</p>
                             <textarea type="text" id="input" placeholder='Enter Input Here' value={this.state.input} onChange={this.onInputChangeHandler}>
                             </textarea>
                        </div>
                    </div>
                        <button className="btn btn-success" onClick={this.onSubmitHandler}>Submit Code</button>
                   
                    <div className="row">
                        <div className="col-12 my-5">
                             <textarea type="text" id="result" value={this.state.result} disabled={true}>
                             </textarea>
                        </div>
                    </div>
                    <div className="row">
                        <div>
                             <textarea type="text" id="plag" value={this.state.plag} disabled={true}>
                             </textarea>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
//export default IdeInterface;