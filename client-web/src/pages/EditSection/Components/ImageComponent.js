// Base imports
import React, { Component } from "react";
import { connect } from "react-redux";
import * as courseActions from "../../../store/actions/Course";
// Material UI base
import { Fab, withStyles } from "@material-ui/core";

// Material UI components
import CardMedia from "@material-ui/core/CardMedia";
import Card from "@material-ui/core/Card";
import { CardActions } from "@material-ui/core";
import uploadFileToComponent from "../../../hooks/uploadFileToComponent";
// Material UI icons
import DeleteComponentButton from "./DeleteComponentButton";
import PublishIcon from "@material-ui/icons/Publish";
import getPresignedUrl from "../../../hooks/getPresignedUrl";

// Project imports
const useStyles = (theme) => ({
  root: {
    maxWidth: 720,
  },
  media: {
    height: "480px",
    width: "720px",
  },
  input: {
    display: "none",
  },
  deleteButton: {
    marginLeft: "10px",
    marginRight: "10px",
    marginBottom: "10px",
    display: "flex",
    justifyContent: "space-between",
  },
});

class ImageComponent extends Component {
  state = {
    img: "",
    reloadTrigger: false,
    presignedUrl: "",
    componentId: this.props.id,
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
        <CardMedia
          image={this.state.presignedUrl}
          className={classes.media}
        ></CardMedia>
        <CardActions>
          <input
            accept="image/*"
            className={classes.input}
            id={this.state.componentId + "contained-button-file"}
            type="file"
            onChange={this.handleChangeFile}
          />
        </CardActions>
        <div className={classes.deleteButton}>
          <label htmlFor={this.state.componentId + "contained-button-file"}>
            <Fab size="small" component="span" variant="extended">
              <PublishIcon></PublishIcon>
              Upload
            </Fab>
          </label>
          <DeleteComponentButton
            component_id={this.state.componentId}
            className={classes.deleteButton}
          ></DeleteComponentButton>
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
)(withStyles(useStyles, { withTheme: true })(ImageComponent));
