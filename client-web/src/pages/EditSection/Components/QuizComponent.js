// Base imports
import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../../store/actions/Course";
// Material UI base
import { makeStyles } from "@material-ui/core/styles";
import { Card } from "@material-ui/core";

// Material UI components
import Fab from "@material-ui/core/Fab";
import SaveIcon from "@material-ui/icons/Save";
// Material UI icons

// Project imports
import DeleteComponentButton from "./DeleteComponentButton";
import AnswersSegment from "./QuizComponents/AnswersSegment";
import PointsSegment from "./QuizComponents/PointsSegment";
import QuestionSegment from "./QuizComponents/QuestionSegment";
import AddIcon from "@material-ui/icons/Add";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Menu from "@material-ui/core/Menu";
import AddBoxIcon from '@material-ui/icons/AddBox';


const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 720,
    },
    media: {
        width: "720px",
    },
    saveButton: {
        marginTop: "10px",
        marginLeft: "10px",
        marginRight: "10px",
        marginBottom: "10px",
        display: "flex",
        justifyContent: "space-between",
    },
    deleteButton: {
        display: "flex",
        justifyContent: "right",
    },
    createComponent: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
}));

const QuizComponent = (props) => {
    // props.id = activeComponentId
    // Find component i sectionComponents med tilsvarende id
    // Upon changes, update redux state

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    const activeComponent = props.course.sectionComponents.find((component) => {
        return component._id === props.id;
    });

    const [text, setText] = React.useState(activeComponent.text);
    const classes = useStyles();

    const onChangeText = () => {
        gi
    };

    const handleCreateNewAnswer = async (event) => {
        await props.createAnswer(activeComponent._id);
        props.trigger();
    };

    const handleCreateNewQuestion = async (event) => {
        await props.createQuiz(activeComponent._id);
        props.trigger();
    };

    const onSave = async () => {
        await props.updateComponentText(text, activeComponent._id);
    };

    return (
        <Card className={classes.root}>
            <div className={classes.media}>
                <QuestionSegment onChange={onChangeText}/>
            </div>
            <div className={classes.createComponent}>
                <Fab
                    color="primary"
                    aria-label="add"
                    aria-controls="customized-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                >
                    <AddIcon/>
                </Fab>
            </div>
            <Menu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem button onClick={handleCreateNewAnswer}>
                    <ListItemIcon>
                        <AddBoxIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Answer" />
                </MenuItem>
                <MenuItem button onClick={handleCreateNewQuestion}>
                    <ListItemIcon>
                        <AddBoxIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Question" />
                </MenuItem>
            </Menu>

            <div className={classes.saveButton}>
                <Fab size="small" variant="extended" onClick={onSave}>
                    <SaveIcon/>
                    Save
                </Fab>
                <DeleteComponentButton component_id={props.id}> </DeleteComponentButton>
            </div>
        </Card>
    );
};

function mapStateToProps(state) {
    return { course: state.course };
}

export default connect(mapStateToProps, courseActions)(QuizComponent);