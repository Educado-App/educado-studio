import React, {Component, useEffect, useState} from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import {createMuiTheme,MuiThemeProvider} from '@material-ui/core/styles';
import Navbar from './components/Navbar/Navbar';

import Home from './pages/Home/Home';
import Createcourse from './pages/Createcourse/Createcourse';
import Settings from './pages/Settings/Settings';
import Statistics from './pages/Statistics/Statistics';
import EditCourse from './pages/EditCourse/EditCourse';
import Loading from './pages/Loading/Loading';

import palette from './consts/palette';

import * as authActions from './store/actions/Auth';
import { connect } from 'react-redux';
import Login from './pages/Login/Login';


const theme = createMuiTheme({
  palette: {
      primary: {
        main: '#FFFFF',
        //light:
        //dark:
      },
  },
  selected: {
    backgroundColor: palette.faded,
  }
})

const App = (props) => {


  useEffect(() => {
    props.fetchUser()
      .then(console.log('Inside fetch stuff'))
      .then(console.log(props.auth.loginStatus))
  },[]);

  let routes = (
    <Switch>
      <Route path="/login" component={Login}></Route>
      <Redirect to="/login"></Redirect>
    </Switch>
  );

  if (props.auth.loginStatus === 'what') {
    
    routes = (
      <Switch>
        <Route path="/loading" component={Loading}></Route>
        <Redirect to="/Loading"></Redirect>
      </Switch>
    )
  }

  if (props.auth.loginStatus === true ) {
    routes = (
      <Navbar>
        <Switch>
          <Route path="/home" component={Home} exact></Route>
          <Route path="/createcourse" component={Createcourse} exact></Route>
          <Route path="/statistics" component={Statistics} exact></Route>
          <Route path="/settings" component={Settings} exact></Route>
          <Route path="/edit/course" component={EditCourse} exact></Route>
          <Route path="/auth/google/callback" component={Home}></Route>
        </Switch>
      </Navbar>
    );
  } 

  return (
      <React.Fragment>
        <CssBaseline />
        <MuiThemeProvider theme={theme}>
                {routes}
        </MuiThemeProvider>
      </React.Fragment>
  );
}

function mapStateToProps(state) {
  return {auth: state.auth};
}

export default connect(mapStateToProps,authActions)(App);
