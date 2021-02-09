// Base imports
import React,{Component} from 'react';

// Material UI base
import { withStyles} from '@material-ui/core/styles';
import { Button, Container,Divider, Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {Redirect} from 'react-router-dom';

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
    }
    
    
    componentDidMount() {
        this.props.getAllCourses();
    }

    // Function for handling when user clicks a course
    // Purpose: call editCourse() action, and activate redirect by setting state variable
    // Redirect then activated in render() function
    handleClick = (event) => {
        this.setState({
            ...this.state,
            id: event.target.dataset.value
        })
        this.props.editCourse(event.target.dataset.value);
    }


    render() {
        const {classes} = this.props;

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
                            <Grid id={index} item xs={12} md={6} lg={4} xl={3} >
                                <Button className={classes.button} onClick={this.handleClick} >
                                    <Paper data-value={course._id} data-sections={course.sections} className={classes.paper}>
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