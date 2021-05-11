
import React, {useEffect, useState, useRef } from "react";
import {useParams} from 'react-router-dom'

import styled from 'styled-components';
import { Typography, Button } from '@material-ui/core';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import PublishIcon from '@material-ui/icons/Publish';
import moment from 'moment'


import {FirePad, SubmitChallengeModal} from "../_index"
import {postToServer} from '../../APIs/helperFunctions'

const API_KEY = process.env.REACT_APP_JUDGE0_KEY


const CompileTextContainer = styled.div`
    width: 100%;
    background-color: ${props => props.theme === "dark" ? "#2d2d2d": "fff"};
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin: auto;
    padding: .1em;
`;

const CompilerContainer = styled.div`
  height: 100%;
`;

const OutputBox = styled.textarea`
    width: 100%;
    margin-top: 1em;
    height: 8em;
    border: 3px solid #2d2d2d;
    resize: none;
    border-radius: 5px;
    background-color: #1c1c1c;


`


const Compiler = ({starter_code, theme, studentName, setActiveStudents, setChallengeSubmitted, currentRoom, challenge, getContributingStudents}) => {

  const [user_input, setUser_input] = useState('');
  const [compiledData, setCompiledData] = useState({})
  const [submitWarning, setSubmitWarning] = useState(false)
  const languageRef = useRef()
  
  const params = useParams()

if(!languageRef.current){
  languageRef.current = ((languageStr) =>{

    switch(languageStr){
      case 'javascript':
            return 63;
      case 'c':
        return 50;
        
      case 'c++':
        return 53;
        
      case 'java':
        return 62;
        
      case 'python':
        return 71;
        
    }})(challenge.language)}


  const getTextFromCodeEditor = () => {
    const lines = document.querySelectorAll('.CodeMirror-line ')
    let textFromCode = []
    for(let line of lines){
      textFromCode.push(line.innerText)
    }
    //filters out ''ZERO WIDTH SPACE' (U+200B)' that was appearing at the end of blank lines
    let filteredCode = textFromCode.filter(text => {
      return /\S+/.test(text.replace(/\u200B/g,''))
    }
    )
    //joins code with a new line char
    const parsedCodeText = filteredCode.join('\n')
    return parsedCodeText
  }




  const addStudentAsContributer =  async (studentName) => {
    const db = window.firebase.database().ref(currentRoom)
    const contributingStudents =  await getContributingStudents()
    const contributersRef = db.child("contributers")
    //check for duplicates before push-----issue with array not loading properly
    contributersRef.push(studentName);

  }

    const currentStudents = (check) => {
      //check is the action to take with firebase ref
    window.firebase.database().ref(`${currentRoom}/users`).on(check, function (snapshot) {
      let currentStudents = []
      snapshot.forEach(snap => {
        currentStudents.push({name: snap.key, color: snap.child('color').val()})
      })
      setActiveStudents(currentStudents)
      return currentStudents
    });
  }

  const lockChallenge = () => {
    const db = window.firebase.database().ref(currentRoom)
    db.update({locked: true});
  }


  const submitToInstructor = async () => {
    // console.log(params) <---- Get challengeId
    // console.log(window.location.hash) <-----Get RoomId
    let contributingStudents = getContributingStudents()
    console.log(contributingStudents)
    const challengeObj = {
      "date_submitted" : moment.utc().format(),
      "student_names" : contributingStudents,
      "solution" : getTextFromCodeEditor(),
      "url" : window.location.href,
      "is_locked" : "true",
      "challenge" : params.challengeID 
  }
  console.log(challengeObj)
  let response = await postToServer('submissions', challengeObj, false)
  const lockResponse = await lockChallenge()
  return response.response
  }


  const submit = async (e) => {
    e.preventDefault();
    let outputText = document.getElementById("output");
    outputText.innerHTML = "";
    outputText.innerHTML += "Creating Submission ...\n";



    let response;
    try{
      response = await fetch(
      "https://judge0-ce.p.rapidapi.com/submissions/?base64_encoded=false&wait=false",
      {
        method: "POST",
        headers: {
          "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
          "x-rapidapi-key": API_KEY, 
          "Content-Type": "application/json",
          "useQueryString": true
        },
        body: JSON.stringify({
          source_code: getTextFromCodeEditor(),
          stdin: user_input,
          language_id: languageRef.current,
        }),
      }
    );
    
    outputText.innerHTML += "Submission Created ...\n";
    const jsonResponse = await response.json();
    console.log(jsonResponse)


    let jsonGetSolution = {
      status: { description: "Queue" },
      stderr: null,
      compile_output: null,
    };
  
    while (
      jsonGetSolution.status.description !== "Accepted" &&
      jsonGetSolution.stderr == null &&
      jsonGetSolution.compile_output == null
    ) {

      outputText.innerHTML = `Creating Submission ... \nSubmission Created ...\nChecking Submission Status\nstatus : ${jsonGetSolution.status.description}`;
      if (jsonResponse.token) {
        let url = `https://judge0-ce.p.rapidapi.com/submissions/${jsonResponse.token}?base64_encoded=false`;

        const getSolution = await fetch(url, {
          method: "GET",
          headers: {
            "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
            "x-rapidapi-key": API_KEY,
            "Content-Type": "application/json",
          },
        });


        jsonGetSolution = await getSolution.json();
      }
    }
    if (jsonGetSolution.stdout) {
      const outputSolution = jsonGetSolution.stdout;

      const resultArray = outputSolution.split('\\n')
      outputText.innerHTML = "";

      outputText.innerHTML += `Results: ${outputSolution}\nExecution Time : ${jsonGetSolution.time} Secs\nMemory used : ${jsonGetSolution.memory} bytes`;
      setCompiledData({time: jsonGetSolution.time, memory: jsonGetSolution.memory, token : jsonGetSolution.token})
    } else if (jsonGetSolution.stderr) {
      const error = jsonGetSolution.stderr;
      console.log(error)
      outputText.innerHTML = "";

      outputText.innerHTML += `\n Error :${error}`;
    } else {
      const compilation_error = jsonGetSolution.compile_output;
     console.log(jsonGetSolution)

      outputText.innerHTML = "";

      outputText.innerHTML += `\n ${compilation_error == null? ' Output returned "null"' : compilation_error}`;
    }
  }catch(err){
    console.error(err)
  }
  };




  useEffect(() => {
    currentStudents('value')
    currentStudents('child_changed')
    addStudentAsContributer(studentName)
  }, [])


    return (
      <>
      {submitWarning && <SubmitChallengeModal setSubmitWarning={setSubmitWarning} submitToInstructor={submitToInstructor} setChallengeSubmitted={setChallengeSubmitted} />}
        <CompilerContainer>
            <CompileTextContainer style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Typography style={{textTransform: "capitalize"}}>
                Language: <span style={{color: "#347FC4"}}>{challenge.language === 'javascript' ? "JavaScript" : challenge.language}</span>
              </Typography> 
              <Button style={{}} color="primary" variant="outlined"
              type="submit"
              className=""
              onClick={(event) => submit(event)}
            >
                <KeyboardArrowRightIcon />Run
            </Button>
              
                </CompileTextContainer>
   
            <FirePad language={challenge.language} starter_code={starter_code} theme={theme.currentTheme} studentName={studentName} currentRoom={currentRoom} />

          <div className="">
            <div>
            <CompileTextContainer style={{alignItems: 'flex-start'}} >
              <OutputBox style={{}} multiline={true} rows='5' id="output" placeholder={'output:'}disabled></OutputBox>
            </CompileTextContainer>
            </div>
          </div>

        <div className="">
          <CompileTextContainer style={{alignItems: 'flex-end'}}>
          <Button style={{width: 'fit-content', margin: "2em 1em 1em 1em"}}  color="primary" variant="outlined"
              type="submit"
              className=""
              onClick={() => setSubmitWarning(true)}
            >
                   <PublishIcon/> &nbsp; Submit Code 
            </Button>
            </CompileTextContainer>
        </div>
        </CompilerContainer>
      </>
    );
   
}

export  {Compiler}