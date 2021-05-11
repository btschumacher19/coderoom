import { deleteFromServer } from "../../APIs/helperFunctions";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Modal, Backdrop, Fade } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  userInput: {
    margin: "5px",
  },
}));

export default function DeleteChallengeModal({
  challenge,
  setDeleteWarning,
  history,
}) {
  const classes = useStyles();

  const handleClose = () => {
    setDeleteWarning(false);
  };

  const deleteChallenge = async (e) => {
    e.preventDefault();
    deleteFromServer("challenges", challenge.id);
    history.push("/dashboard");
  };

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
            <h2 id="transition-modal-title">Delete Challenge?</h2>

            <div>
              This challenge will no longer be available and all submissions
              will be permanently deleted
            </div>

            <Button
              style={{
                width: "20%",
                margin: "2em 1em 1em 1em",
                backgroundColor: "red",
              }}
              variant="outlined"
              onClick={(e) => deleteChallenge(e)}
            >
              Delete
            </Button>
            <Button
              style={{ width: "20%", margin: "2em 1em 1em 1em" }}
              color="secondary"
              variant="outlined"
              onClick={(e) => handleClose(e)}
            >
              Cancel
            </Button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export { DeleteChallengeModal };
