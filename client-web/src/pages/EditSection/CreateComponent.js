// Base imports
import React from "react";
import * as courseActions from "./../../store/actions/Course";
import { connect } from "react-redux";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import ImageIcon from "@material-ui/icons/Image";
import RecordVoiceOverIcon from "@material-ui/icons/RecordVoiceOver";
import VideocamIcon from "@material-ui/icons/Videocam";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DnsIcon from '@material-ui/icons/Dns';



const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
  paper: {
    border: "1px solid #d3d4d5",
  },
  createComponent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const CreateComponent = (props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCreateText = async (event) => {
    await props.createComponent("TEXT", props.course.activeSection._id);
    props.trigger();
  };

  const handleCreateImage = async (event) => {
    await props.createComponent("IMAGE", props.course.activeSection._id);
    props.trigger();
  };

  const handleCreateVideo = async (event) => {
    await props.createComponent("VIDEO", props.course.activeSection._id);
    props.trigger();
  };

  const handleCreateAudio = async (event) => {
    await props.createComponent("AUDIO", props.course.activeSection._id);
    props.trigger();
  };

  //Quiz creation handler function made by CCT2 G3
  const handleCreateQuiz = async (event) => {
    await props.createComponent("QUIZ", props.course.activeSection._id);
    props.trigger();
  }

  //   const handleTitle = (event) => {
  //     setTitle(event.target.value);
  // }

  return (
    <div>
      <div className={classes.createComponent}>
        <Fab
          color="primary"
          aria-label="add"
          aria-controls="customized-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <AddIcon />
        </Fab>
      </div>
      <Menu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem button onClick={handleCreateText}>
          <ListItemIcon>
            <TextFieldsIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Text" />
        </MenuItem>
        <MenuItem button onClick={handleCreateImage}>
          <ListItemIcon>
            <ImageIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Image" />
        </MenuItem>
        <MenuItem button onClick={handleCreateAudio}>
          <ListItemIcon>
            <RecordVoiceOverIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Audio" />
        </MenuItem>
        <MenuItem button onClick={handleCreateVideo}>
          <ListItemIcon>
            <VideocamIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Video" />
        </MenuItem>

        <MenuItem button onClick={handleCreateQuiz}>
          <ListItemIcon>
            <DnsIcon fontSize="small"/>
          </ListItemIcon>
            <ListItemText primary="Quiz" />
        </MenuItem>

      </Menu>
    </div>
  );
};

function mapStateToProps(state) {
  return { course: state.course };
}

export default connect(mapStateToProps, courseActions)(CreateComponent);
