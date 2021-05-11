import { useState } from "react";
import { Typography } from "@material-ui/core";
import CodeRoundedIcon from "@material-ui/icons/CodeRounded";
import ThumbUpAltRoundedIcon  from "@material-ui/icons/ThumbUpAltRounded";
import { 
  UpperProfile,
  StyledAvatar,
  UserInfo, Stats,
  ProfileButton,
} from "../styledComponents"
import { EditProfile } from "../UserDashboard/EditProfile"

const Profile = ({ currTheme, user, challenges, clearUserData, history, handleUpdateUser, openSnackbar}) => {
  const [profileEdit, setProfileEdit] = useState(false);

  const handleEditProfileClick =( e )=> {
    e.preventDefault()
    setProfileEdit(true)
  }
   const handleSave = () =>{
    setProfileEdit(false)
   }

  return (
    <div>
      <UpperProfile>
        <StyledAvatar
          src=""
          alt=""
          theme={ currTheme }>

        </StyledAvatar>
        <UserInfo theme={currTheme}>
          <h1>
            {" "}
            {user.first_name} {user.last_name}
          </h1>
          <Typography color="textSecondary">
            Username: {user.username}
          </Typography>
          <Stats>
            <span>
              <CodeRoundedIcon />
              <p>{challenges.length} challenges</p>
          </span>
          <span>
              <ThumbUpAltRoundedIcon style={{fontSize: "15px"}}/>
              <p>{user.likes ? user.likes : 0} likes</p>
          </span>
      </Stats>
      
      </UserInfo>
      </UpperProfile>
      {
        profileEdit
        ?
        <EditProfile user={user} clearUserData={clearUserData} handleSave={handleSave} history={history} handleUpdateUser={handleUpdateUser} openSnackbar={openSnackbar}/>
        :
        <ProfileButton color="primary" variant="outlined" onClick={ handleEditProfileClick }> Edit Profile </ProfileButton>
      }
    </div>
    
  
  )

}

export { Profile }