// Base imports
import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../../../store/actions/Course";

// Material UI base
import { makeStyles } from "@material-ui/core/styles";
import { Card } from "@material-ui/core";

// Material UI components
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import FilledInput from "@material-ui/core/FilledInput";
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';



const useStyles = makeStyles((theme) => ({
    check: {
        background: "lightblue",
    },
}));


const PointsSegment = (props) => {
    // props.id = activeComponentId
    // Find component i sectionComponents med tilsvarende id
    // Upon changes, update redux state

    const activeComponent = props.course.sectionComponents.find((component) => {
        return component._id === props.id;
    });

    const classes = useStyles();

    const [value, setValue] = React.useState(0);

    return (
        <Card>
            <FormControl fullWidth className={classes.check} variant="filled" disabled={true}>
                <InputLabel htmlFor="filled-adornment-amount">Difficulty</InputLabel>
                <FilledInput
                    endAdornment={ <InputAdornment position="end">
                        <Box component="fieldset" borderColor="transparent">
                            <Typography component="legend"> </Typography>
                            <Rating
                                name="simple-controlled"
                                value={value}
                                onChange={(event, newValue) => {
                                    setValue(newValue);
                                }}
                            />
                        </Box>

                    </InputAdornment> }
                />

            </FormControl>
        </Card>
    );
};

function mapStateToProps(state) {
    return { course: state.course };
}

export default connect(mapStateToProps, courseActions)(PointsSegment);