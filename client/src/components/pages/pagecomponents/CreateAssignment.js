import React, { useEffect,useState } from 'react';
import { Button, Col, FloatingLabel, Form, Modal, Row } from 'react-bootstrap';
import AddIcon from '@material-ui/icons/Add';
import { Addquestion } from '../../../Database';


function CreateAssignment(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const ButtonStyle = {
        width: "55px",
        height: "55px",
        backgroundColor: "#D9534F",
        color: "white",
        cursor: "pointer",
        padding: "10px",
        position: 'fixed',
        float: 'right',
        right: '5%',
        bottom: "5%",
        fontSize: "200%",
        borderRadius: "50%"
    }
    
    function QuestionModal() {
        const [Qname, setQname] = useState("");
        const [Qcode, setQcode] = useState("");
        const [Qpoints, setQpoints] = useState("");
        const [Qdescription, setQDesc] = useState("");
        const [cdescription, setcDesc] = useState("");
        const [cppdescription, setcppDesc] = useState("");
        const [pydescription, setpyDesc] = useState("");
        const [Qlevel, setQlevel] = useState("");
        const [Qans, setAns] = useState("");
        const [EI1, setEI1] = useState("");
        const [EO1, setEO1] = useState("");
        const [EI2, setEI2] = useState("");
        const [EO2, setEO2] = useState("");
        
        function handleSubmit() {
            Addquestion({
                Qname: Qname,
                Qdescription: Qdescription,
                Qcode: Qcode,
                Qclass: props.subjectId,
                Qlevel: Qlevel,
                Qpoints: Qpoints,
                //Qans:Qans,
                Qsolution: [
                    {
                        Q_output:cppdescription,
                        Q_lang:"c++"
                    },
                    {
                        Q_output:cdescription,
                        Q_lang:"c"
                    },
                    {
                        Q_output:pydescription,
                        Q_lang:"python"
                    }
                ],
                Examples: [
                    {
                        Einput:EI1,
                        Eoutput:EO1
                    },
                    {
                        Einput:EI2,
                        Eoutput:EO2
                    }
                ]
            }).then((res) => { 
                
                window.alert(res); 
                props.setupdate(!props.update); });
            handleClose();
        }

        
        return (
            <>
            {/*load={load} loadsubject= {true} subjectId={subjectId}*/}
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{props.shareSubject.name} : Add a Question</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <>
                    {/*<div>name{Qsubject.name}ends</div>*/}
                <Row className="g-2">
                    <Col md>
                        <FloatingLabel controlId="floatingInputGrid1" label="Question">
                            <Form.Control type="text" placeholder="Question title"  value={Qname} onChange={(e)=>{setQname(e.target.value)}} key="1"/>
                        </FloatingLabel>
                    </Col>
                    <Col md>
                        <FloatingLabel controlId="floatingInputGrid2" label="Question Code">
                            <Form.Control type="text" placeholder="QS1234" value={Qcode} onChange={(e)=>{setQcode(e.target.value)}} key="2"  />
                        </FloatingLabel>
                    </Col>
                </Row>
                <Row className="g-2 mt-2">
                    <Col md>
                        <FloatingLabel controlId="floatingInputGrid3" label="Question Level">
                            <Form.Control type="text" placeholder="Easy / Medium / Hard"  value={Qlevel} onChange={(e)=>{setQlevel(e.target.value)}} key="3"/>
                        </FloatingLabel>
                    </Col>
                    <Col md>
                        <FloatingLabel controlId="floatingInputGrid4" label="Question Points">
                            <Form.Control type="text" placeholder="100" value={Qpoints} onChange={(e)=>{setQpoints(e.target.value)}} key="4"  />
                        </FloatingLabel>
                    </Col>
                </Row>
                <Row className="g-2 mt-3">
                    <Col md>
                        <FloatingLabel controlId="floatingInputGrid5" >{/*label="Description">*/}
                            {/*<Form.Control type="text" placeholder="Description" value={Qdescription} onChange={(e)=>{setQDesc(e.target.value)}} key="5" />*/}
                            <textarea type="text" placeholder='Description' value={Qdescription} onChange={(e)=>{setQDesc(e.target.value)}} rows='5' cols='60' key="5">
                        </textarea><br/>
                        </FloatingLabel>
                    </Col>
                </Row>
                {/*<Row className="g-2 mt-4">
                    <Col md>
                        <FloatingLabel controlId="floatingInputGrid6" label="Answer">
                            <Form.Control type='text' placeholder="Output" value={Qans} onChange={(e)=>{setAns(e.target.value)}} key="6" />
                        </FloatingLabel>
                    </Col>
        </Row>*/}
                <Row className="g-2 mt-4-1">
                    <Col md>
                        <FloatingLabel controlId="floatingInputGrid6-1" label="Example 1 :  Input">
                            <Form.Control type='text' placeholder="Input" value={EI1} onChange={(e)=>{setEI1(e.target.value)}} key="6-1" />
                        </FloatingLabel>
                    </Col>
                </Row>
                <Row className="g-2 mt-4-1">
                    <Col md>
                        <FloatingLabel controlId="floatingInputGrid6-1" label="Example 1 :  Output">
                            <Form.Control type='text' placeholder="Output" value={EO1} onChange={(e)=>{setEO1(e.target.value)}} key="6-2" />
                        </FloatingLabel>
                    </Col>
                </Row>
                <Row className="g-2 mt-4-2">
                    <Col md>
                        <FloatingLabel controlId="floatingInputGrid6-2" label="Example 2 :  Input">
                            <Form.Control type='text' placeholder="Input" value={EI2} onChange={(e)=>{setEI2(e.target.value)}} key="6-3" />
                        </FloatingLabel>
                    </Col>
                </Row>
                <Row className="g-2 mt-4-2">
                    <Col md>
                        <FloatingLabel controlId="floatingInputGrid6-2" label="Example 2 :  Output">
                            <Form.Control type='text' placeholder="Output" value={EO2} onChange={(e)=>{setEO2(e.target.value)}} key="6-4" />
                        </FloatingLabel>
                    </Col>
                </Row>
                <Row className="g-2 mt-5">
                    <Col md>
                        <FloatingLabel controlId="floatingInputGrid7" >{/*label="C++ Solution">*/}
                        {/*<Form.Control type='text' placeholder="Output" value={cppdescription} onChange={(e)=>{setcppDesc(e.target.value)}} key="7" />*/}
                        <textarea type="text" placeholder='C++ Solution' value={cppdescription} onChange={(e)=>{setcppDesc(e.target.value)}} rows='5' cols='60' key="7">
                        </textarea><br/>
                        </FloatingLabel>
                    </Col>
                </Row>
                <Row className="g-2 mt-6">
                    <Col md>
                        <FloatingLabel controlId="floatingInputGrid8" >{/*label="C Solution">*/}
                            {/*<Form.Control type="text" placeholder="C" value={cdescription} onChange={(e)=>{setcDesc(e.target.value)}} key="8" />*/}
                            <textarea type="text" placeholder='C Solution' value={cdescription} onChange={(e)=>{setcDesc(e.target.value)}} rows='5' cols='60' key="8">
                        </textarea><br/>
                        </FloatingLabel>
                    </Col>
                </Row>
                <Row className="g-2 mt-7">
                    <Col md>
                        <FloatingLabel controlId="floatingInputGrid9" >{/*label="Python Solution">*/}
                            {/*<Form.Control type="text" placeholder="Python" value={pydescription} onChange={(e)=>{setpyDesc(e.target.value)}} key="9" />*/}
                            <textarea type="text" placeholder='Python Solution' value={pydescription} onChange={(e)=>{setpyDesc(e.target.value)}} rows='5' cols='60' key="9">
                        </textarea>
                        </FloatingLabel>
                    </Col>
                </Row>
            </>


                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={()=>{handleSubmit()}}>
                            Submit
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }

    return (
        <div>
            <span title='Add Question'>
            <AddIcon style={ButtonStyle} onClick={handleShow} />
            </span>
            <QuestionModal />
        </div>
    )
}
export default CreateAssignment;
