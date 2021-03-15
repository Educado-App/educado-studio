import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Component } from 'react';
import { Card, Fab } from '@material-ui/core';
import {connect} from 'react-redux';
import * as courseActions from '../../../store/actions/Course';

// Material UI components
import uploadFileToComponent from '../../../hooks/uploadFileToComponent';
import getPresignedUrl from '../../../hooks/getPresignedUrl';
import DeleteComponentButton from './DeleteComponentButton';
import PublishIcon from '@material-ui/icons/Publish';

const useStyles = (theme) => ({
  root: {
    maxWidth: 720,
  },
  media: {
    width: "720px"
  },
  input: {
    display: 'none'
  },
  deleteButton: {
    marginLeft: '10px',
    marginRight: '10px',
    marginBottom: '10px',
    marginTop: '10px',
    display: 'flex',
    justifyContent: 'space-between',
}
  });


class AudioComponent extends Component {
  state = {
    componentId: this.props.id,
    presignedUrl: '',
  }

  async componentDidMount() {
    const presignedUrlFromServer = await getPresignedUrl(this.state.componentId);
    this.setState({
      ...this.state,
      presignedUrl: presignedUrlFromServer
  })
  }

  async componentDidUpdate(){
  }

  handleChangeFile = async (event) => {
    const file = event.target.files[0];
    const res = await uploadFileToComponent(file,this.state.componentId);
    const presignedUrlFromServer = await getPresignedUrl(this.state.componentId);
    this.setState({
        ...this.state,
        presignedUrl: presignedUrlFromServer
    })
  }

  render() {
    const {classes} = this.props;

    return (
      <Card className={classes.root}>
        <audio controls width="720" key={this.state.presignedUrl} className={classes.media}>
          <source type="audio/mp3" src={this.state.presignedUrl} />
      </audio>
        <input
                accept="audio/*"
                className={classes.input}
                id={this.state.componentId+"contained-button-file"}
                type="file"
                onChange={this.handleChangeFile}
              />
              <div className={classes.deleteButton}>
              <label htmlFor={this.state.componentId+"contained-button-file"} >
                <Fab size="small" variant="extended" component="span" color="primary">
                  <PublishIcon></PublishIcon>                 
                  Upload</Fab>
              </label>
              <DeleteComponentButton component_id={this.state.componentId} ></DeleteComponentButton>
              </div>
      </Card>
      
    );
  }
};


function mapStateToProps(state) {
  return {course: state.course};
}

export default connect(mapStateToProps,courseActions)(withStyles(useStyles,{withTheme: true})(AudioComponent));


