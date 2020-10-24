// Base imports
import React,{useState,useRef} from 'react';
import clsx from 'clsx';

// Material UI base
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { CssBaseline, Grid, Paper, Container} from '@material-ui/core';

// Material UI components


// Material UI icons


// Project imports 

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    container: {
        marginTop: theme.spacing(3),
    },
    item: {
        
    }
}))


const Createcourse = () => {
    const classes = useStyles();    

    return (
        <div className={classes.root}>
            <Container className={classes.container} maxWidth="xl">
                <Grid container justify="center" spacing={3}>
                    <Grid item xs={6} >
                        <Paper>
                            Test 1
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper>
                            Test 2
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}


export default Createcourse;