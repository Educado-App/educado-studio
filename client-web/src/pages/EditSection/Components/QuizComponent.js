import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Component } from "react";
import { Card, Fab } from "@material-ui/core";
import { connect } from "react-redux";
import * as courseActions from "../../../store/actions/Course";

// Material UI components
import uploadFileToComponent from "../../../hooks/uploadFileToComponent";
import getPresignedUrl from "../../../hooks/getPresignedUrl";
import DeleteComponentButton from "./DeleteComponentButton";
import PublishIcon from "@material-ui/icons/Publish";

const useStyles = makeStyles((theme) => ({

}));


const QuizComponent = (props) => {
    
}