// Base imports
import React,{Component} from 'react';

// Material UI base
import { withStyles} from '@material-ui/core/styles';
import { Button, Container,Divider, Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {Redirect} from 'react-router-dom';
import Popover from '@material-ui/core/Popover';

// Material UI components
import {connect} from 'react-redux';
import * as courseActions from '../../store/actions/Course';
// Material UI icons


// Project imports 
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
        id: '',
        anchorEl: null,
        deleteCourse: '',
    }
    
    componentDidMount() {
        this.props.getAllCourses();
    }

    // Function for handling when user clicks a course
    // Purpose: call editCourse() action, and activate redirect by setting state variable
    // Redirect then activated in render() function
    handleClick = (event,course_id) => {
        this.setState({
            ...this.state,
            id: course_id
        })
        this.props.editCourse(course_id);
    }

    handleDeleteCourse = () => {
        this.props.deleteCourse(this.state.deleteCourse);
    }

    handlePopoverClick = (event) => {
        this.setState({
            ...this.state,
            anchorEl: event.currentTarget,
            deleteCourse: event.target.dataset.value,
        })
    }

    handleClose = () => {
        this.setState({
            ...this.state,
            anchorEl: null
        })
    }


    render() {
        const {classes} = this.props;
        const open = Boolean(this.state.anchorEl);
        const id = open ? 'simple-popover' : undefined;

        // Check if activeCourse has been changed in Redux State, and then redirect to editCourse page
        if (this.state.id === this.props.course.activeCourse._id) {
            return <Redirect to="/edit/course"/>
        }

        return (
            <div className={classes.root}>
                
                <Container className={classes.container} maxWidth="xl">
                    <Grid container spacing={3}>
                    {this.props.course.userCourses.map((course,index) => {
                        return (
                            <Grid id={index} item xs={12} md={6} lg={4} xl={3} key={index} >
                                <Button className={classes.button} onClick={event => this.handleClick(event,course._id)} >
                                    <Paper data-value={course._id} data-sections={course.sections} className={classes.paper} >
                                        <img className={classes.img} src="/logo192.png" data-value={course._id} alt=""/>
                                        <Divider></Divider>
                                        <Typography variant='h5' data-value={course._id}>{course.title}</Typography>
                                    </Paper>
                                </Button>
                                <Button onClick={this.handlePopoverClick}>
                                        <Typography data-value={course._id}>Delete</Typography>
                                </Button>
                                <Popover
                                    id={id}
                                    open={open}
                                    anchorEl={this.state.anchorEl}
                                    onClose={this.handleClose}
                                    anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'center',
                                    }}
                                    transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'center',
                                    }}
                                >
                                    <Typography>Are you sure?</Typography>
                                    <Button onClick={this.handleDeleteCourse}>
                                        <Typography>Yes!</Typography>
                                    </Button>
                                    <Button onClick={this.handleClose}>
                                        <Typography>No!</Typography>
                                    </Button>
                                </Popover>
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