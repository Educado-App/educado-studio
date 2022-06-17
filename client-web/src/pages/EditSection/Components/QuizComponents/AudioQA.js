/*
import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Component } from "react";
import { Card, Fab } from "@material-ui/core";
import { connect } from "react-redux";
import * as courseActions from "../../../../store/actions/Course";

// Material UI components
import uploadFileToComponent from "../../../../hooks/uploadFileToComponent";
import getPresignedUrl from "../../../../hooks/getPresignedUrl";
import PublishIcon from "@material-ui/icons/Publish";
import shadows from "@material-ui/core/styles/shadows";
import QuestionSegment from "./QuestionSegment";


const useStyles = (theme) => ({
    root: {
        maxWidth: 720,
    },
    media: {
        width: "660px",
        background: "white",
    },
    input: {
        display: "none",
    },
    fab: {
        color: "#484848",
        background: "#484848",
    },
    upload: {
      color: "white",
      height: "20px",
      "&:hover": {
          color: "#34b1eb"
        },
    },

    deleteButton: {
        display: "flex",
        background: "#484848",
        height: "20px",
    },
});

class AudioComponent extends Component {
    state = {
        componentId: this.props.id,
        presignedUrl: "",
    };

    async componentDidMount() {
        const presignedUrlFromServer = await getPresignedUrl(
            this.state.componentId
        );
        this.setState({
            ...this.state,
            presignedUrl: presignedUrlFromServer,
        });
    }

    async componentDidUpdate() {}

    handleChangeFile = async (event) => {
        const file = event.target.files[0];
        const res = await uploadFileToComponent(file, this.state.componentId);
        const presignedUrlFromServer = await getPresignedUrl(
            this.state.componentId
        );
        this.setState({
            ...this.state,
            presignedUrl: presignedUrlFromServer,
        });
    };

    render() {
        const { classes } = this.props;

        return (
            <Card className={classes.root}>
              <div className={classes.deleteButton}>
                <audio
                    controls
                    width="700"
                    key={this.state.presignedUrl}
                    className={classes.media}
                >
                    <source type="audio/mp3" src={this.state.presignedUrl} />
                </audio>

                <input
                    accept="audio/*"
                    className={classes.input}
                    id={this.state.componentId + "contained-button-file"}
                    type="file"
                    onChange={this.handleChangeFile}
                />
                    <label htmlFor={this.state.componentId + "contained-button-file"}>
                            <PublishIcon className={classes.upload}/>
                    </label>
              </div>
            </Card>
        );
    }
}

function mapStateToProps(state) {
    return { course: state.course };
}

export default connect(
    mapStateToProps,
    courseActions
)(withStyles(useStyles, { withTheme: true })(AudioComponent));
*/