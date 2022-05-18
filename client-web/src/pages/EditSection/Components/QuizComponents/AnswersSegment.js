// Base imports
import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../../../store/actions/Course";
import clsx from 'clsx';

// Material UI base
import { makeStyles } from "@material-ui/core/styles";
import {Card, colors} from "@material-ui/core";

// Material UI components
import Checkbox from '@material-ui/core/Checkbox';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import CancelIcon from '@material-ui/icons/Cancel';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
    media: {
        backgroundColor: "#a892ee",
        display: "inline-flex",
    },
}));

const AnswersSegment = (props) => {
    // props.id = activeComponentId
    // Find component i sectionComponents med tilsvarende id
    // Upon changes, update redux state

    const activeComponent = props.course.sectionComponents.find((component) => {
        return component._id === props.id;
    });

    const classes = useStyles();

    const [checked, setChecked] = React.useState(true);

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    const handleCorrectAnswer = (event) => {
      //missing routing
    }

    const deleteAnswer = (event) => {
       //missing routing
    }

    return (
        <Card>
            <FormControl fullWidth className={classes.margin} variant="filled">
                <InputLabel htmlFor="filled-adornment-amount">Answer</InputLabel>
                <FilledInput
                    id="filled-adornment-amount"
                    multiline
                    minRow={2}
                    maxRows={4}
                    endAdornment={<InputAdornment position="end">
                       <label>
                           <Checkbox
                               defaultChecked={false}
                               color="primary"
                               edge="end"
                               onClick={handleCorrectAnswer}
                           />
                       </label>
                        <label>
                            <IconButton
                                color="primary"
                                component="span"
                                onClick={deleteAnswer}
                            >
                                <CancelIcon/>
                            </IconButton>
                        </label>
                </InputAdornment>}
                />
            </FormControl>
        </Card>
    );
};

function mapStateToProps(state) {
    return { course: state.course };
}

export default connect(mapStateToProps, courseActions)(AnswersSegment);


