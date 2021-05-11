import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import {v4 as uuidV4} from 'uuid'
import { Button, FormControl, InputLabel, MenuItem, makeStyles, Select, IconButton, Snackbar } from '@material-ui/core';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import CloseIcon from '@material-ui/icons/Close';
import { Pagination } from '@material-ui/lab';





import { fetchDetail } from "../../APIs/helperFunctions";

const FRONT_BASE_URL = process.env.REACT_APP_FRONT_BASE_URL
const API_KEY_FB = process.env.REACT_APP_FIREBASE_API_KEY
const URL_FB = process.env.REACT_APP_FIREBASE_RTDB_URL

const config = {
    apiKey: API_KEY_FB,
    databaseURL: URL_FB,
  };

const boxShadow = css`
  -webkit-box-shadow: 0px 0px 16px 3px rgba(0, 0, 0, 0.25);
  box-shadow: 0px 0px 16px 3px rgba(0, 0, 0, 0.25);
  border-radius: 6px;
`;

const flexCenter = css`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const PageWrapper = styled.div`
    width: 100%;
    min-height: 100vh;
    padding: 20px 20px 15px 20px;
    height: fit-content;
    display: grid;
    grid-column-gap: 30px;
    grid-template-columns: auto 1fr;
    grid-template-rows: 20px 1fr 1fr 1fr 20px;
    grid-row-gap: 20px;

    @media only screen and (max-width: 1080px) {
        grid-template-columns: 1fr;
        grid-template-rows: auto 1fr;
    }
`;

const ChallengeOverviewWrapper = styled.div`
    position: relative;
    max-width: 450px;
    background-color: ${(props) =>
    props.theme === "dark" ? "#2d2d2d" : "lightgrey"};
    grid-column: 1;
    grid-row-start: 2;
    grid-row-end: 5;
    display: flex;
    flex-direction: column;
    text-align: center;
    ${boxShadow};
  h1 {
    margin: 10px auto 0 auto;
  }
  p {
    margin: 0 auto 10px auto;
  }
  @media only screen and (max-width: 1080px) {
        max-width: none;
        grid-column: 1;
        grid-row: 1;
    }

`;

const SubmissionsWrapper = styled.div`
    position: relative;
    background-color: ${(props) =>
    props.theme === "dark" ? "#2d2d2d" : "lightgrey"};
    grid-column: 2;
    grid-row-start: 2;
    grid-row-end: 6;
    ${boxShadow};
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    text-align: center;
    width: 100%;

    @media only screen and (max-width: 1080px) {
        grid-column: 1;
        grid-row: 2;
    }
`;

const SubmissionsCard = styled.div`
    position: relative;
    min-height: 200px;
    height: fit-content;
    width: 90%;
    margin: 20px;
    ${ boxShadow }
    background: ${(props) =>
    props.theme === "dark"
      ? "linear-gradient(90deg, rgba(56,56,56,1) 0%, rgba(66,66,66,1) 100%);"
      : "#ffff"};

      display: grid;
      grid-template-columns: 25% 1fr 12px;
      grid-template-rows: 1fr;
      padding: 12px;
      text-align: left;

      @media only screen and (max-width: 680px) {
        display: flex;
        flex-direction: column;
    }
`;

const CardFirst = styled.div`
    display: grid;
    grid-column: 1;
    grid-row: 1;
    grid-template-rows: 1fr 1fr;
        
    h2 {
        margin-bottom: 0;
    }

    p {
        color: lightgrey;

    }

    span {
        white-space: nowrap;
        border-bottom: solid 1px ${(props) =>  props.theme === "dark"
        ? "#000"
        : "#ffff"};
        display: flex;
        flex-direction: column;
        justify-content: flex-end;

    }

`;

const CardSecond = styled.div`
    background-color:  ${(props) =>  props.theme === "dark"
        ? "#1c1c1c"
        : "lightgrey"};
    grid-column: 2;
    grid-row: 1;
    border-radius: 6px;
    padding: 12px;

`;

const CardThird= styled.div`
    grid-column: 3;
    grid-row: 1;

`;

const fullWidthBar = css`
    position: relative;
  border-top: solid 1px #272838;
  background-color: ${(props) =>
    props.theme === "dark" ? "#424242" : "#e0e0e0"};
  left: 0;
  ${flexCenter}
`;

const Header = styled.div`
    ${fullWidthBar}
    border-radius: 6px 6px  0 0 ;
    padding: 8px;
    justify-content: space-around;

    h1 {
        margin: 8px auto 8px auto;
    }

    span {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 17px;
        color: lightgrey;
    }
    div {
        width: 100%;
    }
`;

const Description = styled.div`
    margin: 80px 20px 80px 20px;
    font-size: large;
    text-align: left;
    line-height: 25px;
`;

const LinkCreationWrapper = styled.div`
    padding: 20px;
    min-height: fit-content;
`;

const InputWrapper = styled.div`
    width: 100%;
    min-height: 70px;
    display: flex;
    align-items: center;
    justify-content: space-around;

`;

const CustomSnackbar = styled(Snackbar)`
  border-radius: 6px;

  div {
    border-radius: 6px;
  }
`;

const LinkDiv = styled.div`
    margin-bottom: 15px;
    border-bottom: solid 1px 
    ${(props) => (props.theme === "dark" ? "#1c1c1c" : "#fff")};;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const BackIconButton = styled(IconButton)`
   width: 40px;
   height: 40px;
   position: relative;
    background-color: darkgrey;
    margin: 10px;

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

const Submissions =( props )=> {
    let paginateBy = 10
    const [ numLinks, setNumLinks ] = useState(1)
    const [ linkList, setLinkList ] = useState([])
    const [ showLinks, setShowLinks ] = useState(false)
    const [ challenge, setChallenge ] = useState({})
    const [ isOpen, setOpen] = useState(false);
    const [ challengesDisplayed, setChallengesDisplayed] = useState([0,9])
    const [ pageCount, setPageCount ] = useState(1)
    const [ currentPage, setCurrentPage ] = useState(1)


    const classes = useStyles();
    const currTheme = props.theme.currentTheme


    const createLinks =( e )=> {
        e.preventDefault()
        const db = window.firebase.database()
        const generatedLinks = []

        for(let i = 0; i < numLinks; i++){
            const roomNumber = uuidV4()
            const linkPath = `${FRONT_BASE_URL}challenges/${props.match.params.challengeID}#${roomNumber}`
            const dbRef = db.ref(roomNumber)
            dbRef.update({locked: false});
            dbRef.update({challenge: props.match.params.challengeID})
            generatedLinks.push(linkPath)
        }
        setLinkList(generatedLinks)
        setShowLinks(true)
    }

    const handleSnackbarClose =()=> {
        setOpen( false );
    }

    const handleCopy = ( link )=> {
       navigator.clipboard.writeText(link);
       setOpen( true )
    }

    const displayLinks = () => {

        return linkList.map((link, i) => {
            return (
                <>
            <p>Link Number {i+1}</p>
            <LinkDiv key={i} theme={ currTheme }>
                < h2>{link} </h2>
            <IconButton onClick={() => handleCopy( link ) } color="secondary" >
                < FileCopyIcon />
            </IconButton>
            </LinkDiv>
            </>
            )
        })
    }

    const mapOptions =()=> {
        let nums=[]
        for (let i = 1; i < 13; i++) {
            nums.push(i)
        }
        return (
            nums.map((team, idx) => 
                    <MenuItem  key={idx} value={team}>{ team }</MenuItem>
        ))
    }

    const handleCount =( e )=> {
        setNumLinks(e.target.value)
    }

    const getDateAsString =( day )=> {
        const d = day
        const formattedDate = new Date(d).toDateString()
        return formattedDate
    }

    const getTime =( day )=> {
        var d = new Date( day );
        var n = d.toLocaleTimeString();
        return n;
    }




    const submissionsMapper =()=> {
            const mappedSubmissions = []
            let subs = challenge.submissions
            for(let i = challengesDisplayed[0]; i < challengesDisplayed[1]; i++){
                if(i >= challenge.submissions.length) break
                mappedSubmissions.push(
                    < SubmissionsCard theme={ currTheme } key={ `submission-${i}` }>
                        <CardFirst theme={ currTheme }>
                            <span >
                                <h2> Submitted By: </h2>
                            </span>
                            <ul style={{textAlign: "left"}}> 
                                { subs[i].student_names.map((name, id) => 
                                    <li ><h4 key={ id } > { name } </h4></li>
                                )}
                            </ul>
                            <p>Submitted: { getDateAsString( subs[i].date_submitted ) }&nbsp;at&nbsp;
                            { getTime(subs[i].date_submitted) } </p>
                        </CardFirst>

                        <CardSecond theme={ currTheme }>
                        <pre>
                            <code style={{color: "#149414"}}>
                                { subs[i].solution }
                            </code>
                         </pre>
                        </CardSecond>
                        <CardThird />

                    </SubmissionsCard>
                )}

        return mappedSubmissions
    }

    const changeSubmissions = (pageNum ) => {
        const bottomLimit = (pageNum-1 )* paginateBy
        const upperLimit = challenge.submissions.length < pageNum * paginateBy ? challenge.submissions.length : pageNum * paginateBy 
        setCurrentPage(pageNum)
        setChallengesDisplayed([bottomLimit, upperLimit])
    }




    useEffect(() => {
        window.firebase.initializeApp(config);
        return () => window.firebase.app("[DEFAULT]").delete()
    }, [])

    useEffect(() => {
        try {
            const challengeID = props.match.params.challengeID
            fetchDetail( "challenges", challengeID )
            .then( (res) => {
                setChallenge( res )
            })
            } catch( error ) {
                console.error(error)
                return
            } 
    }, [ props ])

    useEffect(() => {
        setPageCount(Math.ceil(challenge?.submissions?.length / paginateBy))
        
        challenge?.submissions?.reverse()
    }, [challenge ])


    return (
        <>
        <PageWrapper>
            < ChallengeOverviewWrapper theme={ currTheme }>
                <Header theme={ currTheme }>
            <BackIconButton
                  aria-label="close"
                  color="inherit"
                  onClick={() => props.history.push("/dashboard")}
                >
                  <ArrowBackRoundedIcon />
        </BackIconButton>
                    <div><h1>{ challenge.title }</h1> </div>
                    <span style={{textTransform: "capitalize"}}>{challenge.language === 'javascript' ? "JavaScript" : challenge.language}</span>
                </Header>
                <Description>
                    <p>{ challenge.description }</p>
                </Description>

                    <LinkCreationWrapper>
                    <h2 style={{marginBottom: "0"}}>Create Sessions:</h2>
                        <InputWrapper>

                            <FormControl className={classes.formControl}>
                                <InputLabel id="select-label">Number of Sessions</InputLabel>
                                    <Select
                                    labelId="select-label"
                                    id="session-select"
                                    required={ true }
                                    value={ numLinks }
                                    onChange={ handleCount }
                                    >
                                    { mapOptions() }
                                    </Select>
                            </FormControl>

                            <Button 
                                variant="contained"
                                color="primary"
                                type="submit"
                                className={classes.formControl} 
                                onClick={ createLinks }> 
                                CREATE 
                            </Button>

                </InputWrapper>

                {showLinks && displayLinks()}

            </LinkCreationWrapper>
            </ChallengeOverviewWrapper >
            <SubmissionsWrapper theme={ currTheme }>
             { challenge.submissions?.length > 0 && <Pagination count={pageCount} page={currentPage} onChange={(e, pageNum) => changeSubmissions(pageNum)}/>}

                { challenge.submissions ? submissionsMapper() : <h2>Submissions for this challenge will appear here.</h2>}
                
                { challenge.submissions?.length > 0 && <Pagination count={pageCount} page={currentPage} onChange={(e, pageNum) => changeSubmissions(pageNum)}/>}
            </SubmissionsWrapper>
        </PageWrapper>        

        <CustomSnackbar         
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'center'
                }}
                open={ isOpen }
                onClose={ handleSnackbarClose }
                autoHideDuration={1000}
                message="Link Copied!"
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

export { Submissions }