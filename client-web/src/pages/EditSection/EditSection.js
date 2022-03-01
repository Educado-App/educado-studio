// Base imports
import React,{ Component} from 'react';
import {connect} from 'react-redux';

// Material UI base
import { withStyles } from '@material-ui/core/styles';
import * as courseActions from '../../store/actions/Course';
import {DragDropContext} from 'react-beautiful-dnd';

// Material UI components
import {Card, Typography, Divider} from '@material-ui/core';


// Material UI icons

// Project imports 
import CreateComponent from './CreateComponent';
import ComponentBucket from './ComponentBucket'

const useStyles = (theme) => ({
        root: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '10px',
        },
        container: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center'
        },
        bottom_card: {
            width: '50%',
            minWidth: 740,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: '10px',
            marginLeft: '10px',
            marginRight: '10px',
        }
});


class EditSection extends Component {
    
    state = {
        reloadTrigger: false,
    }

    onTriggerReload = () => {
        this.setState({
            ...this.state,
            reloadTrigger: !this.state.reloadTrigger
        })
    }

    async componentDidMount() {
        await this.props.getAllComponents(this.props.course.activeSection.components);
        }

    async componentDidUpdate(prevProps,prevState){
        if (prevState.reloadTrigger !== this.state.reloadTrigger) {
            await this.props.getAllComponents(this.props.course.activeSection.components);
        }
        }

        onDragEnd = async result => {
          // To do
          const {destination, source, draggableId} = result; // Get info from result
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
  
          await this.props.updateComponentsOrder(newTaskIds,this.props.course.activeSection._id)
  
          this.setState({
              ...this.state,
              reloadTrigger: !this.state.reloadTrigger
          })
          return;
  
      }
    

    render() {
        const {classes} = this.props;
      return(
        <div className={classes.root}>
            <Typography variant='h3' data-value={this.props.course.activeSection._id}>{this.props.course.activeSection.title}</Typography>
            <Divider></Divider>
            <div className={classes.container}>
                <Card className={classes.bottom_card}>
                    <DragDropContext
                        onDragEnd={this.onDragEnd}
                    >
                        <ComponentBucket trigger={this.onTriggerReload} componentsList={this.props.course.sectionComponents} ></ComponentBucket>
                    </DragDropContext>
                </Card>
            </div>
      <CreateComponent trigger={this.onTriggerReload}></CreateComponent>
      </div>
      )  
}
}


function mapStateToProps(state) {
    return {course: state.course};
  }

export default connect(mapStateToProps,courseActions)(withStyles(useStyles,{withTheme: true})(EditSection));

