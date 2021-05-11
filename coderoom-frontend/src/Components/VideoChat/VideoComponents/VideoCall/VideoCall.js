import { useEffect, useState, Fragment } from "react";
import Videos from '../Videos/Videos'
import { CircularProgress } from '@material-ui/core';

import AgoraRTC from 'agora-rtc-sdk-ng'
import styled from 'styled-components';


const VideosWrapper = styled.div`
position: relative;
display: flex;
justify-items: center;
align-items: center;
flex-flow: column;
height: fit-content;
width: 100%;
`

const VideoCall = ({
  setInCall,
  channelName,
  useClient,
  useMicrophoneAndCameraTracks,
  appId,
  AgoraVideoPlayer,
  studentName,
  challengeSubmitted
}) => {

  const [users, setUsers] = useState([]);
  const [start, setStart] = useState(false);
  const client = useClient();
  const { ready, tracks } = useMicrophoneAndCameraTracks();


  // const terminateCall = async () =>{ 
  //   console.log("terminating")
  //   await client.leave()
  // }

  useEffect(() => {
    // function to initialise the SDK

    
    let init = async (name) => {
      client.on("user-published", async (user, mediaType) => {
        await client.subscribe(user, mediaType);
        if (mediaType === "video") {
          setUsers((prevUsers) => {
            const userArr = [...prevUsers, user]
            return userArr;
          });
        }
        if (mediaType === "audio") {
          user.audioTrack?.play();
        }
      });

      client.on("user-unpublished", (user, type) => {
        if (type === "audio") {
          user.audioTrack?.stop();
        }
        if (type === "video") {
          setUsers((prevUsers) => {
            return prevUsers.filter((User) => {
              return User.uid !== user.uid});
          });
        }
      });

      client.on("user-left", (user) => {
        setUsers((prevUsers) => {
          return prevUsers.filter((User) => User.uid !== user.uid);
        });
      });
      try{
        const config = {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
          }
        };
        //first null is token auth, second null is ID of user
        await client.join(appId, name, null, studentName);
      }catch(err){
        console.log(err)
      }




      if (tracks) await client.publish([tracks[0], tracks[1]]);
      setStart(true);
      AgoraRTC.setLogLevel(4)

    };
  

    if (ready && tracks) {
      init(channelName);
    }

    // return () =>{terminateCall()}

  }, [channelName, client, ready, tracks])

  // let controlsComp;
  // if(ready && tracks){
  //   controlsComp =  <Controls tracks={tracks} setStart={setStart} setInCall={setInCall} useClient={useClient}/>
  // } 
  return (
    <VideosWrapper>
      {/* {ready && tracks && (
        <Controls tracks={tracks} setStart={setStart} setInCall={setInCall} useClient={useClient}/>
      )} */}
      {start && tracks ? <Videos users={users} tracks={tracks} AgoraVideoPlayer={AgoraVideoPlayer} studentName={studentName} setStart={setStart} setInCall={setInCall} useClient={useClient} ready={ready}/> : <Fragment><CircularProgress color="secondary" /><span className="sr-only">Loading...</span></Fragment>}
      <div className="control-panel">
      </div>
    </VideosWrapper>
  );
};

export default VideoCall