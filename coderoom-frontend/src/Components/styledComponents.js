import styled, { css } from "styled-components";
import {
  Button,
  Avatar,
  IconButton,
  Snackbar,
  TextField,
} from "@material-ui/core";


const boxShadow = css`
-webkit-box-shadow: 0px 0px 16px 3px rgba(0, 0, 0, 0.25);
box-shadow: 0px 0px 16px 3px rgba(0, 0, 0, 0.25);
`;

const DashboardWrapper = styled.div`
width: 100%;
min-height: 100vh;
padding: 20px 20px 15px 20px;
height: fit-content;
display: grid;
grid-column-gap: 30px;
grid-template-columns: 300px 1fr 1fr;
grid-template-rows: 50px 1fr 1fr 1fr;
grid-row-gap: 20px;

@media only screen and (max-width: 780px) {
  grid-template-columns: 1fr;
  grid-template-rows: auto auto auto;
}
`;

const SearchWrapper = styled.div`
grid-column: 2 / span 4;
grid-row: 1;
border-radius: 10px;
height: fit-content;
min-width: fit-content;
${boxShadow};
@media only screen and (max-width: 780px) {
  grid-column: 1;
  grid-row: 2;
}
`;

const ProfileWrapper = styled.div`
background-color: ${(props) =>
  props.theme === "dark" ? "#2d2d2d" : "lightgrey"};
border-radius: 6px;
grid-column: 1;
grid-row-start: 2;
grid-row-end: 4;
padding: 30px 10px 30px 10px;
display: flex;
flex-direction: column;
justify-content: space-between;
align-items: center;
text-align: center;
${boxShadow};

h1 {
  margin: 10px auto 0 auto;
}
p {
  margin: 0 auto 10px auto;
}

@media only screen and (max-width: 780px) {
  grid-column: 1;
  grid-row: 1;
  height: fit-content;
}
`;

const StyledAvatar = styled(Avatar)`
height: 150px;
width: 150px;

border: solid 2px ${(props) => (props.theme === "dark" ? "#1c1c1c" : "#fff")};
${boxShadow};

`;

const UserInfo = styled.div`
position: relative;
margin-top: 20px;
border-top: solid 1px
  ${(props) => (props.theme === "dark" ? "#1c1c1c" : "#fff")};
width: 100%;
`;

const UpperProfile = styled.div`
width: 100%;
display: flex;
flex-direction: column;
align-items: center;
`;

const ChallengesWrapper = styled.div`
background-color: ${(props) =>
  props.theme === "dark" ? "#2d2d2d" : "lightgrey"};
border-radius: 6px;
grid-column: 2 / span 4;
grid-row: 2 / span 5;
min-height: fit-content;
display: flex;
flex-direction: column;
align-items: center;
${boxShadow};

@media only screen and (max-width: 780px) {
  grid-column: 1;
  grid-row: 3;
}
`;

const ChallengesHeader = styled.div`
top: 0;
height: 60px;
width: 85%;
margin-bottom: 20px;
text-align: end;
border-bottom: solid 1px
  ${(props) => (props.theme === "dark" ? "#1c1c1c" : "#fff")};
`;

const Card = styled.div`
position: relative;
height: 225px;
min-width: 300px;
border-radius: 6px;
background: ${(props) =>
  props.theme === "dark"
    ? "linear-gradient(90deg, rgba(56,56,56,1) 0%, rgba(66,66,66,1) 100%);"
    : "#ffff"};
${boxShadow};
`;

const CardWrapper = styled.div`
position: relative;
width: 100%;
height: 100%;
padding: 20px;
display: grid;
grid-gap: 20px;
grid-template-columns: 1fr 1fr 1fr;
grid-template-rows: max-content;
@media only screen and (max-width: 1360px) {
  grid-template-columns: 1fr 1fr;
}
@media only screen and (max-width: 1030px) {
  grid-template-columns: 1fr;
}
`;

const CardInner = styled.div`
position: relative;
width: 100%;
display: flex;
flex-direction: column;
align-items: center;
padding: 8px;
height: 83%;
`;

const fullWidthBar = css`
border-top: solid 1px #272838;
background-color: ${(props) =>
  props.theme === "dark" ? "#424242" : "lightgrey"};
width: 100%;
height: 50px;
left: 0;
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-around;
`;

const DateDiv = styled.div`
width: 90%;
text-align: left;
margin: 8px 0 8px 0;
overflow-y: scroll;
color: ${(props) =>
  props.theme === "dark" ? "rgba(255, 255, 255, 0.7)" : "#000"};
`;

const ButtonsDiv = styled.div`
position: absolute;
${fullWidthBar};
bottom: 0;
border-radius: 0 0 6px 6px;
padding: 8px;
`;

const CardHeader = styled.div`
width: 90%;
margin-bottom: 6px;
border-bottom: solid 1px
  ${(props) => (props.theme === "dark" ? "#1c1c1c" : "lightgrey")};
display: flex;
align-items: center;
justify-content: space-between;
`;

const Stats = styled.div`
height: 22px;
display: flex;
justify-content: center;

span {
  margin: 0.5rem 0.5rem 1rem 0.5rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 15px;

  p {
    padding: 0 0 0 0.5rem;
    margin: 0;
  }
}
`;

const ProfileTextField = styled(TextField)`
width: 80%;
margin-bottom: 1rem;
`;

const BackButtonDiv = styled.div`
width: 100%;
display: flex;
justify-content: flex-start;
margin-bottom: 0;
`;

const ProfileButton = styled(Button)`
width: 90%;
margin-top: 20px;
`;

const ProfileIconButton = styled(IconButton)`
position: relative;
margin: 8px;
transform: scale(1.1);
`;

const CustomSnackbar = styled(Snackbar)`
background-color: lightgreen;
border-radius: 6px;

div {
  background-color: lightgreen;
  border-radius: 6px;
}
`;
const SampleButton = styled(Button)`
width: 35%;
margin: 1rem 0;
`;

export {
boxShadow,
DashboardWrapper,
SearchWrapper,
ProfileWrapper,
StyledAvatar,
UserInfo,
UpperProfile,
ChallengesWrapper,
ChallengesHeader,
Card,
CardWrapper,
CardInner,
fullWidthBar,
DateDiv,
ButtonsDiv,
CardHeader,
Stats,
ProfileTextField,
BackButtonDiv,
ProfileButton,
ProfileIconButton,
CustomSnackbar,
SampleButton,
}