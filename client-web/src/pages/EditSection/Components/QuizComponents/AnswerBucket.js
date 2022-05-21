// Base imports
import React, {useState} from "react";
import { connect } from "react-redux";
import * as courseActions from "../../../../store/actions/Course";

// Material UI components
import { List, ListItem } from "@material-ui/core";

// Project imports
import AnswersSegment from "./AnswersSegment";


const AnswerBucket = (props) => {
  const [answers, setAnswers] = useState([]);

  const answerChangeHandler = (obj) => {

  };

  return (
      <List type="dense">
        {props.answersList.map((answer) => {
          let answerToRender = (
              <div>
                <AnswersSegment
                  answer_id={answer._id}
                  quiz_id={props.quiz_id}
                />
              </div>
          );
          let keyValue;
            if (!answer._id) {
              keyValue = "temp";
            } else {
              keyValue = answer._id;
            }

          return (
              <ListItem
                  button
                  disableRipple
                  key={keyValue}
              >
                {answerToRender}
              </ListItem>
          );
        })
        }
      </List>
  );
};


function mapStateToProps(state) {
  return { course: state.course };
}

export default connect(mapStateToProps, courseActions)(AnswerBucket);