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
}));

const QuizComponent = (props) => {
    // props.id = activeComponentId
    // Find component i sectionComponents med tilsvarende id
    // Upon changes, update redux state

    const activeComponent = props.course.sectionComponents.find((component) => {
        return component._id === props.id;
    });

    const [text, setText] = React.useState(activeComponent.text);
    const classes = useStyles();

    const onChangeText = (event) => {
        setText(event.target.value);
    };

    const onSave = async () => {
        await props.updateComponentText(text, activeComponent._id);
    };

    return (
        <Card className={classes.root}>
            <div className={classes.media}>
                <QuestionSegment onChange={onChangeText}></QuestionSegment>
            </div>
            <div className={classes.media}>
                <AnswersSegment></AnswersSegment>
            </div>
            <div className={classes.saveButton}>
                <Fab size="small" variant="extended" onClick={onSave}>
                    <SaveIcon />
                    Save
                </Fab>
                <DeleteComponentButton component_id={props.id}></DeleteComponentButton>
            </div>
        </Card>
    );
};

function mapStateToProps(state) {
    return { course: state.course };
}

export default connect(mapStateToProps, courseActions)(QuizComponent);