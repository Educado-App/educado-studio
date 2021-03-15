import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import * as courseActions from './../../store/actions/Course';
import Fab from '@material-ui/core/Fab';
import {connect} from 'react-redux';
import AddIcon from '@material-ui/icons/Add';

import palette from './../../consts/palette';

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
  fabPadding: {      
  marginLeft: '10px',
  marginRight: '10px',
  marginBottom: '10px',
  justifyContent: 'right',
  display: 'flex',
  backgroundColor: palette.primary
  }
}));

  const SimplePopover = (props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [title,setTitle] = useState('');

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const handleCreateSection = async () => {
    await props.createSection(title, props.course.activeCourse._id);
    props.trigger();
  }

  const handleTitle = (event) => {
    setTitle(event.target.value);
}

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Fab 
      aria-describedby={id} 
      variant="extended" 
      color="primary" 
      onClick={handleClick} 
      className={classes.fabPadding}>
        <AddIcon></AddIcon>
        Add Section
      </Fab>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <TextField 
            required
            id="outlined-multiline-static"
            variant="outlined"
            label="Section Name"
            multiline
            rowsMax={1}
            rows={1}
            onChange={handleTitle}
//            onChange={this.onChangeDescription}
//            className={classes.top_left_row_input}
        />
        <Button onClick={handleCreateSection} variant="contained" component="span">Create</Button>
      </Popover>
    </div>
  );
}

function mapStateToProps(state) {
    return {course: state.course};
  }

  export default connect(mapStateToProps,courseActions)(SimplePopover);
