// Base imports
import React,{ Component} from 'react';
import {connect} from 'react-redux';

// Material UI base
import { withStyles } from '@material-ui/core/styles';
import { Divider, Typography, TextField, Fab} from '@material-ui/core';
import {DragDropContext} from 'react-beautiful-dnd';
import {Button} from '@material-ui/core';
import * as courseActions from '../../store/actions/Course';
import PublishIcon from '@material-ui/icons/Publish';
// Material UI components
import {Card} from '@material-ui/core';

// Material UI icons


// Project imports 
import SectionBucket from './SectionBucket';
import uploadCoverImage from '../../hooks/uploadCoverImage';
import getFileFromUrl from '../../hooks/getFileFromUrl';
import CreateSection from './CreateSection';
import DeleteIcon from '@material-ui/icons/Delete';

import palette from './../../consts/palette';

const useStyles = (theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column'
    },
    bar: {
        
    },
    top: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
        top_left: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            width: '50%',
            margin: '15px'
        },
            top_left_row: {
                display: 'flex',
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                marginTop: '15px',
                marginBottom: '15px'
            },
                top_left_row_text: {
                    marginRight: '10px',
                },
                top_left_row_input: {
                    display: 'flex',
                    flexGrow: 1,
                },

        top_right: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            width: '50%',
            margin: '15px'
        },
            top_right_content: {
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                height: '100%',
            },
                top_right_content_buttons: {
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    marginLeft: '10px',

                },
                top_right_content_card: {
                    width: '50%',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center'
                },

    bottom: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
        bottom_card: {
            width: '50%'
        },
        input: {
            display: 'none',
        },
        photo: {
            height: '100%',
            width: '100%'
        },
        fabPadding: {      
            marginLeft: '10px',
            marginRight: '10px',
            marginBottom: '50px',
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex'
            },

    uploadButton: {
        backgroundColor: palette.primary,
        margin: '2px',
        width: '100px'
    },
    deleteButton: {
        backgroundColor: palette.complementary,
        margin: '2px',
        width: '100px'
    }
});


class EditCourse extends Component {
    
    state = {
        title: this.props.course.activeCourse.title,
        description: this.props.course.activeCourse.description,
        sectionsDnd: {
            id: 'sections-dnd',
            sections: this.props.course.activeCourse.sections, // Stores the array of sections
        },
        coverImg: '',
        coverImgData: {name: "",path: ""},
        progress: 0,
        imgFromServerTest: '',
        reloadTrigger: false,
    }

    

    async componentDidMount() {
        await this.props.getAllSections(this.props.course.activeCourse.sections);
        const imgFromServer = await getFileFromUrl(this.props.course.activeCourse.coverImg);
        this.setState({
            ...this.state,
            imgFromServerTest: 'data:image/jpeg;base64,' + imgFromServer
        })
    }

    async componentDidUpdate(prevProps,prevState){
        if (prevState.reloadTrigger !== this.state.reloadTrigger) {
            await this.props.getAllSections(this.props.course.activeCourse.sections);
        }
    }
    
    // Function for handling file input
    handleChangeFile = async (event) => {
        this.state.progress = 0;
        const file = event.target.files[0]; // Accessing file
        const res = await uploadCoverImage(file,this.props.course.activeCourse._id);
        const imgFromServer = await getFileFromUrl(res);
        this.setState({
            ...this.state,
            imgFromServerTest: 'data:image/jpeg;base64,' + imgFromServer
        })
    }



    // Function for DnD to execute upon reorder
    onDragEnd = async result => {
        // To do
        const {destination, source, draggableId} = result; // Get info from result
        if (!destination) {
            return; //Return if no destination for drop
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return; // Also return if the item is dropped the same place as it was taken
        }

        const newTaskIds = Array.from(this.props.course.activeCourse.sections);
        newTaskIds.splice(source.index, 1);
        newTaskIds.splice(destination.index, 0, draggableId);

        await this.props.updateSectionsOrder(newTaskIds,this.props.course.activeCourse._id)

        this.setState({
            ...this.state,
            reloadTrigger: !this.state.reloadTrigger
        })

        return;

    }



    onChangeTitle = (event) => {
        this.setState({
            ...this.state,
            title: event.target.value,
        })
    }

    onChangeDescription = (event) => {
        this.setState({
            ...this.state,
            description: event.target.value,
        })
    }

    onTriggerReload = () => {
        this.setState({
            ...this.state,
            reloadTrigger: !this.state.reloadTrigger
        })
    }

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
            <Divider ></Divider>
            <div className={classes.top}>
                <div className={classes.top_left}>
                    <div className={classes.top_left_row}>
                        <Typography variant="h5" className={classes.top_left_row_text}>Title</Typography>
                        <TextField
                            required
                            id="outlined-required"
                            label="Required"
                            variant="outlined"
                            defaultValue={this.state.title}
                            onChange={this.onChangeTitle}
                            className={classes.top_left_row_input}
                        />
                    </div>
                    <div className={classes.top_left_row}>
                    <Typography variant="h5" className={classes.top_left_row_text}>Description</Typography>
                        <TextField
                            required
                            id="outlined-multiline-static"
                            variant="outlined"
                            label="Required"
                            multiline
                            rowsMax={7}
                            rows={7}
                            defaultValue={this.state.description}
                            onChange={this.onChangeDescription}
                            className={classes.top_left_row_input}
                        />
                    </div>
                </div>
                <div className={classes.top_right}>
                    <div className={classes.top_right_content}>
                        <Card className={classes.top_right_content_card}>
                            <img src={this.state.imgFromServerTest} className={classes.photo} alt={""}></img>
                        </Card>
                        <div className={classes.top_right_content_buttons}>
                            <input
                                accept="image/*"
                                className={classes.input}
                                id="contained-button-file"
                                multiple
                                type="file"
                                onChange={this.handleChangeFile}
                            />
                            <label htmlFor="contained-button-file">
                            <Button size="small" variant="contained" className={classes.uploadButton}>
                                <PublishIcon></PublishIcon>                 
                                Upload
                            </Button>
                            </label>
                            <Button size="small" variant="contained" className={classes.deleteButton}>
                                <DeleteIcon></DeleteIcon>                 
                                Remove
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <Divider></Divider>
            <div className={classes.bottom}>
                <Card className={classes.bottom_card}>
                    <DragDropContext
                        onDragEnd={this.onDragEnd}
                    >
                        <SectionBucket sectionsList={this.props.course.courseSections} ></SectionBucket>
                    </DragDropContext>      
                </Card>
                </div>
                <div className={classes.fabPadding}>
                <CreateSection trigger={this.onTriggerReload}></CreateSection>
                </div>
        </div>
        )
    }
}


function mapStateToProps(state) {
    return {course: state.course};
  }

export default connect(mapStateToProps,courseActions)(withStyles(useStyles,{withTheme: true})(EditCourse));

