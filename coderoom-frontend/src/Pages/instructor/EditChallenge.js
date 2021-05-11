import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import {
  Button,
  Snackbar,
  IconButton,
  makeStyles,
  MenuItem,
  TextField,
} from "@material-ui/core";
import { KeyboardReturn, ArrowBackRounded, Delete } from "@material-ui/icons";
import {
  fetchDetail,
  patchToServer,
  postToServer,
} from "../../APIs/helperFunctions";
import { LanguageSelector, TeacherTextEdit } from "../../Components/_index";
import { DeleteChallengeModal } from "../../Components/Modals/DeleteChallengeModal";

//dark 1c1c1c, med 2d2d2d, light 424242
const boxShadow = css`
  -webkit-box-shadow: 0px 0px 16px 3px rgba(0, 0, 0, 0.25);
  box-shadow: 0px 0px 16px 3px rgba(0, 0, 0, 0.25);
`;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  min-height: 100%;
  height: fit-content;
  display: grid;
  padding: 20px;
  row-gap: 20px;
  grid-template-columns: 10% 1fr 10%;
  grid-template-rows: auto auto;
  place-content: center;

  @media only screen and (max-width: 780px) {
    display: flex;
    border-radius: 0px;
    padding: 0px;
  }
`;

const BaseDivs = css`
  ${boxShadow}
  padding: 20px;
  border-radius: 6px;
  height: fit-content;
  grid-column: 2;
  background-color: ${(props) =>
    props.theme === "dark" ? "#2d2d2d" : "lightgrey"};
`;

const Upper = styled.div`
  ${BaseDivs}
  height: fit-content;
  display: grid;
  grid-template-rows: auto auto 1fr;
  grid-row-gap: 20px;
  div {
    width: 100%;
  }
  h1 {
    margin: 0 0 0.5rem 0;
    text-align: center;
  }
  @media only screen and (max-width: 780px) {
    border-radius: 0px;
    width: 100%;
  }
`;

const Lower = styled.div`
  ${BaseDivs}
  min-height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TitleRow = styled.div``;

const DescriptionRow = styled.div`
  padding: 2rem 0 2rem 0;
`;

const StarterCode = styled.div`
  border-radius: 6px;
`;

const StarterCodeInner = styled.div`
  height: fit-content;
  div {
    width: auto;
  }
`;

const ButtonWrapper = styled.div`
  width: 95%;
  display: flex;
  justify-content: space-between;
`;

const BackIconButton = styled(IconButton)`
  position: absolute;
  left: 25px;
  top: 80px;
  background-color: darkgrey;
  margin-bottom: 10px;
  z-index: 100;
  @media only screen and (max-width: 780px) {
    top: 5px;
    left:3px;
    padding: 2px;
  }
`;

const DeleteButton = styled(Button)`
  background-color: red;
  width: 20%;
`;

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const EditChallenge = (props) => {
  const classes = useStyles();
  const currTheme = props.theme.currentTheme;
  const [deleteWarning, setDeleteWarning] = useState(false);
  const [numLinks, setNumLinks] = useState(1);
  const [challenge, setChallenge] = useState({});
  const [open, setOpen] = useState(false);

  ////---------------------USE TO GRAB THE CODE AS TEXT FROM THE CODE EDITOR-------------////
  const getTextFromCodeEditor = () => {
    const lines = document.querySelectorAll(".CodeMirror-line ");
    let textFromCode = [];
    for (let line of lines) {
      textFromCode.push(line.innerText);
    }
    //filters out ''ZERO WIDTH SPACE' (U+200B)' that was appearing at the end of blank lines
    let filteredCode = textFromCode.filter((text) => {
      return /\S+/.test(text.replace(/\u200B/g, ""));
    });
    //joins code with a new line char
    const parsedCodeText = filteredCode.join("\n");
    console.log(parsedCodeText);
    return parsedCodeText;
  };

  useEffect(() => {
    // Pull the user's challenge data if the page is rendered for editing
    if (props.new !== true) {
      try {
        const challengeID = props.match.params.challengeID;
        fetchDetail("challenges", challengeID).then((res) => {
          setChallenge(res);
        });
      } catch (error) {
        console.error(error);
        return;
      }
    } else {
      // Try/Catch just in case there are errors with user loading
      let usr = "";
      try {
        usr = props.user.id;
      } catch (error) {
        console.log(error);
      }

      // default language to javascript so the IDE has a lenguage to render
      const chal = {
        title: "",
        description: "",
        starter_code: "",
        user: usr,
        language: "javascript",
      };
      setChallenge(chal);
    }
  }, [props]);

  // triggered after snackbar leaves the screen
  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (prop) => (event) => {
    setChallenge({ ...challenge, [prop]: event.target.value });
  };

  const handleCount = (e) => {
    setNumLinks(e.target.value);
  };

  const createLinks = (e) => {
    e.preventDefault();
    console.log(numLinks);
  };

  const mapOptions = () => {
    let nums = [];
    for (let i = 1; i < 13; i++) {
      nums.push(i);
    }
    return nums.map((team, idx) => (
      <MenuItem key={idx} value={team}>
        {team}
      </MenuItem>
    ));
  };

  const handleSave = () => {
    const code = getTextFromCodeEditor();
    const body = {
      ...challenge,
      starter_code: code,
    };

    if (props.new !== true) {
      // removing unneccessary items for patch request body
      delete body["submissions"];
      delete body["id"];

      patchToServer("challenges", challenge.id, body).then((res) => {
        props.history.push("/dashboard");
      });
    } else {
      postToServer("challenges", body).then((res) => {
        if (res.response.status > 199 && res.response.status < 301) {
          props.history.push("/dashboard");
        } else {
          setOpen(true);
        }
      });
    }
  };

  return (
    <>
      {deleteWarning && (
        <DeleteChallengeModal
          setDeleteWarning={setDeleteWarning}
          history={props.history}
          challenge={challenge}
        />
      )}
      <Wrapper>
        <BackIconButton
          aria-label="close"
          color="inherit"
          onClick={() => props.history.push("/dashboard")}
        >
          <ArrowBackRounded />
        </BackIconButton>

        <Upper theme={currTheme}>
          <TitleRow>
            <TextField
              variant="filled"
              label="Title"
              InputLabelProps={{ shrink: true }}
              color="secondary"
              value={challenge ? challenge.title : ""}
              onChange={handleChange("title")}
            />
          </TitleRow>
          <DescriptionRow>
            <TextField
              placeholder="Challenge Description"
              variant="filled"
              label="Description"
              color="secondary"
              InputLabelProps={{ shrink: true }}
              multiline
              rows={10}
              rowsMax={Infinity}
              value={challenge ? challenge.description : ""}
              onChange={handleChange("description")}
            />
          </DescriptionRow>

          <StarterCode>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <h1> Starter Code: </h1>
              <span>
                <LanguageSelector
                  language={challenge.language}
                  handleChange={handleChange}
                />
              </span>
            </div>
            <StarterCodeInner>
              <TeacherTextEdit
                language_name={challenge.language}
                theme={currTheme}
                code={challenge.starter_code}
                new={props.new}
              />
            </StarterCodeInner>
          </StarterCode>
          <ButtonWrapper>
            <Button
              variant="contained"
              color="secondary"
              style={{ width: "75%" }}
              type="submit"
              endIcon={<KeyboardReturn />}
              onClick={handleSave}
            >
              {" "}
              Save and Return
            </Button>
            <DeleteButton
              variant="contained"
              color="secondary"
              className={classes.button}
              startIcon={<Delete />}
              onClick={() => setDeleteWarning(true)}
            >
              Delete Challenge
            </DeleteButton>
          </ButtonWrapper>
        </Upper>
      </Wrapper>

      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={open}
        onClose={handleClose}
        autoHideDuration={5000}
        message="Please confirm all fields have been filled"
      />
    </>
  );
};

export { EditChallenge };
