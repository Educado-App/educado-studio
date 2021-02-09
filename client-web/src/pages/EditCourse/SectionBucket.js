// Base imports
import React from 'react';


// Material UI base

import {Droppable, Draggable} from 'react-beautiful-dnd';

// Material UI components
import {List, ListItem,ListItemText} from '@material-ui/core';

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