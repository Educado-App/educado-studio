// Base imports
import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../../../store/actions/Course";

// Material UI base
import { makeStyles } from "@material-ui/core/styles";
import { Card } from "@material-ui/core";

// Material UI components
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
    media: {
        display: "flex",
    }
}));

const AnswersSegment = (props) => {
    // props.id = activeComponentId
    // Find component i sectionComponents med tilsvarende id
    // Upon changes, update redux state

    const activeComponent = props.course.sectionComponents.find((component) => {
        return component._id === props.id;
    });

    const classes = useStyles();

    return (
        <Card>
            <TextField
                className={classes.media}
                required
                id="outlined-multiline-static"
                variant="outlined"
                multiline
                rowsMax={1}
                rows={1}
            > Answer </TextField>
        </Card>
    );
};

function mapStateToProps(state) {
    return { course: state.course };
}

export default connect(mapStateToProps, courseActions)(AnswersSegment);