import React, { useState } from "react";
import { Link } from "@material-ui/core";
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import { patchToServer } from "../../APIs/helperFunctions";
import { 
  UpperProfile,
  UserInfo,
  ProfileButton,
  ProfileTextField,
  BackButtonDiv,
  ProfileIconButton,
  CustomSnackbar,
} from "../styledComponents"
import CloseIcon from '@material-ui/icons/Close';
import { IconButton } from "@material-ui/core";
import { PasswordEdit } from "../UserDashboard/PasswordEdit"

const EditProfile = ({ currTheme, handleSave, user, history, clearUserData, handleUpdateUser, openSnackbar}) =>{
  const [ changePW, setChangePW ] = useState(false);
  const [ errorState, setErrorState] = useState(false);
  const [ values, setValues ] = useState({
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    old_pw: "",
    new_pw: "",
    confirm_pw: "",
  });

  const handleChangePW = ( e )=> {
    e.preventDefault()
    if(changePW){
      setChangePW(false)
    } else {
      setChangePW(true)
    }
  }

  const handleSaveClick =( e )=> {
    e.preventDefault()
    const userData = {
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
    };
    // Handle required fields (MaterialUI won't by default)
    if (
      !userData.first_name ||
      !userData.last_name ||
      !userData.email
    ) {
      alert("Please fill out all required fields");
      return;
    }
    patchToServer( "users", user.id, userData)
      .then((res) => {
        openSnackbar("Account Successfully Updated!")
        handleSave()
        handleUpdateUser()
      })
  }

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    setErrorState(false);
  };

  const closePWChange = () =>{
    setChangePW(false)
  }

  return (
    <>
      <UpperProfile>
        <UserInfo theme={currTheme}>
          <BackButtonDiv>
            <ProfileIconButton
              aria-label="close"
              color="inherit"
              onClick={handleSave}
            >
              <ArrowBackRoundedIcon />
            </ProfileIconButton>
          </BackButtonDiv>
          <ProfileTextField
            id="first_name"
            label="First Name"
            required
            color="primary"
            value={values.first_name}
            onChange={handleChange("first_name")}
          />

          <ProfileTextField
            id="last_name"
            label="Last Name"
            required
            color="primary"
            value={values.last_name}
            onChange={handleChange("last_name")}
          />

          <ProfileTextField
            id="email"
            label="Email"
            required
            color="primary"
            value={values.email}
            onChange={handleChange("email")}
          />

          <br/>
          <Link style={{cursor: "pointer"}} to="" onClick={handleChangePW}>{!changePW ? "Change Password" : "Close" }</Link>

          {
            changePW
            ?
            <PasswordEdit user={user} currTheme={currTheme} clearUserData={clearUserData} closePWChange={closePWChange} history={history}/>
            :
            ""
          }

        </UserInfo>
      </UpperProfile>
      <ProfileButton  color="primary" variant="outlined" onClick={ handleSaveClick }> Save </ProfileButton>
    </>
  )
}

export { EditProfile }