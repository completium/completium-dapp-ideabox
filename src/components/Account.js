import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import SnackMsg from './SnackMsg';

const Account = (props) => {
  return (
      <Container style={{ height: '300px'}}>
        <Container style={{ height: '40px' }}></Container>
        <Paper style={{ opacity: 0.8, paddingLeft: 18, paddingRight: 18 }}>
          { (props.accountState === 'loading') ? (
            <Grid container direction="row" alignItems="center" spacing={2} style={{ height: 64 }}>
              <Grid item xs={12}>
                <LinearProgress color="secondary" />
              </Grid>
            </Grid>
          ) : (
            <Grid container direction="row" alignItems="center" spacing={2}>
              <Grid item xs={2} direction="row">
                <Typography color="textSecondary">account :</Typography>
              </Grid>
              <Grid>
                <Typography style={{
                  fontFamily: 'Courier Prime, monospace',
                }}>{props.account}</Typography>
              </Grid>
              {
                (props.isvoter)?(
                  <Grid item xs={3}>
                    <Grid container direction="row" justify="flex-end" spacing={2}>
                      <Grid item>
                        <Typography color="textSecondary">Number of votes left:</Typography>
                      </Grid>
                      <Grid item>
                        <Typography>{props.nbvotes}</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                ):(
                  <Grid item xs={3}>
                    <Typography color="error">Not registered!</Typography>
                  </Grid>
                )
              }
            </Grid>
          )}
        </Paper>
      </Container>
    )
}

export default Account