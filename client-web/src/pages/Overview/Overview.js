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

    
    return (
        <div>
            <h1>Overview</h1>
            
        </div>
        
    )
}


function mapStateToProps(state) {
    return {course: state.course};
  }

export default connect(mapStateToProps,courseActions)(Overview);

