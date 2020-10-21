import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import '../index.css';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const HeaderBar = (props) => {
  const minWidth = useMediaQuery('(min-width:600px)');
  var visible = minWidth?'visible':'hidden';
  return (
    <AppBar position="static" color="default" style={{ boxShadow: "none", opacity: 1, /* backgroundColor: '#303030' */ }}>
      <Toolbar>
        <Typography variant="h6" style={{ position : 'absolute', fontFamily : 'Alegreya Sans SC, sans-serif' }}>
          Completium
        </Typography>
        <Typography variant="h6" color="secondary" style={{ flexGrow : 1, visibility: visible }}>
          {props.appTitle}
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default HeaderBar