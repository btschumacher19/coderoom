import  {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField, Modal, Backdrop, Fade } from '@material-ui/core';

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

export default function StudentSignInModal({setStudentName}) {
  const classes = useStyles();
  const [open, setOpen] = useState(true);


  const handleClose = () => {
    setOpen(false);
  };

  const setUserInformation = (e) => {
    e.preventDefault()
    const studentID = `${e.target[0].value} ${e.target[1].value}`
    localStorage.setItem('studentID', studentID)
    setStudentName(studentID)
  }

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        disableBackdropClick
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Please Sign In</h2>
            <form className={classes.root}  autoComplete="off" onSubmit={(e) => setUserInformation(e)}>
            <TextField id="standard-basic" label="First Name" required className={classes.userInput}/>
            <TextField id="standard-basic" label="Last Name" required className={classes.userInput}/>
            <Button type="submit">Enter</Button>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}


export { StudentSignInModal}