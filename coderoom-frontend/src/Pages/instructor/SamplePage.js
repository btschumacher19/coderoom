import React from "react";
import styled, { css } from "styled-components";
import { Button, Typography, Icon } from "@material-ui/core";
import { postToServer } from "../../APIs/helperFunctions";

const boxShadow = css`
  -webkit-box-shadow: 0px 0px 16px 3px rgba(0, 0, 0, 0.25);
  box-shadow: 0px 0px 16px 3px rgba(0, 0, 0, 0.25);
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
  margin: 8px 0;
  overflow-y: scroll;
  color: ${(props) =>
    props.theme === "dark" ? "rgba(255, 255, 255, 0.7)" : "#000"};
`;
const ButtonsDiv = styled.div`
  position: relative;
  ${fullWidthBar};
  bottom: 0;
  border-radius: 0 0 6px 6px;
  padding: 8px;
`;
const DashboardWrapper = styled.div`
  width: 100%;
  min-height: 92vh;
  padding: 20px 20px 15px 20px;
  height: auto;
  display: grid;
  grid-column-gap: 30px;
  grid-template-columns: 300px 1fr 1fr;
  grid-template-rows: 50px 1fr 1fr 1fr;
  grid-row-gap: 20px;

  @media only screen and (max-width: 780px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
  }
`;
const ChallengesWrapper = styled.div`
  background-color: ${(props) =>
    props.theme === "dark" ? "#2d2d2d" : "lightgrey"};
  border-radius: 6px;
  grid-column: 1 / span 4;
  grid-row: 1 / span 5;
  max-height: 80vh;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${boxShadow};

  @media only screen and (max-width: 780px) {
    grid-column: 1;
    grid-row: 1;
  }
`;
const ChallengesHeader = styled.div`
  top: 0;
  height: 60px;
  width: 95%;
  margin-bottom: 20px;
  text-align: start;
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
const CardInner = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 83%;
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
const SampleButton = styled(Button)`
  margin: 1rem 0;
  position: relative;
  width: 100%;
`;
const Centered = styled.div`
  position: absolute;
  left: 50%;
  top: 95%;
  transform: translate(-50%, -50%);
  width: 60%;
  @media only screen and (max-height: 745px) {
    top: 95%;
    width: 65%;
    height: 5%;
  }
`;
const sampleChallenges = [
  {
    id: 1,
    title: "Roman to Integer",
    description:
      "Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M.\nFor example, 2 is written as II in Roman numeral, just two one's added together. 12 is written as XII, which is simply X + II. The number 27 is written as XXVII, which is XX + V + II.\nRoman numerals are usually written largest to smallest from left to right. However, the numeral for four is not IIII. Instead, the number four is written as IV. Because the one is before the five we subtract it making four. The same principle applies to the number nine, which is written as IX. There are six instances where subtraction is used:\n\nI can be placed before V (5) and X (10) to make 4 and 9.\nX can be placed before L (50) and C (100) to make 40 and 90.\nC can be placed before D (500) and M (1000) to make 400 and 900.\n\nGiven a roman numeral, convert it to an integer.\n\nInput: s='MCMXCIV'\nOutput: 1994\nExplanation: M = 1000, CM = 900, XC = 90 and IV = 4.\n\nHint: Think about the data structure that best represents conversions.",
    language: "python",
    starter_code: "def roman_to_int(s):\n\tpass",
  },
  {
    id: 2,
    title: "Valid Parentheses",
    description:
      "Given a string s containing just the characters '(' , ')' , '{' , '}' , '[' and ']' , determine if the input string is valid.\n\nAn input string is valid if:\n\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.\n\nExample 1:\n\tInput: s = '()'\n\tOutput: true\n\nExample 2:\n\tInput: s = '([)]'\n\tOutput: false\n\nInput consists of '( ) [ ] { }' ONLY.",
    language: "javascript",
    starter_code: "const isValid = (s) => {\n\n};",
  },
  {
    id: 3,
    title: "Valid Anagram",
    description:
      "Given two strings s and t, return true if t is an anagram of s, and false otherwise.\n\nExample 1:\n\tInput: s = 'anagram', t = 'nagaram'\n\tOutput: true\n\nExample 2:\n\tInput: s= 'rat', t = 'car'\n\tOutput: false\n\n's' and 't' consist of lowercase English letter ONLY",
    language: "c",
    starter_code: "bool isAnagram(char * s, char * t) {\n\n}",
  },
];

const SamplePage = ({ theme, user, history }) => {
  const currTheme = theme.currentTheme;

  const challengeMapper = () => {
    return sampleChallenges.map((challenge) => {
      return (
        <Card key={challenge.id} theme={currTheme}>
          <CardInner>
            <CardHeader theme={currTheme}>
              <Typography variant="h5">{challenge.title}</Typography>
              <Typography
                color="secondary"
                style={{ textTransform: "capitalize" }}
              >
                {challenge.language === "javascript"
                  ? "JavaScript"
                  : challenge.language}
              </Typography>
            </CardHeader>
            <DateDiv vcolor="textSecondary" theme={currTheme}>
              {challenge.description}
            </DateDiv>
          </CardInner>
          <ButtonsDiv theme={currTheme}>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => addChallenge(challenge)}
              endIcon={<Icon className="fa fa-plus-circle" color="primary" />}
            >
              Add to My Challenges
            </Button>
          </ButtonsDiv>
        </Card>
      );
    });
  };

  const addChallenge = (challenge) => {
    try {
      postToServer("challenges", {
        title: challenge.title,
        description: challenge.description,
        language: challenge.language,
        starter_code: challenge.starter_code,
        user: user.id,
      });
      history.push("/dashboard");
    } catch (err) {
      console.error(
        "There was an issue adding the challenge to your list: ",
        err
      );
    }
  };
  return (
    <>
      <DashboardWrapper>
        <ChallengesWrapper theme={currTheme}>
          <ChallengesHeader theme={currTheme}>
            <h1>Sample Challenges</h1>
          </ChallengesHeader>
          <CardWrapper>
            {sampleChallenges ? challengeMapper() : "No sample challenge!"}
          </CardWrapper>
        </ChallengesWrapper>
        <Centered>
          <SampleButton
            color="primary"
            variant="contained"
            onClick={() => history.push("/dashboard")}
          >
            Back To My Challenges
          </SampleButton>
        </Centered>
      </DashboardWrapper>
    </>
  );
};

export { SamplePage };
