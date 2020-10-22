import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';

const SnackMsg = (props) => {
  return (
    <Snackbar open={true}>
      <Fab color="secondary" onClick={props.onClick}>
        <AddIcon />
      </Fab>
    </Snackbar>)
}

export default SnackMsg