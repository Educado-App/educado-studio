// Base imports
import React,{useState,useRef,Component} from 'react';
import clsx from 'clsx';

// Material UI base
import { makeStyles, useTheme, withStyles} from '@material-ui/core/styles';
import { Button, Container, CssBaseline,Divider, Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {Link, Redirect} from 'react-router-dom';

// Material UI components
import {connect, ReactReduxContext} from 'react-redux';
import * as courseActions from '../../store/actions/Course';
// Material UI icons


// Project imports 
import GetContentById from './GetContentById/GetContentById'; 
import './../../consts/global.css';

const useStyles = (theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      width: '100%',
      height: '300px'
    },
    container: {
        marginTop: theme.spacing(3),
    },
    button: {
        width: '100%',
        
    },
    img: {
        height: '60%'
    }
  });


class Home extends Component {

    
    state = {
        clickedCourse: false,
    }
    
    
    componentDidMount() {
        this.props.getAllCourses();
    }

    handleClick = (event) => {
        console.log(event.target.dataset.value);
        this.setState({
            ...this.state,
            clickedCourse: true,
        })
        console.log(this.state)
    }


    render() {
        const {classes} = this.props;
        console.log(this.state)
        if (this.state.clickedCourse === true) {
            return <Redirect to="/edit/course"/>;
        };

        return (
            <div className={classes.root}>
                
        <Container className={classes.container} maxWidth="xl">
            <Grid container spacing={3}>
            {this.props.course.userCourses.map((course,index) => {
                console.log(course._id)
                return (
                    
                    <Grid id={index} item xs={12} md={6} lg={4} xl={3} >
                        <Button className={classes.button} onClick={this.handleClick} >
                            <Paper data-value={course._id} className={classes.paper}>
                                <img className={classes.img} src="/logo192.png" data-value={course._id}/>
                                <Divider></Divider>
                                <Typography variant='h5' data-value={course._id}>{course.title}</Typography>
                            </Paper>
                        </Button>
                    </Grid>
                    
                
            )})} 
            </Grid>
            </Container>
      </div>
        )
    };
}

function mapStateToProps(state) {
    return {course: state.course}
}


export default connect(mapStateToProps, courseActions)(withStyles(useStyles,{withTheme: true})(Home));