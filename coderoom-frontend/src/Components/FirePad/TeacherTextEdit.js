

import React, { useEffect, useRef } from "react";
import styled from 'styled-components';
import './TeacherTextEdit.css'
import './codeMirrorThemes/coderoom-dark.css'
import './FirePad.css'; 

const StarterCode= styled.div`
    min-height: 400px;
    height: auto;
    position: relative;
`;

const TeacherTextEdit = ( props ) => {
  const {language_name, theme, code} = props
  const codeMirrorRef= useRef()

  let codeTheme = 'coderoom-dark'

  const commentType = (() =>{
    let comment;
    switch(language_name){
      case 'javascript':
      case 'c':
      case 'c++':
      case 'java':
        comment = ['/*', '*/']
        break
      case 'python':
        comment = [`'''`, `'''`]
        break
      default:
        comment = ['/*', '*/']
    }
    return comment
  })()


 useEffect(() =>{
    const val = code
    ? code
    : `${commentType[0]}Enter your ${language_name} starter code here!${commentType[1]}`
  //  if starter code is provided, the IDE will be populated with it
    if(!codeMirrorRef.current && language_name){
      let codeMirror = window.CodeMirror(document.getElementById('code-mirror-container'), { 
        lineNumbers: true,
        mode: language_name,
        theme: codeTheme,
        value: val
      });
      codeMirrorRef.current = codeMirror

      // refresh current IDE options when language is changed
      } else if ( codeMirrorRef.current && language_name ) {
        codeMirrorRef.current.setOption("mode", language_name)

        //checking both that there is no provided starter code, and that the link is for a new
        // challenge. If so, val will be rendered in the selected language
        if (code.length <  1 && props.new === true) {
          codeMirrorRef.current.setOption("value", val)
        }
      } 
    }, [ language_name ])



    return (
        <StarterCode id="code-mirror-container" >
        </StarterCode>
    );
  
}
export  {TeacherTextEdit};