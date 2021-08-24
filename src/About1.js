import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import EmailIcon from '@material-ui/icons/Email';
import DeveloperBoardIcon from '@material-ui/icons/DeveloperBoard';


const useStyles = makeStyles((theme) => ({
    button: {
        border: '1px solid red',
        marginRight: '15px',
        transition: '0.7s',
        '&:hover': {
            color: 'black',
            backgroundColor: 'red'
        },
    },

    header: {
        borderBottom: '5px solid red',
        backgroundColor: "black",
        color: 'white'
    },
    text: {
        marginTop: '12px',
        color: 'rgb(80, 80, 80)'
    },
    icon: {
        marginTop: '12px'
    }
}));

export default function MaxWidthDialog() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Button className={classes.button} color="secondary" onClick={handleClickOpen}>
                About
            </Button>
            <Dialog
                fullWidth='true'
                maxWidth='xs'
                open={open}
                onClose={handleClose}
                aria-labelledby="max-width-dialog-title"
            >
                <DialogTitle className={classes.header} id="max-width-dialog-title"><h4>About us</h4></DialogTitle>
                <DialogContent>
                    <DialogContentText className={classes.text}>
                        <h4>Covid-19 Tracker Created with React</h4>
                        <h4><DeveloperBoardIcon className={classes.icon} />
                            By - <span style={{ color: 'red' }}>Onkar </span>Sawant &
                            <span style={{ color: 'red' }}> Pratik </span> Kadam</h4>
                        <br />
                        <h4><EmailIcon className={classes.icon} />
                            Email - <h4>onkarsawant87@gmail.com</h4>
                            <h4>pratikadam00@gmail.com</h4>
                        </h4>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
