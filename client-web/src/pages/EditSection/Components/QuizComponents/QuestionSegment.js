// Base imports
import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../../../store/actions/Course";
import AnswersSegment from "./AnswersSegment";



// Material UI base
import { makeStyles } from "@material-ui/core/styles";
import { Card } from "@material-ui/core";

// Material UI components
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";

const useStyles = makeStyles((theme) => ({
    media: {
        width: "720px",
        background: "lightblue",
    },
}));


const QuestionSegment = (props) => {
    // props.id = activeComponentId
    // Find component i sectionComponents med tilsvarende id
    // Upon changes, update redux state

    const activeComponent = props.course.sectionComponents.find((component) => {
        return component._id === props.id;
    });

    const classes = useStyles();
    
    return (
        <Card>
           <div>
               <TextField
               className={classes.media}
               required
               id="outlined-multiline-static"
               variant="outlined"
               multiline
               rowsMax={4}
               rows={2}
           > </TextField>
           </div>
            <div>
                <AnswersSegment/>
                <AnswersSegment/>
            </div>
        </Card>
    );
};

function mapStateToProps(state) {
    return { course: state.course };
}

export default connect(mapStateToProps, courseActions)(QuestionSegment);