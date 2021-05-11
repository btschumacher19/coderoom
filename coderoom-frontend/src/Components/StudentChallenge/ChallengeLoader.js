import React from 'react'

import styled, { css }  from 'styled-components';
import { CircularProgress } from '@material-ui/core';

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

function ChallengeLoader({loadingText}) {
  return (
    <BackgroundDiv>
    <CenterDiv>
      <CircularProgress size="100px" />
      <h3>{loadingText && loadingText}</h3>
    </CenterDiv>
    </BackgroundDiv>
  )
}

export {ChallengeLoader}
