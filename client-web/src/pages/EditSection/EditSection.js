// Base imports
import React, { Component } from "react";
import { connect } from "react-redux";
import * as courseActions from "../../store/actions/Course";

// Material UI base
import { withStyles } from "@material-ui/core/styles";
import { DragDropContext } from "react-beautiful-dnd";

// Material UI components
import { Card, Typography, Divider, Fab, TextField } from "@material-ui/core";

// Material UI icons

// Project imports
import CreateComponent from "./CreateComponent";
import ComponentBucket from "./ComponentBucket";
import palette from "../../consts/palette";

const useStyles = (theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "10px",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  bottom_card: {
    width: "50%",
    minWidth: 740,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "10px",
    marginLeft: "10px",
    marginRight: "10px",
  },
  uploadButton: {
    backgroundColor: palette.primary,
    margin: "2px",
    width: "100px",
  },
  descriptionField: {
    width: "50%",
    minWidth: 740,
    display: "flex",
  },
});

class EditSection extends Component {
  state = {
    reloadTrigger: false,
    description: this.props.course.activeSection.description,
    title: this.props.course.activeSection.title,
  };

  onTriggerReload = () => {
    this.setState({
      ...this.state,
      reloadTrigger: !this.state.reloadTrigger,
    });
  };

  async componentDidMount() {
    await this.props.getAllComponents(
      this.props.course.activeSection.components
    );
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.reloadTrigger !== this.state.reloadTrigger) {
      await this.props.getAllComponents(
        this.props.course.activeSection.components
      );
    }
  }

  onDragEnd = async (result) => {
    // To do
    const { destination, source, draggableId } = result; // Get info from result
    if (!destination) {
      return; //Return if no destination for drop
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return; // Also return if the item is dropped the same place as it was taken
    }

    const newTaskIds = Array.from(this.props.course.activeSection.components);
    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId);

    await this.props.updateComponentsOrder(
      newTaskIds,
      this.props.course.activeSection._id
    );

    this.setState({
      ...this.state,
      reloadTrigger: !this.state.reloadTrigger,
    });
    return;
  };

  onChangeDescription = (event) => {
    this.setState({
      ...this.state,
      description: event.target.value,
    });
  };

  onSaveDescription = async () => {
    await this.props.updateSectionDescription(
      this.state.description,
      this.props.course.activeSection._id
    );
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography variant="h3">{this.state.title}</Typography>
        <Divider></Divider>
        <TextField
          required
          id="outlined-multiline-static"
          variant="outlined"
          label="Required"
          multiline
          rowsMax={7}
          rows={5}
          defaultValue={this.state.description}
          onChange={this.onChangeDescription}
          className={classes.descriptionField}
        />
        <label htmlFor="update-course-description">
          <Fab
            size="small"
            component="span"
            variant="extended"
            className={classes.uploadButton}
            onClick={this.onSaveDescription}
          >
            Update description
          </Fab>
        </label>
        <div className={classes.container}>
          <Card className={classes.bottom_card}>
            <DragDropContext onDragEnd={this.onDragEnd}>
              <ComponentBucket
                trigger={this.onTriggerReload}
                componentsList={this.props.course.sectionComponents}
              ></ComponentBucket>
            </DragDropContext>
          </Card>
        </div>
        <CreateComponent trigger={this.onTriggerReload}></CreateComponent>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { course: state.course };
}

export default connect(
  mapStateToProps,
  courseActions
)(withStyles(useStyles, { withTheme: true })(EditSection));
