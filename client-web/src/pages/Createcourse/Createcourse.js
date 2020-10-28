// Base imports
import React,{useState,useRef} from 'react';
import clsx from 'clsx';

import {connect} from 'react-redux';
import * as courseActions from '../../store/actions/Course';

// Material UI base
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { CssBaseline, Grid, Paper, Container, Button, TextField,Typography} from '@material-ui/core';


import {Redirect} from 'react-router-dom';
// Material UI components


// Material UI icons
import palette from '../../consts/palette';

// Project imports 

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column'
    },
    container: {
        marginTop: theme.spacing(3),
    },
    button: {
        backgroundColor: palette.primary,
        marginTop: '20px'
    }
}))


const Createcourse = (props) => {
    let title;
    let description;
    
    const classes = useStyles();    

    const [created,setCreated] = useState(false);

    const handleClick = () => {
        props.createCourse(title,description);
        setCreated(true);
    }
    
    const handleTitle = (event) => {
        title = event.target.value;
    }

    const handleDescription = (event) => {
        description = event.target.value;
    }

    if (created === true) {
        return <Redirect to='/home' />;
    }

    return (
        <div className={classes.root}>
            <Typography variant='h2' align='center'>Create a new course</Typography>
            <Typography variant='h5' >Title</Typography>
            <TextField
                required
                id="outlined-required"
                label="Required"
                variant="outlined"
                onChange={handleTitle}
            />
            <Typography variant='h5' >Description</Typography>
            <TextField
                required
                id="outlined-multiline-static"
                label="Required"
                variant="outlined"
                rowsMax={4}
                onChange={handleDescription}
            />
            <Button onClick={handleClick} className={classes.button}>Create User</Button>
        </div>
    )
}
function mapStateToProps(state) {
    return {course: state.course};
  }

export default connect(mapStateToProps,courseActions)(Createcourse)