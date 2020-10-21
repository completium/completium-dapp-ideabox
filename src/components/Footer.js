import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import '../index.css';

const Footer = (props) => {
    return (
      <AppBar position="static" color="default" style={{ boxShadow: "none", opacity: 1, heigh: 300 }}>
        <Toolbar style={{ minHeight: 256 }}>
          <Typography variant="body2" color="textSecondary" style={{ flexGrow : 1 }}>
            @copyright {props.appName} 2021
          </Typography>
        </Toolbar>
      </AppBar>
    )
  }

  export default Footer