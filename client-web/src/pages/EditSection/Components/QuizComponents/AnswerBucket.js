// Base imports
import React, {useState} from "react";
import { connect } from "react-redux";
import * as courseActions from "../../store/actions/Course";

// Material UI components
import { List, ListItem } from "@material-ui/core";

// Project imports
import AnswersSegment from "./AnswersSegment";


const AnswerBucket = (props) => {
  const [answers, setAnswers] = useState([]);

  const answerChangeHandler = (obj) => {

  };

  return (
      <List>
        {props.answerList.map((answer) => (
            <ListItem
                button
                disableRipple
            >
              <AnswersSegment
                  text={answer.textAnswer}
                  check={answer.correctAnswer}
                  audio={answer.audioAnswer}
                  onAnswerChange={answerChangeHandler}
              />
            </ListItem>
        ))
        }
      </List>
  );
};


function mapStateToProps(state) {
  return { course: state.course };
}

export default connect(mapStateToProps, courseActions)(AnswerBucket);