// import  {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Modal, Backdrop, Fade } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  userInput: {
    margin: '5px'
  }
}));

export default function SubmitChallengeModal({submitToInstructor, setSubmitWarning, setChallengeSubmitted}) {
  const classes = useStyles();


  const handleClose = () => {
    setSubmitWarning(false)
  };

  const setUserSubmission = async (e) => {
    e.preventDefault()
    localStorage.removeItem('studentID');
    const response = await submitToInstructor()
    console.log(response)
    if(response.ok){
    setChallengeSubmitted(true)
    }
  }

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Submit Challenge?</h2>

            <div>This challenge will no longer be accessible after submission.</div>

            <Button style={{width: '20%', margin: "2em 1em 1em 1em"}}  color="primary" variant="outlined" onClick={(e) => setUserSubmission(e)}>Submit</Button>
            <Button style={{width: '20%', margin: "2em 1em 1em 1em"}}  color="secondary" variant="outlined" onClick={(e) => handleClose(e)}>Cancel</Button>

          </div>
        </Fade>
      </Modal>
    </div>
  );
}


export { SubmitChallengeModal}