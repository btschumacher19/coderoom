import React, { useEffect, useRef } from "react";
import './codemirror.css'
import './codeMirrorThemes/coderoom-dark.css'
import './codeMirrorThemes/coderoom-light.css'

import './FirePad.css'; 


const FirePad = ({language, starter_code, studentName, currentRoom}) => {

const codeMirrorRef= useRef()
let firepad; 


  useEffect(() =>{
    if(!codeMirrorRef.current && starter_code){
      let codeMirror
    // window.firebase.initializeApp(config);
    //// Get Firebase Database reference.
    let firepadRef = window.firebase.database().ref(currentRoom);
    //// Create CodeMirror (with lineWrapping on).
    
    codeMirror = window.CodeMirror(document.getElementById('firepad-container'), {
      lineNumbers: true,
      mode: language,
      theme: `coderoom-dark`,
    });
    // codeMirror.registerHelper
      codeMirrorRef.current = codeMirror
    //could put user ID here
    firepad = window.Firepad.fromCodeMirror(firepadRef, codeMirror,
        { 
          defaultText: starter_code,
          userId: studentName,
        }
        );
    //// Initialize contents.
    firepad.on('ready', function() {

      if (firepad.isHistoryEmpty() && starter_code) {
        firepad.setText(starter_code);
      }

    });
  }
  }, [starter_code])



    return (
  
            <div id="firepad-container"></div>
  
        
    );
  
}
export  {FirePad};