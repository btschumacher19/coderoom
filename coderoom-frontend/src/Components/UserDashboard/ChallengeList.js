import {
  Typography,
  IconButton,
} from "@material-ui/core";
import {
  Card,
  CardInner,
  DateDiv,
  ButtonsDiv,
  CardHeader,
} from '../../Components/styledComponents'
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import CodeRoundedIcon from "@material-ui/icons/CodeRounded";

const ChallengeList = ({ challenges, currTheme, filter, history }) => {


  const handleSubClick =( e )=> {
    history.push(`/challenge/${e}/submissions`)
  }

  const handleEdit =( e )=> {
      history.push(`/challenge/${e}/edit`)
  }

  const challengeMapper =()=> {
      return challenges.map((challenge, id) => {
        let showChallenge = true
        if (filter){
          let idx = challenge.title.toLowerCase().search(filter.toLowerCase())
          showChallenge = idx >= 0
        }
        if(showChallenge){
          return (
            <Card key={ id } theme={ currTheme } >
              <CardInner>
                <CardHeader theme={ currTheme }>
                  <Typography variant="h5">
                      { challenge.title }
                  </Typography>
                  <Typography color="secondary"style={{textTransform: "capitalize"}} >
                    {challenge.language === 'javascript' ? "JavaScript" : challenge.language}
                  </Typography>
                </CardHeader>
                <DateDiv vcolor="textSecondary" theme={ currTheme }>
                  { challenge.description }
                </DateDiv>

              </CardInner>
              <ButtonsDiv theme={ currTheme }>
                <IconButton color="primary" name="submissions" onClick={()=> handleSubClick(challenge.id) }>
                  <CodeRoundedIcon />
                </IconButton>
                <IconButton name="edit" onClick={()=> handleEdit(challenge.id) }>
                  <EditRoundedIcon  />
                </IconButton>
              </ButtonsDiv>
            </Card>
          )
        } else {
          return ""
        } 
      })
  }

  return (
    <>
      {challengeMapper()}
    </>
  )
}

export { ChallengeList }