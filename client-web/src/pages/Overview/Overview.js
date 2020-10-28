// Base imports
import React,{useState,useRef} from 'react';
import clsx from 'clsx';

import {connect} from 'react-redux';

// Material UI base
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';

import {Button} from '@material-ui/core';
import * as courseActions from '../../store/actions/Course';

// Material UI components


// Material UI icons


// Project imports 
import './../../consts/global.css';


const Overview = (props) => {

    const handleClick = () => {
        props.createCourse();
        console.log(props.course.course)
    }
    return (
        <div>
            <h1>Overview</h1>
            <Button onClick={props.createCourse} >Create User</Button>
        </div>
        
    )
}

function mapStateToProps(state) {
    return {course: state.course};
  }

export default connect(mapStateToProps,courseActions)(Overview);

