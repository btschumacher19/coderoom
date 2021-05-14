import { useEffect, useState , useRef} from 'react'
import {useParams} from 'react-router-dom'

import styled, { css }  from 'styled-components';
import { Typography} from '@material-ui/core';

import {Compiler, StudentSignInModal, ChallengeSubmitted, ChallengeLocked, ChallengeLoader, DoesNotExist, VideoChat} from '../../Components/_index'
import {fetchDetail} from '../../APIs/helperFunctions'

const API_KEY_FB = process.env.REACT_APP_FIREBASE_API_KEY
const URL_FB = process.env.REACT_APP_FIREBASE_RTDB_URL

const boxShadow = css`
    -webkit-box-shadow: 0px 0px 16px 3px rgba(0,0,0,0.25); 
    box-shadow: 0px 0px 16px 3px rgba(0,0,0,0.25);
`;

const UserContainer = styled.div`
padding: .1em;
margin: .1em;
width: fit-content;
border-radius:5px;
`;

const BaseDivs = css`
    ${boxShadow}
        width: 100%;
        height: 100%;
        padding: 20px;
        border-radius: 6px;
`;

const ChallengeWrapper = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr 4fr 1fr;
    gap: 10px;

    @media only screen and (max-width: 1024px) {
      display: grid;
      grid-template-rows: auto auto;
      grid-template-columns: 4fr 1fr;
  }

    @media only screen and (max-width: 680px) {
      display: flex;
      flex-direction: column;
  }
`;

const ChallengeInfoWrapper= styled.div`
${BaseDivs}
grid-row: 1 /span 2;
grid-column: 1;

@media only screen and (max-width: 1024px) {
  grid-row: 1;
  grid-column: 1;
}
`;

const CompilerWrapper = styled.div`
${BaseDivs}
grid-row: 1 /span 2;
grid-column: 2;
display: flex;
flex-direction: column;

@media only screen and (max-width: 1024px) {
  grid-row: 2;
  grid-column: 1;
}
`;

const ChallengeContainer = styled.div`
border: 1px solid #347FC4;
padding: .5em;
border-radius: 3px;
white-space: pre-wrap;
`;


const ChatWrapper = styled.div`
${BaseDivs}
grid-row:  1 /span 2 ;
grid-column: 3;

@media only screen and (max-width: 1024px) {
  grid-row: 1 / span 2;
  grid-column: 2;
}
`;

const UsersContainer = styled.div`
display: flex;
flex-flow: row wrap;
align-content: stretch;
justify-content: space-around;
border: 1px solid #347FC4;
padding: .4em;
border-radius: 3px;

`;


function StudentChallengePage({theme}) {
console.log(theme)
  const [challenge, setChallenge] = useState()
  const [challengeLock, setChallengeLock] = useState()
  const [studentName, setStudentName] = useState(null)
  const [activeStudents, setActiveStudents] = useState([])
  const [contributers, setContributers] = useState([])
  const [challengeSubmitted, setChallengeSubmitted] = useState(false)
  const [validSession, setValidSession] = useState(null)
  const isLockedRef = useRef(null)
  const params = useParams()

  const currentRoom = window.location.hash.replace(/#/g, '')

  const config = {
    apiKey: API_KEY_FB,
    databaseURL: URL_FB,
  };


  const setNewChallenge = async () => {
    //get the challenge from the selected challengeid in URL
    
    let res = await fetchDetail('challenges', params.challengeID, false)
    setChallenge(res)
  }

  const monitorSubmission = (db) => {
    const ref = db.ref(currentRoom)
    ref.on('value', function(snapshot) { 
      if(isLockedRef.current == null){
        isLockedRef.current = snapshot.val().locked
      }else {
        getContributingStudents()
        setChallengeSubmitted(snapshot.val().locked)
      }
      setChallengeLock(snapshot.val().locked)
    })
  }

  const checkRoomIsValid = (db) => {
    const ref = db.ref(currentRoom)
    let isSessionValid = true;
    ref.once('value', function(snapshot) { 
      console.log()
      if(snapshot.val().challenge !== params.challengeID){
        setValidSession(false)
        isSessionValid = false
    }else{
      setValidSession(true)
    }
  })

  return isSessionValid
}

  const checkLock = async () => {
    const db = window.firebase.database()
    const dbRef = db.ref()
    dbRef.once("value").then(function(snapshot) {
    if(snapshot.hasChild(currentRoom)){
      if(checkRoomIsValid(db)) monitorSubmission(db)
    }else{
      setChallengeLock(null)
        }
      });
    }


     

    const getContributingStudents = ()=> {
      let contributingStudents = []
      window.firebase.database().ref(`${currentRoom}/contributers/`).on('value', function (snapshot) {
        snapshot.forEach(snap => {
          contributingStudents.push(snap.val())
        })
      });
      contributingStudents = [...new Set(contributingStudents)]
      setContributers(contributingStudents)
      return contributingStudents
    }




  useEffect(() => {
    if(currentRoom){
    window.firebase.initializeApp(config);
    checkLock()
    setNewChallenge()
    
  }
  return () => window.firebase.app("[DEFAULT]").delete()

  }, [])


  const challengeInfo = () => {
    if(challenge){
      return (
        <>
        <Typography align='center' varient='h3' style={{fontSize:"1.25em", marginBottom: "10px"}}>{challenge.title}</Typography>
        <ChallengeContainer >{challenge.description}</ChallengeContainer>
      </>
      )
    }else{
      return <Typography varient='h1'>Loading...</Typography>
    }
  }

 
  const displayActiveUsers = () => {
    if(activeStudents){
    return activeStudents.map((student, i) => {
      return <UserContainer style={{border: `1px solid ${student.color}`, color: `${student.color}`}} key={i} >
              {student.name}
            </UserContainer>
    })}
  }

if(!currentRoom || validSession == false){
  return <DoesNotExist displayTitle="This room does not exist!" displayText="Please ensure you have the correct URL from your instructor"/>
}else if(challengeLock === true && !challengeSubmitted){
    return <ChallengeLocked />
}else if(challengeSubmitted){
  return <ChallengeSubmitted contributers={contributers} challengeTitle={challenge.title} />
}else if(studentName && (challengeLock === false) && validSession === true){
  if(challenge){
      return (
        <ChallengeWrapper>
          <ChallengeInfoWrapper>
            {challengeInfo()}
          </ChallengeInfoWrapper>
          <CompilerWrapper>
            <Compiler starter_code={challenge?.starter_code} theme={theme} studentName={studentName} setActiveStudents={setActiveStudents} setChallengeSubmitted={setChallengeSubmitted} currentRoom={currentRoom} challenge={challenge} getContributingStudents={getContributingStudents}/>
            </CompilerWrapper>
            <ChatWrapper>
              <h4>Signed in as: {studentName}</h4>

              <UsersContainer >{displayActiveUsers()}</UsersContainer>
              <VideoChat studentName={studentName} activeStudents={activeStudents} challengeSubmitted={challengeSubmitted}/>
            </ChatWrapper>
        </ChallengeWrapper>
      )
  }else{
    return <ChallengeLoader loadingText='Loading Challenge' />
  }
}else if(!studentName && (challengeLock === false)){
    const storedName = window.localStorage.getItem('studentID')
    if(storedName){
      setStudentName(storedName) 
    }
    return (
      <StudentSignInModal setStudentName={setStudentName} />
    )
}else if(challengeLock === null ){
    return <DoesNotExist displayTitle="This room does not exist!" displayText="Please ensure you have the correct URL from your instructor"/>
}else{
  return <ChallengeLoader loadingText='Checking Challenge Status' />
}
}

export{ StudentChallengePage}