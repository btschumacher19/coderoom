import React, { useEffect } from 'react'


import styled, { css }  from 'styled-components';
import { Typography } from '@material-ui/core';




const boxShadow = css`
    -webkit-box-shadow: 0px 0px 16px 3px rgba(0,0,0,0.25); 
    box-shadow: 0px 0px 16px 3px rgba(0,0,0,0.25);
`;

const BackgroundDiv = styled.div`
position: absolute;
width: 100%;
height: 100%;
display: flex;
justify-content: center;
align-items: center;
`

const CenterDiv= styled.div`
    ${boxShadow}
        width: 50%;
         height: 50%;
        padding: 20px;
        border-radius: 6px;
`;

const SubmissionNames = styled.div`
height: 50%;
margin: 2em;
display: flex;
justify-content: center;
align-items: center;
`




function ChallengeSubmitted({contributers, challengeTitle}) {

  useEffect(() => localStorage.removeItem("studentID"))

  const displayContributingUsers = () => {
    return contributers.map((student, i) => {
      if(i < contributers.length -1){
        return <span key={i}>{student}, </span>
      }else{
        return <span key={i}>and {student}</span>
      }
    })
  }
  
  return (
    <BackgroundDiv>
      <CenterDiv>
        <Typography variant='h5' component='h1' align='center'>
          Thank you for your submission!
        </Typography>
        <Typography align='center'>
          Challenge: {challengeTitle}
        </Typography>
        <SubmissionNames>
        <Typography>
          Submitted By: {displayContributingUsers()}
        </Typography>
        </SubmissionNames>
      </CenterDiv>
    </BackgroundDiv>
  )
}

export {ChallengeSubmitted}
