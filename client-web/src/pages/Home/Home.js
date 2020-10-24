// Base imports
import React,{useState,useRef} from 'react';
import clsx from 'clsx';

// Material UI base
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Container, CssBaseline } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {Link} from 'react-router-dom';

// Material UI components


// Material UI icons


// Project imports 
import GetContentById from './GetContentById/GetContentById'; 
import './../../consts/global.css';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    container: {
        marginTop: theme.spacing(3),
    }
  }));


const Home = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
        <Container className={classes.container} maxWidth="xl">
            <Grid container spacing={3}>
            
            <Grid item xs={12} md={6} lg={4} xl={3}>
                <Link to="/overview" className="link">
                <Paper className={classes.paper}>
                    <GetContentById />
                </Paper>
                </Link>
            </Grid>
            
            <Grid item xs={12} md={6} lg={4} xl={3}>
                <Paper className={classes.paper}>
                <GetContentById />
                </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={4} xl={3}>
                <Paper className={classes.paper}>
                <GetContentById />
                </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={4} xl={3}>
                <Paper className={classes.paper}>
                <GetContentById />
                </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={4} xl={3}>
                <Paper className={classes.paper}>
                <GetContentById />
                </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={4} xl={3}>
                <Paper className={classes.paper}>
                <GetContentById />
                </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={4} xl={3}>
                <Paper className={classes.paper}>
                <GetContentById />
                </Paper>
            </Grid>
            </Grid>
            </Container>
      </div>
    );
}


export default Home;