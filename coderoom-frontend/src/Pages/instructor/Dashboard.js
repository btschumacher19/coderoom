import React, { useEffect, useState } from "react";
import { CustomizedInputBase } from "../../Components/_index";
import { IconButton } from "@material-ui/core";
import {
  ProfileWrapper,
  ChallengesWrapper,
  ChallengesHeader,
  CardWrapper,
  CustomSnackbar,
  SampleButton,
  DashboardWrapper,
  SearchWrapper,
} from '../../Components/styledComponents'
import CloseIcon from '@material-ui/icons/Close';
import fetchUserChallenges from "../../APIs/userChallenges";
import fetchUserData from "../../APIs/userData";
import { Profile } from "../../Components/UserDashboard/Profile";
import { ChallengeList } from "../../Components/UserDashboard/ChallengeList";


const Dashboard = ({ theme, history, clearUserData }) => {
  const [ challenges, setChallenges ] = useState([]);
  const [ user, setUser ] = useState({});
  const [ filter, setFilter ] = useState(null);
  const [ isOpen, setOpen ] = useState(false);
  const [ updateUser, setUpdateUser ] = useState(false)
  const [ snackMessage, setSnackMessage ] = useState("")


  const currTheme = theme.currentTheme;

  useEffect(() => {
    fetchUserChallenges().then((res) => {
      if (res.data) {
        setChallenges(res.data);
      }
    });
    fetchUserData().then((res) => {
      if (res.data) {
        setUser(res.data);
      }
    });
  }, [updateUser]);

  // triggered after snackbar leaves the screen
  const handleSnackbarClose =()=> {
      setOpen( false );
  }
  const openSnackbar =( message )=> {
    setSnackMessage( message )
    setOpen( true )
  }

  const handleSearch =( value )=> {
      setFilter(value)
  }

  const handleNew =()=> {
      history.push(`/challenge/new`)
  }

  const handleUpdateUser =()=>{
    if (updateUser){
      setUpdateUser(false)
    }else {
      setUpdateUser(true)
    }
    
  }

  return (
    <>
      <DashboardWrapper>
        <SearchWrapper >
          <CustomizedInputBase placeholder={"Search Challenges"} handleSearch={ handleSearch  } handleNew={ handleNew } />
        </SearchWrapper>

        <ProfileWrapper theme={ currTheme }>
          <Profile history={history} user={user} challenges={challenges} currTheme={currTheme} clearUserData={clearUserData} handleUpdateUser={handleUpdateUser} openSnackbar={openSnackbar}/>
        </ProfileWrapper>


        <ChallengesWrapper theme={ currTheme }>
          <ChallengesHeader theme={ currTheme }>
              <h1> Challenges </h1>
          </ChallengesHeader>
          <CardWrapper>
            { challenges
              ? 
              <ChallengeList challenges={challenges} currTheme={currTheme} filter={filter} history={history}/>
              : 
              "Create your first challenge!"}
          </CardWrapper>
          <SampleButton
            color="primary"
            variant="contained"
            onClick={() => history.push("/samples")}
          >
            View Sample Challenges
          </SampleButton>
        </ChallengesWrapper>
      </DashboardWrapper>

      <CustomSnackbar         
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        open={ isOpen }
        color="secondary"
        onClose={ handleSnackbarClose }
        autoHideDuration={10000}
        message={ snackMessage }
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={ handleSnackbarClose }>
            <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </>
  )
}

export { Dashboard }