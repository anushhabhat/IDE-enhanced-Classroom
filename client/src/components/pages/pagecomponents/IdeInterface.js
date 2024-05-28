import React, { Component } from 'react'
import '../../../App.css';
import axios from 'axios';

import './codeEditor.css'
import CodeMirror from '@uiw/react-codemirror';
//import { useState } from 'react'

import { Addsubmission } from '../../../Database';

export default class IdeInterface extends Component 
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
        subjectId:this.props.subjectId,
        continue_or_not:false
    }
    continue_or_not

   onSubmitHandler = (e) => {
    e.preventDefault()
    this.setState({
        continue_or_not:window.confirm("Continue ?")
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

onSubmitHandler2 = (e) => {
  /*e.preventDefault()
  this.setState({
      continue_or_not:window.confirm("Submit Code ?")
  })
  //continue_or_not=window.confirm("Submit Code ?")
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
      })*/

      this.onSubmitHandler(e);
      Addsubmission(this.state).then((res) => { 
        window.alert(res); 
        //props.setupdate(!props.update); 
      });
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
    preventCopyPaste = (e) => {
      e.preventDefault()
      alert("Copying and pasting is not allowed!")
    }


    render() {
       console.log(this.state)
        return (
            <>
            {/*function App() {
  const [code, setCode] = useState('');
  const [testCaseResults, setTestCaseResults] = useState([]);

  const checkCode = () => {
    axios
      .post('http://localhost:80/python', { code })
      .then(({ data }) => {
        setTestCaseResults(data.testCaseResults);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="absolute top-20 bottom-40 left-20 right-20 text-left">
          <div>Create a function to add two numbers.</div>
          <div className="flex space-x-2">
            {testCaseResults.map((res, i) => {
              return (
                <div key={i}>
                  <div>{res === 'True' ? '✅ passed' : '❌ failed'}</div>
                </div>
              );
            })}
        </div>
          <CodeMirror
            value={code}
            options={{
              theme: 'dracula',
              keyMap: 'sublime',
              mode: 'python',
            }}
            onChange={(editor, data, value) => {
              setCode(editor.getValue());
            }}
            className="w-96 h-80"
          />
          <div
            onClick={() => checkCode()}
            className="border-2 p-2 bg-green-600"
          >
            Submit Code
          </div>
        </div>
      </header>
    </div>
  );
}*/}




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
                             {/*<textarea type="text" id="code" placeholder='Enter Code Here' value={this.state.code} onChange={this.onCodeChangeHandler}>
                             </textarea>*/}
                             <div className='codebox'>
                             <CodeMirror id="code" value={this.state.code}
                                        options={{
                                          theme: 'dracula',
                                          keyMap: 'sublime',
                                          mode: this.state.lang,
                                          lineNumbers: true
                                        }}
                                        placeholder='Start Your Code Here'
                                        onChange={(value) => {
                                          this.setState({
                                            code: value
                                          });}}
                                          /*onCopy={(e) => {preventCopyPaste(e)}}  
                                          onPaste={(e) => {preventCopyPaste(e)}}  
                                        onCut={(e) => {preventCopyPaste(e)}}*/
                                        className="w-96 h-80"
                                        
                                      />
                              </div>
                        </div>
                        <div className="col-12 mt-3">
                            <p className="lead d-block my-0">Provide Input</p>
                             <textarea type="text" id="input" placeholder='Enter Input Here' value={this.state.input} onChange={this.onInputChangeHandler}>
                             </textarea>
                        </div>
                    </div>
                    <div className='buttons'>
                        <button className="btn btn-dark" onClick={this.onSubmitHandler}>Run Code</button>
                        <button className="btn btn-success" onClick={this.onSubmitHandler2}>Submit Code</button>
                    </div><br />
                    <div className="row">
                        <div className="col-12 my-5">
                             <textarea type="text" id="result" value={this.state.result} disabled={true}>
                             </textarea>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
//export default IdeInterface;