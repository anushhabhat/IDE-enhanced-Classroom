const express = require('express')

const bodyParser = require('body-parser')
/**/
const { exec } = require('child_process');
/**/
/**/
const {PlagFile} = require('../lib/plagiarism.js')
const router  = express.Router();
router.use(express.urlencoded({ extended: true }));

/**/

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

/***************************  REMEMBER TO CHANGE FILE PATH & PLAG FOR EACH FUNCTION's FILES */
const fs = require('fs');
const path = require('path');
//const Plagiarism = require('./lib/plagiarism.js');
const { checkPlagiarism } = require('../lib/plagiarism.js');

const { readFile } = require('fs/promises')

          async function content(path) {  
            return await readFile(path, 'utf8')
          }

const saveFile = (name, data) => {
return new Promise((resolve, reject) => {
  fs.writeFile(name,data, function(err) {
      if(err) {
          console.log(err);
          reject()
      } else {
          console.log("The file was saved!");
          resolve()
      }
  }); 
})
}


// Function for executing C codes
const cExecute = (data, input,directory,sId,qId,lang) => {
return new Promise((resolve, reject)=>{
  const fileName = "./class_assignments/submissions/"+sId+"_"+qId+".c";
  const checkName = "./class_assignments/solutions/"+qId+"_soln_"+lang+".c";
  const inpName = "./input.txt";
    //const inpName = "./class_assignments/submissions/"+sId+"_"+qId+"_input.txt";
    saveFile(fileName, data)
    .then(()=>{
      // Create Input file
      if(input){
      fs.writeFile(inpName, input, function(err) {
        if(err) {
            console.log(err);
            reject()
        } 
      });}
        // FILE SAVED SUCCESSFULLY
        // Generate the output file for it
        const filePath = path.join(directory,fileName)
        const inpPath = path.join(directory,inpName)

        /* Plag started */
        const checkfilePath = path.join(directory,checkName)
        console.log(filePath)
        console.log(checkfilePath)
        plagiarismValue=0
        fs.readFile(filePath, 'utf8', (err1, data1) => { 
          if (err1) { 
            console.error('Error reading file:', err1); 
            return; 
          } 
         
          const content1 = data1.toString(); 
          fs.readFile(checkfilePath,'utf-8',(err2,data2) => {
            if (err2) { 
              console.error('Error reading file:', err2); 
              return; 
            }
            const content2 = data2.toString(); 
            plagiarismValue=checkPlagiarism(content1,content2,"percentage")
            console.log("CONTENT1="+content1+"\nCONTENT2="+content2)
            console.log("FINISH")
          })  
        });
          console.log(plagiarismValue,"matched")
        /* Plag ended */

        exec('gcc "'+filePath+'"', (err, stdout, stderr) => {
            if (err) {
              // IF COMPILATION ERROR
              console.error(`exec error: ${err}`);
              resolve({
                err: true,
                output: err,
                error: stderr,
                plag:"NA"
              })
            }
            
            // SUCCESSFULL COMPILATION EXECUTING
            if(input){
            exec('a.exe < "'+inpPath+'"', (err, stdout, stderr) => {
              if(err){
                console.log("ERROR "+err)
                resolve({
                  err: true,
                  output: err,
                  error: stderr,
                  plag: "NA"
                })
              }
    
              console.log("\nOUTPUT ", stdout)
              resolve({
                err: false,
                output: stdout,
                plag: plagiarismValue
              })
            })}
            else{
              exec('a.exe', (err, stdout, stderr) => {
                if(err){
                  console.log("ERROR "+err)
                  resolve({
                    err: true,
                    output: err,
                    error: stderr,
                    plag: "NA"
                  })
                }
      
                console.log("OUTPUT ", stdout)
                resolve({
                  err: false,
                  output: stdout,
                  plag:plagiarismValue
                })
              })
            }
          })

    })
    .catch(()=>{
      console.log("ERROR SAVE FILE"+ saveFile)
      const err = {
        err: true,
        output: "Internal Server Error!",
        plag: "NA"
      }
      resolve(err)
    })
}) 
}

// Function for executing C++ codes
const cppExecute = (data, input,directory,sId,qId,lang) => {
return new Promise((resolve, reject)=>{
    const fileName = "./class_assignments/submissions/"+sId+"_"+qId+".cpp";
    const checkName = "./class_assignments/solutions/"+qId+"_soln_"+lang+".cpp";
    const inpName = "./input.txt";
    //const inpName = "./class_assignments/submissions/"+sId+"_"+qId+"_input.txt";
    saveFile(fileName, data)
      .then(()=>{
        // Create Input file
        if(input){
        fs.writeFile(inpName, input, function(err) {
          if(err) {
              console.log(err);
              reject()
          } 
        });
      }
          // FILE SAVED SUCCESSFULLY
          // Generate the output file for it
          const filePath = path.join(directory,fileName)
          const inpPath = path.join(directory,inpName)

          /* Plag started */
          const checkfilePath = path.join(directory,checkName)
          console.log(filePath)
          console.log(checkfilePath)
          plagiarismValue=0
          fs.readFile(filePath, 'utf8', (err1, data1) => { 
            if (err1) { 
              console.error('Error reading file:', err1); 
              return; 
            } 
           
            const content1 = data1.toString(); 
            fs.readFile(checkfilePath,'utf-8',(err2,data2) => {
              if (err2) { 
                console.error('Error reading file:', err2); 
                return; 
              }
              const content2 = data2.toString(); 
              plagiarismValue=checkPlagiarism(content1,content2,"percentage")
              console.log("CONTENT1="+content1+"\nCONTENT2="+content2)
              console.log("FINISH")
            })  
          });
            console.log(plagiarismValue,"matched")
          /* Plag ended */


          exec('g++ "'+filePath+'"', (err, stdout, stderr) => {
              if (err) {
                // IF COMPILATION ERROR
                console.error(`exec error: ${err}`);
                resolve({
                  err: true,
                  output: err,
                  error: stderr,
                  plag:"NA"
                })
              }
              
              // SUCCESSFULL COMPILATION EXECUTING
              if(input){
              exec('a.exe < "'+inpPath+'"', (err, stdout, stderr) => {
                if(err){
                  console.log("ERROR "+err)
                  resolve({
                    err: true,
                    output: err,
                    error: stderr,
                    plag: "NA"
                  })
                }
      
                console.log("\nOUTPUT ", stdout)
                resolve({
                  err: false,
                  output: stdout,
                  plag: plagiarismValue
                })
              })}
              else{
                exec('a.exe', (err, stdout, stderr) => {
                  if(err){
                    console.log("ERROR "+err)
                    resolve({
                      err: true,
                      output: err,
                      error: stderr,
                      plag: "NA"
                    })
                  }
        
                  console.log("OUTPUT ", stdout)
                  resolve({
                    err: false,
                    output: stdout,
                    plag:plagiarismValue
                  })
                })
              }
            })

      })
      .catch(()=>{
        console.log("ERROR SAVE FILE"+ saveFile)
        const err = {
          err: true,
          output: "Internal Server Error!",
          plag: "NA"
        }
        resolve(err)
      })
}) 
}


// Function for executing python codes
const pyExecute = (data, input,directory,sId,qId,lang) => {
return new Promise((resolve, reject)=>{

  const fileName = "./class_assignments/submissions/"+sId+"_"+qId+".py";
  const checkName = "./class_assignments/solutions/"+qId+"_soln_"+lang+".py";
  const inpName = "./input.txt";
    //const inpName = "./class_assignments/submissions/"+sId+"_"+qId+"_input.txt";
  saveFile(fileName, data)
    .then(()=>{
      // Create Input file
      if(input){
      fs.writeFile(inpName, input, function(err) {
        if(err) {
            console.log(err);
            reject()
        } 
      });
    }
          // FILE SAVED SUCCESSFULLY
          // Generate the output file for it
          const filePath = path.join(directory,fileName)
          const inpPath = path.join(directory,inpName)

          /* Plag started */
          const checkfilePath = path.join(directory,checkName)
          console.log(filePath)
          console.log(checkfilePath)
          plagiarismValue=0
          fs.readFile(filePath, 'utf8', (err1, data1) => { 
            if (err1) { 
              console.error('Error reading file:', err1); 
              return; 
            } 
           
            const content1 = data1.toString(); 
            fs.readFile(checkfilePath,'utf-8',(err2,data2) => {
              if (err2) { 
                console.error('Error reading file:', err2); 
                return; 
              }
              const content2 = data2.toString(); 
              plagiarismValue=checkPlagiarism(content1,content2,"percentage")
              console.log("CONTENT1="+content1+"\nCONTENT2="+content2)
              console.log("FINISH")
            })  
          });
            console.log(plagiarismValue,"matched")
          /* Plag ended */

          if(!input){
          exec('python "'+filePath+'"', (err, stdout, stderr) => {
              if (err) {
                // IF COMPILATION ERROR
                console.error(`exec error: ${err}`);
                resolve({
                  err: true,
                  output: err,
                  error: stderr,
                  plag:"NA"
                })
              }
                  console.log("OUTPUT ", stdout)
                  resolve({
                    err: false,
                    output: stdout,
                    plag: plagiarismValue
                  })
            })
          }
          else
          {
            exec('python "'+filePath+ '" < "'+inpPath+'"', (err, stdout, stderr) => {
              if (err) {
                // IF COMPILATION ERROR
                console.error(`exec error: ${err}`);
                resolve({
                  err: true,
                  output: err,
                  error: stderr,
                  plag: "NA"
                })
              }
              console.log("OUTPUT ", stdout)
              resolve({
                  err: false,
                  output: stdout,
                  plag: plagiarismValue
                })
            })
          }
        
      })
      .catch(()=>{
        console.log("ERROR SAVE FILE"+ saveFile)
        const err = {
          err: true,
          output: "Internal Server Error!",
          plag: "NA"
        }
        resolve(err)
      })
}) 
}



router.post('/',async (req,res)=>{
const {code, input, lang, plag, sId, qId} = req.body
//sId=studentId
/*Maintaining correct directory for files"*/
directory=__dirname;
directory=directory.substring(0, directory.lastIndexOf("\\"));//directory becomes path of parent directory

console.log("\n",lang,"\n");
if(lang=='c')
{
  const data_1 = await cExecute(code, input, directory, sId, qId ,lang);
  res.json(data_1);
}
else if(lang=='c++')
{
  const data_1 = await cppExecute(code, input, directory, sId, qId ,lang);
  console.log("\nPLAG=",data_1.plag,"file\n");
  res.json(data_1);
}
else if(lang=='python')
{
  const data_1 = await pyExecute(code, input, directory, sId, qId ,lang);
  res.json(data_1);
}
else
{
  console.log("\nLanguage still to be compiled\n");
}
//const data_1 = await cExecute(code, input);
//res.json(data_1);
})
module.exports = router;