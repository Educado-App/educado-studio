// Base imports
import React,{useState,useRef} from 'react';
import clsx from 'clsx';

import {connect} from 'react-redux';

// Material UI base
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { CssBaseline,Divider, Typography } from '@material-ui/core';
import {DragDropContext,Droppable, Draggable} from 'react-beautiful-dnd';
import {Button} from '@material-ui/core';
import * as courseActions from '../../store/actions/Course';

// Material UI components
import {Card} from '@material-ui/core';

// Material UI icons


// Project imports 
import SectionBucket from './SectionBucket';


const EditCourse = (props) => {

    const onDragEnd = result => {

    }


    return (
        <div>
            <Typography variant="h4" align='center'>Edit Course</Typography>
            <Divider></Divider>
            <p>{props.course.activeCourse.title}</p>
            <Card>
                <DragDropContext
                    onDragEnd={onDragEnd}
                >
                    <SectionBucket></SectionBucket>
                </DragDropContext>
            </Card>
            
        </div>
        
    )
}


function mapStateToProps(state) {
    return {course: state.course};
  }

export default connect(mapStateToProps,courseActions)(EditCourse);

{/* <ListItem button disableRipple>
                                    <ListItemText primary="Single-line item 2"></ListItemText>
                                </ListItem> */}