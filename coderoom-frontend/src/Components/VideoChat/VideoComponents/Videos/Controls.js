import { useEffect, useState } from "react";
import MicOffIcon from '@material-ui/icons/MicOff';
import MicIcon from '@material-ui/icons/Mic';
import VideocamIcon from '@material-ui/icons/Videocam';
import VideocamOffIcon from '@material-ui/icons/VideocamOff';
import { withStyles } from '@material-ui/core/styles';

import { Button } from '@material-ui/core';


import styled, { css }  from 'styled-components';

const ControlsPanel = styled.div`
position: relative;
width: 100%;
background-color: transparent;
align-items: center;
justify-items: center;
display: flex;
`


const StyledButton = withStyles({
  root: {
    width: '100%',
  }
})(Button);

const Controls = ({tracks, setStart, setInCall, useClient}) => {
  const client = useClient();

  const [trackState, setTrackState] = useState({ video: false, audio: false });


  
  const mute = async (type) => {
    if (type === "audio") {
      await tracks[0].setEnabled(!trackState.audio);
      setTrackState((ps) => {
        return { ...ps, audio: !ps.audio };
      });
    } else if (type === "video") {
      await tracks[1].setEnabled(!trackState.video);
      setTrackState((ps) => {
        return { ...ps, video: !ps.video };
      });
    }
  };
  
  // const leaveChannel = async () => {
  //   await client.leave();
  //   client.removeAllListeners();
  //   tracks[0].close();
  //   tracks[1].close();
  //   setStart(false);
  //   setInCall(false);
  // };

  return (
    <ControlsPanel>
      <StyledButton variant="outlined" color={trackState.audio ? "primary" : "inherit"} 
        onClick={() => mute("audio")} size='large' width='100%'>
        {trackState.audio ? <MicIcon />: <MicOffIcon />}
      </StyledButton >
      <StyledButton variant="outlined" color={trackState.video ? "primary" : "inherit"} 
        onClick={() => mute("video")}  size='large' width='100%'>
        {trackState.video ? <VideocamIcon /> : <VideocamOffIcon/>}
      </StyledButton >
      {/* {<ControlStyledButton  onClick={() => leaveChannel()}>Leave</ControlStyledButton >} */}
    </ControlsPanel>
  );
};

export default Controls