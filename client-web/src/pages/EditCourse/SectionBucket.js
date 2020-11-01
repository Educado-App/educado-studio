// Base imports
import React,{useState,useRef} from 'react';
import clsx from 'clsx';

import {connect} from 'react-redux';

// Material UI base
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import {DragDropContext,Droppable, Draggable} from 'react-beautiful-dnd';
import {Button} from '@material-ui/core';
import * as courseActions from '../../store/actions/Course';

// Material UI components
import {List, ListItem,ListItemText,Card} from '@material-ui/core';

// Material UI icons



const SectionBucket = (props) => {
    return (
        <Droppable
            droppableId="drop-1"
        >
            {(provided) => (
                <List innerRef={provided.innerRef} {...provided.droppableProps} type="dense">
                    <Draggable
                        draggableId="drag1"
                        index={1}
                    >
                        {(provided) => (
                            <ListItem {...provided.draggableProps} {...provided.dragHandleProps} innerRef={provided.innerRef} button disableRipple>
                                <ListItemText primary="Single-line item"></ListItemText>
                            </ListItem>
                        )}
                        
                    </Draggable>

                    <Draggable
                        draggableId="drag2"
                        index={2}
                    >
                        {(provided) => (
                            <ListItem {...provided.draggableProps} {...provided.dragHandleProps} innerRef={provided.innerRef} button disableRipple>
                                <ListItemText primary="Single-line item 2"></ListItemText>
                            </ListItem>
                        )}
                        
                    </Draggable>
            
                    {provided.placeholder}
                </List>
            )}
        </Droppable>
    )
}

export default SectionBucket;