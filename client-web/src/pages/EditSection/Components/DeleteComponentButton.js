import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Component } from "react";
import { connect } from "react-redux";
import Fab from "@material-ui/core/Fab";
import DeleteIcon from "@material-ui/icons/Delete";
import * as courseActions from "../../../store/actions/Course";

// Material UI components
import { Button, Typography, Popover } from "@material-ui/core";

const useStyles = (theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: "150px",
    width: "200px",
  },
  input: {
    display: "none",
  },
});

class DeleteComponentButton extends Component {
  state = {
    id: "",
    anchorEl: null,
    deleteComponent: "",
  };

  handleDeleteComponent = async (event, component_id) => {
    await this.props.deleteComponent(
      component_id,
      this.props.course.activeSection._id
    );
  };

  handlePopoverClick = (event) => {
    this.setState({
      ...this.state,
      anchorEl: event.currentTarget,
      deleteComponent: event.target.dataset.value,
    });
  };

  handleClose = () => {
    this.setState({
      ...this.state,
      anchorEl: null,
    });
  };

  render() {
    const open = Boolean(this.state.anchorEl);
    const id = open ? "simple-popover" : undefined;

    return (
      <div>
        <Fab
          size="small"
          variant="extended"
          onClick={this.handlePopoverClick}
          data-value={this.props.component_id}
        >
          <DeleteIcon />
          Delete
        </Fab>
        <Popover
          id={id}
          open={open}
          anchorEl={this.state.anchorEl}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <Typography>Are you sure?</Typography>
          <Button
            onClick={(event) =>
              this.handleDeleteComponent(event, this.props.component_id)
            }
          >
            <Typography>Yes!</Typography>
          </Button>
          <Button onClick={this.handleClose}>
            <Typography>No!</Typography>
          </Button>
        </Popover>
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
)(withStyles(useStyles, { withTheme: true })(DeleteComponentButton));
