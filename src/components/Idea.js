import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { Divider, Grid } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

const Idea = (props) => {
  return (
    <Card>
      <CardContent>
        <Grid container direction="row" justify="flex-start" alignItems="center">
          <Grid item xs={1} >
            <IconButton color="secondary" aria-label="upload picture" component="span">
              <ThumbUpIcon />
            </IconButton>
          </Grid>
          <Grid item xs={11} >
            <Grid container direction="row" justify="flex-start" alignItems="center">
              <Grid item>
                <Typography variant="body2" align="left" style={{ paddingLeft: 12 }}> {props.desc} </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
      <Divider></Divider>
      <CardContent style={{ paddingBottom: 16 }}>
        <Grid container direction="row" justify="flex-start" alignItems="center" style={{ paddingLeft: 26, paddingRight: 12 }}>
          <Grid item xs={9}>
            <Grid container direction="row" justify="flex-start" alignItems="center" spacing={3}>
              <Grid item >
                <Typography color="textSecondary" style={{ fontWeight: 'bold' }}> #{props.id} </Typography>
              </Grid>
              <Grid item >
                <Grid container direciton="row" justify="flex-start" alignItems="center" style={{ paddingLeft: 18 }}>
                  <Typography color="textSecondary">by: </Typography>
                  <Typography color="textSecondary" style={{
                    fontSize: 14,
                    fontFamily: 'Courier Prime, monospace',
                    padding: 8,
                    paddingTop: 12
                  }}>{props.author}</Typography>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container direciton="row" justify="flex-start" alignItems="center">
                  <Typography color="textSecondary">creation: </Typography>
                  <Typography color="textSecondary" style={{
                    fontSize: 14,
                    fontFamily: 'Courier Prime, monospace',
                    padding: 8,
                    paddingTop: 12
                  }}>{props.creation}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={3}>
            <Grid container direction="row" justify="flex-end" alignItems="center" spacing={1}>
              <Grid item>
                <Typography> {props.nbvotes} </Typography>
              </Grid>
              <Grid item>
                <ThumbUpIcon fontSize="small" />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default Idea