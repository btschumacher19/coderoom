import { useState } from "react";
import styled, { css } from "styled-components";
import {
  Button,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
} from "@material-ui/core";
import { AccountCircle, Visibility, VisibilityOff } from "@material-ui/icons";
import { loginAPI, signupUser } from "../../APIs/login";
import logo from "../../Data/logo.png"

const LandingWrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  @media only screen and (max-width: 700px) {
    width: 100%;
    height: 100vh;
    flex-direction: column;
    margin: 0px;
   }

`;

const LoginWrapper = styled.div`
display:flex;
width: 50%;
height: 600px;
margin: auto;

@media only screen and (max-width: 1024px) {
 width: 75%;
}

@media only screen and (max-width: 700px) {
  width: 100%;
   height: 100vh;
  min-height: fit-content;
  flex-direction: column;
  margin: 0px;

 }
`

const Banner = styled.div`
width: 50%;

min-width: 240px;
height: 100%;
text-align: center;
-webkit-box-shadow: 0px 0px 16px 3px rgba(0, 0, 0, 0.25);
box-shadow: 0px 0px 16px 3px rgba(0, 0, 0, 0.25);
background-color: #989fce;
display: flex;
align-items: center;
justify-content:center;
border-top-left-radius: 6px;
border-bottom-left-radius: 6px;


  @media only screen and (max-width: 700px) {
    width: 100%;
    height: fit-content;
   }

`;

const Logo = styled.img`
  position: relative;
  height: auto;
  width: 100%;

  @media only screen and (max-width: 700px) {
    width: 200px;
    height: auto;
    min-height: fit-content;
  
   }
`;

const LoginBox = styled.div`
  position: relative;
  width: 50%;
  height: 100%;
  background-color: ${(props) => (props.theme === "dark" ? "#2d2d2d" : "#fff")};
  -webkit-box-shadow: 0px 0px 16px 1px rgba(0, 0, 0, 0.25);
  box-shadow: 0px 0px 16px 1px rgba(0, 0, 0, 0.25);
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media only screen and (max-width: 700px) {
    width: 100%;
    min-height: fit-content;
    padding-top: 70px;
   }
`;

const fullWidthBar = css`
  background-color: ${(props) =>
    props.theme === "dark" ? "#383838" : "lightgrey"};
  width: 100%;
  height: 70px;
  position: absolute;
  left: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

const SigninDiv = styled.div`
  ${fullWidthBar};
  top: 0;
  border-radius: 6px 6px 0 0;
`;

const SignupDiv = styled.div`
  ${fullWidthBar};
  bottom: 0;
  border-radius: 0 0 6px 6px;
  h4 {
    font-size: 19px;
    font-weight: 400;
  }
`;

const MarginedTextField = styled(TextField)`
  margin-top: 8px;
  width: 80%;
`;

const Landing = ({ theme, history, handleLogin }) => {
  const [errorState, setErrorState] = useState(false);

  const [signupOrIn, setSignupOrIn] = useState("signin");

  const [values, setValues] = useState({
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    email: "",
    showPassword: false,
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

  const submitLogin = (e) => {
    e.preventDefault();
    const data = {
      username: values.username,
      password: values.password,
    };
    loginAPI(data).then((res) => {
      if (res.status > 199 && res.status < 300) {
        let userObj = JSON.stringify(res.data.user);
        localStorage.setItem("user", userObj);
        localStorage.setItem("token", res.data.token);
        handleLogin(userObj);
        history.push("/dashboard");
        window.location.reload();
      } else {
        setErrorState(true);
      }
    });
  };

  const register = (e) => {
    e.preventDefault();
    const userData = {
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
      username: values.username,
      password: values.password,
    };
    // Handle required fields (MaterialUI won't by default)
    if (
      !userData.first_name ||
      !userData.last_name ||
      !userData.email ||
      !userData.username ||
      !userData.password
    ) {
      alert("Please fill out all required fields");
      return;
    }
    signupUser(userData).then((res) => {
      if (res.status > 199 && res.status < 300) {
        setValues({ ...values, password: "" });
        setSignupOrIn("signin");
      } else console.log(res);
      setErrorState(true);
    });
  };

  // Default Landing Page
  if (signupOrIn === "signin") {
    return (
      <LandingWrapper id="wrapper" class="wrap">
        <LoginWrapper>
        <Banner theme={theme.currentTheme}>
          <Logo src={logo} alt="logo" />
        </Banner>
        <LoginBox theme={theme.currentTheme}>
          <SigninDiv theme={theme.currentTheme}>
            <h1>Sign In</h1>
          </SigninDiv>

          <MarginedTextField
            error={errorState}
            helperText={
              errorState
                ? "Plese verify your username and password."
                : undefined
            }
            id="username"
            label="username"
            color="primary"
            // variant="outlined"
            value={values.username}
            style={{ width: "80%", padding: '.5em', marginTop: '15px'}}
            onChange={handleChange("username")}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" >
                  <AccountCircle/>
                </InputAdornment>
              ),
            }}
          />

          <FormControl
            style={{ width: "80%"}}
            error={errorState}
          >
            <InputLabel htmlFor="standard-adornment-password">
              Password
            </InputLabel>
            <Input
              id="password"
              type={values.showPassword ? "text" : "password"}
              value={values.password}
              onChange={handleChange("password")}
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

          <Button
            style={{ width: "80%", marginTop: "60px" }}
            color="secondary"
            variant="contained"
            onClick={submitLogin}
          >
            {" "}
            login{" "}
          </Button>

          <SignupDiv theme={theme.currentTheme}>
            <h4>Need an account?</h4>
            <Button variant="outlined" onClick={() => setSignupOrIn("signup")} style={{
            minWidth: '80px'}}>
              {" "}
              sign up
            </Button>
          </SignupDiv>
        </LoginBox>
        </LoginWrapper>
      </LandingWrapper>
    );
  }

  // If user clicks the signup button
  if (signupOrIn === "signup") {
    return (
      <LandingWrapper id="wrapper" class="wrap">
        <LoginWrapper>
        <Banner theme={theme.currentTheme}>
          <Logo src={logo} alt="logo"  />
        </Banner>
        <LoginBox
          theme={theme.currentTheme}
          style={{
            padding: '80px 10px',
          }}
        >
          <SigninDiv theme={theme.currentTheme}>
            <h1>Register</h1>
          </SigninDiv>
          <MarginedTextField
            id="first_name"
            label="First Name"
            required
            color="primary"
            value={values.first_name}
            onChange={handleChange("first_name")}
          />

          <MarginedTextField
            id="last_name"
            label="Last Name"
            required
            color="primary"
            value={values.last_name}
            onChange={handleChange("last_name")}
          />

          <MarginedTextField
            id="email"
            label="Email"
            required
            color="primary"
            value={values.email}
            onChange={handleChange("email")}
          />

          <MarginedTextField
            id="username"
            label="Username"
            required
            color="primary"
            value={values.username}
            onChange={handleChange("username")}
          />

          <FormControl
            style={{ width: "80%", marginTop: "15px" }}
            error={errorState}
          >
            <InputLabel htmlFor="standard-adornment-password">
              Password *
            </InputLabel>
            <Input
              id="password"
              required
              type={values.showPassword ? "text" : "password"}
              value={values.password}
              onChange={handleChange("password")}
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

          <Button
            style={{ width: "80%", marginTop: "60px" }}
            color="secondary"
            variant="contained"
            onClick={register}
          >
            Create Account
          </Button>
          <br />
          <SignupDiv theme={theme.currentTheme} style={{
            padding: '0px 10px',
          }}>
            <h4>Already have an account?</h4>
            <Button variant="outlined" onClick={() => setSignupOrIn("signin")} style={{
            minWidth: '80px',
          }}>
              {" "}
              sign in
            </Button>
          </SignupDiv>
        </LoginBox>
        </LoginWrapper>
      </LandingWrapper>
    );
  }
};

export { Landing };
