import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import { TextField, Button, Divider, Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { useTezos } from '../dapp';
import { compressToUint8Array } from 'lz-string'
import { useSettingsContext } from '../settings.js';

const toHexString = bytes =>
  bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '');

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
  const tezos = useTezos();
  const [state, setState] = React.useState({ title: "", desc: "" });
  const { settings } = useSettingsContext();
  const handleChange = (event) => {
    if (event.target.id === 'standard-basic') {
      setState({
        title: event.target.value,
        desc: state.desc
      })
    } else {
      setState({
        title: state.title,
        desc: event.target.value
      })
    }
  }
  const handleSubmit = () => {
    console.info(state);
    tezos.wallet.at(settings.contract).then(contract => {
      var t = toHexString(compressToUint8Array(state.title));
      var d = toHexString(compressToUint8Array(state.desc));
      contract.methods.add_idea(t, d).send().then( op => {
        console.log(`waiting for ${op.opHash} to be confirmed`);
        props.openSnack();
        op.receipt().then(() => {
          props.handleReceipt();
        }).catch(error => console.log(`Error: ${error}`));
      }).catch(error => console.log(`Error: ${error}`))
    });
    props.onclose();
  }

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
            <TextField
              id="standard-basic"
              label="Enter idea title"
              fullWidth={true}
              color="secondary"
              onChange={handleChange}
              />
          </Grid>
          <Grid item style={{ padding: 16, paddingBottom: 0 }}>
            <TextField
              id="standard-textarea"
              label="Enter idea description"
              placeholder="Placeholder"
              multiline
              color="secondary"
              fullWidth={true}
              rowsMax={5}
              onChange={handleChange}/>
          </Grid>
          <Grid item>
            <Grid container direction="row" justify="flex-end" alignItems="center" style={{ padding: 16 }}>
              <Button onClick={handleSubmit}>submit</Button>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  )
}

export default IdeaForm