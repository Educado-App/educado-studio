// Base imports
import React from 'react';
import {connect} from 'react-redux';
import * as courseActions from '../../store/actions/Course';

// Material UI base

import {Droppable, Draggable} from 'react-beautiful-dnd';

// Material UI components
import {List, ListItem} from '@material-ui/core';

// Material UI icons
import TextComponent from './Components/TextComponent';
import ImageComponent from './Components/ImageComponent';
import VideoComponent from './Components/VideoComponent';
import AudioComponent from './Components/AudioComponent';



const ComponentBucket = (props) => {




    return (
        <Droppable
            droppableId={"drop"+Date.now()}
        >
            {(provided) => (
                <List innerRef={provided.innerRef} {...provided.droppableProps} type="dense">
                    {props.componentsList.map((component,index) => {
                        let componentToRender;
                        switch (component.type) {
                            case "TEXT":
                                componentToRender = <TextComponent trigger={props.trigger} id={component._id}></TextComponent>;
                                break;

                            case "IMAGE":
                                componentToRender = <ImageComponent trigger={props.trigger} id={component._id}></ImageComponent>;
                                break;
                            
                            case "VIDEO":
                                componentToRender = <VideoComponent trigger={props.trigger} id={component._id}></VideoComponent>;   
                                break;

                            case "AUDIO":
                                componentToRender = <AudioComponent trigger={props.trigger} id={component._id}></AudioComponent>;
                                break;

                            default:
                                break;
                        }
                        
                        let keyValue;
                        if (!component._id) {
                            keyValue = 'temp';
                        } else {
                            keyValue = component._id;
                        }

                        return(
                            <Draggable
                            draggableId={keyValue}
                            index={index}
                            key={keyValue}
                            >
                                {(provided) => (
                                    <ListItem {...provided.draggableProps} {...provided.dragHandleProps} innerRef={provided.innerRef} button disableRipple>
                                        {componentToRender}
                                    </ListItem>
                                )}
                            </Draggable>
                        )
                    })}
                    {provided.placeholder}
                </List>
            )}
        </Droppable>
    )
}

function mapStateToProps(state) {
    return {course: state.course};
}

export default connect(mapStateToProps,courseActions)(ComponentBucket);