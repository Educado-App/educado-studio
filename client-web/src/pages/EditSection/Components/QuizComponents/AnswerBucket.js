// Base imports
import React, {useState} from "react";
import { connect } from "react-redux";
import * as courseActions from "../../store/actions/Course";

// Project imports
import AnswersSegment from "./AnswersSegment";


const AnswerBucket = (props) => {
  const [answers, setAnswers] = useState([]);

  const answerChangeHandler = (obj) => {
    setAnswers(obj);
  };

  return (
      {props.answerList.map((answer) => (
          <AnswersSegment
              onAnswerChange={answerChangeHandler}
          />
        ))
      }
  );
};