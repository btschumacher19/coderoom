import React from 'react'


import styled, { css }  from 'styled-components';
import { Typography, Paper} from '@material-ui/core';




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
        display: flex;
        justify-content: center;
        align-items: center;  
        flex-direction: column;
`;

const SubmissionDetail= styled.div`
height: 50%;
margin: 2em;
display: flex;
justify-content: center;
align-items: center;
`




function DoesNotExist({displayTitle="Ooops!", displayText="Not Found!"}) {


  return (
    <BackgroundDiv>
      <CenterDiv>
        <Typography variant='h5' component='h1' align='center'>
          {displayTitle}
        </Typography>
        <SubmissionDetail>
        <Typography>
        {displayText}
        </Typography>
        </SubmissionDetail>
      </CenterDiv>
    </BackgroundDiv>
  )
}

export {DoesNotExist}
