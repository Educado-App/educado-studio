// Base imports
import React from 'react';


// Project imports 
import {makeStyles,Typography, CircularProgress} from '@material-ui/core';
import palette from '../../consts/palette';



const useStyles = makeStyles(() => ({
    background: {
        backgroundColor: palette.primary,
        width: '100%',
        height: '100vh',
        alignItems: 'center'
    },
    text: {
        position: 'relative',
        marginTop: '5%'
    },
    spinner: {
        position: 'relative',
        marginTop: '10px'
    },
    loc: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    }
}))


const Loading = () => {
    const classes = useStyles();



    return (
        <div className={classes.background}>
            <div className={classes.loc}>
                    <Typography className={classes.text} align='center' variant="h3">Loading...</Typography>
                    <CircularProgress className={classes.spinner} size={200}></CircularProgress>
            </div>
        </div>
    )
}

export default Loading;