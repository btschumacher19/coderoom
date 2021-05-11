import { useState } from "react";
import {
  FormControl,
  IconButton,
  InputAdornment,
  Input,
  InputLabel,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { changePassword } from "../../APIs/helperFunctions";
import { ProfileButton } from "../styledComponents"

const PasswordEdit = ({ user, clearUserData, closePWChange, history}) =>{
  const [errorState, setErrorState] = useState(false);
  const [values, setValues] = useState({
    old_pw: "",
    new_pw: "",
    confirm_pw: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    setErrorState(false);
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handlePWSave= ( e )=> {
    e.preventDefault()
    const pwObj = {
      old_password : values.old_pw,
      password: values.new_pw,
      password2: values.confirm_pw,
    }
    if (
      !pwObj.old_password ||
      !pwObj.password ||
      !pwObj.password2

    ){
      alert(" PASSWORD SAVE: Please fill out all required fields");
      return;
    }
    changePassword(pwObj, user.id)
    .then((res)=>{
      if (!res.response.ok) {
        let result = ""
        if(res.data.password){
          for(let i=0; i<res.data.password.length; i++){
            result += res.data.password[i] + "\n"
          }
        }
        if(res.data.old_password){
          result += "Your Current Password is incorrect!\n"
        }
        setErrorState(true);
        alert(result)
      } else {
        setErrorState(false);
        alert("Success! Your password has been changed")
        closePWChange()
        clearUserData()
        history.push("/")
      }
    })
  }

  return (
    <div>
      <FormControl
        style={{ width: "80%", marginTop: "15px" }}
        error={errorState}
      >
        <InputLabel htmlFor="standard-adornment-password">
          Current Password *
        </InputLabel>
        <Input
          id="old_pw"
          required
          type={values.showPassword ? "text" : "password"}
          onChange={handleChange("old_pw")}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {values.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>

      <FormControl
        style={{ width: "80%", marginTop: "15px" }}
        error={errorState}
      >
        <InputLabel htmlFor="standard-adornment-password">
          New Password *
        </InputLabel>
        <Input
          id="new_pd"
          required
          type={values.showPassword ? "text" : "password"}
          onChange={handleChange("new_pw")}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {values.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>

      <FormControl
        style={{ width: "80%", marginTop: "15px" }}
        error={errorState}
      >
        <InputLabel htmlFor="standard-adornment-password">
          Confirm Password *
        </InputLabel>
        <Input
          id="confirm_pw"
          required
          type={values.showPassword ? "text" : "password"}
          onChange={handleChange("confirm_pw")}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {values.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>

      <ProfileButton  color="primary" variant="outlined" onClick={ handlePWSave }> Change Password </ProfileButton>
    </div>
  )
}

export { PasswordEdit }