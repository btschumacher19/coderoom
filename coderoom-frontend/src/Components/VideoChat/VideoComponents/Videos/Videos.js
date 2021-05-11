import {useRef, useState, useEffect} from 'react'
import styled from 'styled-components';
import Controls from '../Videos/Controls'
import { Pagination } from '@material-ui/lab';



const VideosDiv = styled.div`
position: relative;
display: flex;
align-self: flex-start;
justify-items: center;
align-items: center;
width:100%;
flex-direction: column;
`
const UserVideoDiv = styled.div`
position: relative;
display: flex;
align-self: flex-start;
justify-items: center;
align-items: center;
width:100%;
flex-direction: column;
`


const vidStyles = {
  position: 'relative',
  backgroundColor:'black',
  height: '150px',
  width: '100%',
  borderWidth: '1px',
  borderColor: '#347FC4',
  borderStyle: 'solid',
}


const NameLabel = styled.span`
background-color: #ffffff67;
color: black;
position: absolute;
z-index: 5;
border-bottom-right-radius: 5px;
padding: .2em;

`


const Videos = ({
  users,
  tracks,
  AgoraVideoPlayer,
  studentName,
  setStart,
  setInCall,
  useClient,
  ready
}) => {
  const paginateBy = 3
  const [ videosDisplayed, setVideosDisplayed] = useState([0,3])
  const [ pageCount, setPageCount ] = useState(1)

  useEffect(() => {
    setPageCount(Math.ceil(users.length / paginateBy))
  }, [users])


  const videosMapper =()=> {
    if(users.length === 0) return 
    const mappedVideos = []
    for(let i = videosDisplayed[0]; i < videosDisplayed[1]; i++){
        if(i >= users.length) break
        const userVid = users[i]
        if (userVid.videoTrack) {
          mappedVideos.push(
            <AgoraVideoPlayer style={vidStyles }className='vid' videoTrack={userVid.videoTrack} key={userVid.uid}><NameLabel>{userVid.uid}</NameLabel></AgoraVideoPlayer>
          );
        } else{
           mappedVideos.push( <div key={userVid.uid} style={vidStyles} className='vid'><NameLabel>{userVid.uid}</NameLabel>No Video</div>);
          }
      }
return mappedVideos
}

const changeVideos= (pageNum ) => {
  const bottomLimit = (pageNum-1 )* paginateBy
  const upperLimit = users.length < pageNum * paginateBy ? users.length : pageNum * paginateBy 
  setVideosDisplayed([bottomLimit, upperLimit])
}


  const firstRenderRef = useRef(true)
  //mutes user video and audio before entering the room
  if(firstRenderRef.current){
    tracks[0].setEnabled(false);
    tracks[1].setEnabled(false);
    firstRenderRef.current = false
  }
  
  return (
      <VideosDiv>
        <UserVideoDiv>
        <AgoraVideoPlayer style={vidStyles}className='vid' videoTrack={tracks[1]}>
          <NameLabel>
            {studentName}
          </NameLabel> 
      </AgoraVideoPlayer>
        {ready && tracks && (
          <Controls tracks={tracks} setStart={setStart} setInCall={setInCall} useClient={useClient}  />
          )}
        </UserVideoDiv>
         {users.length > 0 && <Pagination count={pageCount} onChange={(e, pageNum) => changeVideos(pageNum)}/>}

        {/* {users.length > 0 &&
          users.map((user) => {
            if (user.videoTrack) {
              return (
                <AgoraVideoPlayer style={vidStyles }className='vid' videoTrack={user.videoTrack} key={user.uid}><NameLabel>{user.uid}</NameLabel></AgoraVideoPlayer>
              );
            } else{
               return <div key={user.uid} style={vidStyles} className='vid'><NameLabel>{user.uid}</NameLabel>No Video</div>;
              }
          })} */}
          {videosMapper()}
     </VideosDiv>
  );
};

export default Videos