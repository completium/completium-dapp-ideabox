import React, { useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';

const Account = (props) => {
  return (
      <Container style={{ height: '300px'}}>
        <Container style={{ height: '120px' }}></Container>
        <Paper style={{ opacity: 0.8, paddingLeft: 18, paddingRight: 18 }}>
          { (props.state === 'loading') ? (
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
                }}>tz1dZydwVDuz6SH5jCUfCQjqV8YCQimL9GCp</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography color="textSecondary">Number of votes left:</Typography>
              </Grid>
              <Grid>
                <Typography>{3}</Typography>
              </Grid>
            </Grid>
          )}
        </Paper>
      </Container>
    )
}

export default Account