import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import { TextField, Button, Divider, Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    /* backgroundColor: (theme.palette.type === 'light') ? theme.palette.background.default : '#212121' */
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);


const IdeaForm = (props) => {
  return (
    <Dialog open={props.open} onClose={props.onclose} fullWidth={true}>
      <DialogTitle id="customized-dialog-title" onClose={props.onclose}>
        New idea
      </DialogTitle>
      <DialogContent dividers style= {{ padding: 0 }}>
        <Grid container direction="column">
          <Grid item>
            <Grid container direction="row" style={{ padding: 16 }} spacing={3}>
              <Grid item>
                <Typography>Author:</Typography>
              </Grid>
              <Grid>
                <Typography color="textSecondary" style={{
                      fontSize: 14,
                      fontFamily: 'Courier Prime, monospace',
                      paddingTop: 15
                    }}>{props.account}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Divider></Divider>
          <Grid item style={{ padding: 16, paddingBottom: 0 }}>
            <TextField id="standard-basic" label="Enter idea title" fullWidth={true} color="secondary"/>
          </Grid>
          <Grid item style={{ padding: 16, paddingBottom: 0 }}>
            <TextField
              id="standard-textarea"
              label="Enter idea description"
              placeholder="Placeholder"
              multiline
              color="secondary"
              fullWidth={true}
              rowsMax={5}/>
          </Grid>
          <Grid item>
            <Grid container direction="row" justify="flex-end" alignItems="center" style={{ padding: 16 }}>
              <Button>submit</Button>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  )
}

export default IdeaForm