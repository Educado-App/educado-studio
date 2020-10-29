// Base imports
import React,{useState,useRef,Component} from 'react';
import clsx from 'clsx';

// Material UI base
import { makeStyles, useTheme, withStyles} from '@material-ui/core/styles';
import { Container, CssBaseline } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {Link} from 'react-router-dom';

// Material UI components
import {connect} from 'react-redux';
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
    },
    container: {
        marginTop: theme.spacing(3),
    }
  });


class Home extends Component {
    
    componentDidMount() {
        this.props.getAllCourses();
    }

    render() {
        const {classes} = this.props;
        console.log(this.props.course.userCourses);

        return (
            <div className={classes.root}>
                
        <Container className={classes.container} maxWidth="xl">
            <Grid container spacing={3}>
            {this.props.course.userCourses.map(course => (
                <Grid item xs={12} md={6} lg={4} xl={3}>
                    <Link to="/overview" className="link">
                        <Paper className={classes.paper}>
                            <img src="/logo192.png" />
                            <h1>{course.title}</h1>
                            <h2>{course.description}</h2>
                        </Paper>
                    </Link>
                </Grid>
            ))} 
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