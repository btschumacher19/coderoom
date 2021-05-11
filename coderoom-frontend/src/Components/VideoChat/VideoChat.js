
import {useState, Fragment, memo, useEffect} from "react";

import {
  AgoraVideoPlayer,
  createClient,
  createMicrophoneAndCameraTracks,
} from "./react-agora/react_agora.tsx";

import VideoCall from './VideoComponents/VideoCall/VideoCall'


const config = { 
  mode: "rtc", codec: "vp8",
};


// const appId = process.env.APP_ID----------------------------------------------------------------------------------------------; 
const appId = process.env.REACT_APP_VIDEO_CHAT_APP_ID


const VideoChat = memo(({studentName, activeStudents, challengeSubmitted}) => {
  const [inCall, setInCall] = useState(true);
  const [channelName, setChannelName] = useState(window.location.hash.replace(/#/g, ''));
  const useClient = createClient(config);
  const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();


  // if(challengeSubmitted){
  //   setInCall(false)
  // }
  console.log(activeStudents)
  console.log(challengeSubmitted, 'submit challenge')
  // useEffect(() => {
  //   setChannelName('hello')
  //   setInCall(true)
  //   //change from hardcode---------------------------------------------------------------------------------------------------------;
  // }, [])


  return (
    <Fragment>

      {inCall ? (
        <VideoCall setInCall={setInCall} channelName={channelName} useClient={useClient} useMicrophoneAndCameraTracks={useMicrophoneAndCameraTracks} appId={appId} AgoraVideoPlayer={AgoraVideoPlayer} studentName={studentName} challengeSubmitted={challengeSubmitted} />
      ) : (
        <div>Connection Lost</div>
      )}
  </Fragment>
  );
}, (prevProps, nextProps) => (prevProps.activeStudents !== nextProps.activeStudents));

export  {VideoChat};
