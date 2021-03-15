// Base imports
import React from 'react';
import {connect} from 'react-redux';
import * as courseActions from '../../store/actions/Course';

// Material UI base
import { makeStyles } from '@material-ui/core/styles';
import {Droppable, Draggable} from 'react-beautiful-dnd';

// Material UI components
import {List, ListItem,ListItemText, Button, Typography, Paper} from '@material-ui/core';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
// Material UI icons
import {Redirect} from 'react-router-dom';
import DeleteSectionButton from './DeleteSectionButton';

const useStyles = makeStyles((theme) => ({
    deleteButton: {
        position: 'absolute',
        right: '5px',
        width: '15%'
    },
    titleText: {
        width: '80%'
    },
    sectionPaper: {
        margin: '5px',
    },
    dragIcon: {
        width: '5%',
    }
}));


const SectionBucket = (props) => {

    const [redirectId, setRedirectId] = React.useState('');

    const classes = useStyles();
    

    const handleClickSection = async (event,section_id) => {
        setRedirectId(section_id);
        await props.editSection(section_id);
    }

    if (props.course.activeSection._id === redirectId) {
        return <Redirect to="/edit/section"/>;
    }

    return (
        <Droppable
            droppableId={"drop"+Date.now()}
            key={"drop"+Date.now()}
        >
            {(provided) => (
                <List innerRef={provided.innerRef} {...provided.droppableProps} type="dense" key={"list"+Date.now()}>
                    {props.sectionsList.map((section,index) => {
                        let keyValue;
                        if (!section._id) {
                            keyValue = 'temp';
                        } else {
                            keyValue = section._id;
                        }
                        
                        return(
                            <Draggable
                            draggableId={keyValue}
                            index={index}
                            key={keyValue}
                            data-value={section._id}
                            >
                                {(provided) => (
                                    <Paper className={classes.sectionPaper}>
                                        <ListItem {...provided.draggableProps} {...provided.dragHandleProps} innerRef={provided.innerRef} data-value={section._id}>

                                            <DragIndicatorIcon className={classes.dragIcon}></DragIndicatorIcon>

                                            <Button  className={classes.titleText} key={section._id} onClick={event => handleClickSection(event,section._id)}>
                                                <Typography data-value={section._id} key={section._id}>{section.title}</Typography>
                                            </Button>
                                            
                                            <div className={classes.deleteButton}>
                                                <DeleteSectionButton section_id={section._id} ></DeleteSectionButton>
                                            </div>
                                            
                                        </ListItem>
                                        
                                    </Paper>
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

export default connect(mapStateToProps,courseActions)(SectionBucket);