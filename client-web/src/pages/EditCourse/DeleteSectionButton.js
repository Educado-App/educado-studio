import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Component } from 'react';
import {connect} from 'react-redux';
import * as courseActions from '../../store/actions/Course';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';

// Material UI components
import {Button, Typography, Popover} from '@material-ui/core';

import palette from './../../consts/palette';


const useStyles = (theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: "150px",
    width: "200px"
  },
  input: {
    display: 'none'
  },
  fabPadding: {      
    marginLeft: '10px',
    marginRight: '10px',
    marginBottom: '10px',
    float: 'right',
    display: 'flex'
    },
    button: {
      backgroundColor: palette.complementary
    }
  });


class DeleteSectionButton extends Component {
    state = {
        id: '',
        anchorEl: null,
        deleteSection: '',
    }

    handleDeleteSection = async (event, section_id) => {
        await this.props.deleteSection(section_id,this.props.course.activeCourse._id);
    }

    handlePopoverClick = (event) => {
        this.setState({
            ...this.state,
            anchorEl: event.currentTarget,
            deleteSection: event.target.dataset.value,
        })
    }

    handleClose = () => {
        this.setState({
            ...this.state,
            anchorEl: null
        })
    }


  render() {
    const {classes} = this.props;
    const open = Boolean(this.state.anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div className={classes.fabPadding}>
        <Button className={classes.button} variant="contained" onClick={this.handlePopoverClick} data-value={this.props.section_id}>
        <DeleteIcon />
        </Button>
        <Popover
            id={id}
            open={open}
            anchorEl={this.state.anchorEl}
            onClose={this.handleClose}
            anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
            }}
            transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
            }}
        >
            <Typography>Are you sure?</Typography>
            <Button onClick={event => this.handleDeleteSection(event,this.props.section_id)}>
                <Typography>Yes!</Typography>
            </Button>
            <Button onClick={this.handleClose}>
                <Typography>No!</Typography>
            </Button>
        </Popover>
        </div>
    );
  }
};


function mapStateToProps(state) {
  return {course: state.course};
}

export default connect(mapStateToProps,courseActions)(withStyles(useStyles,{withTheme: true})(DeleteSectionButton));


