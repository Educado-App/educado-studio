import React, {} from 'react';
import './App.css';
import {Switch, Route, Redirect} from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import {createMuiTheme,MuiThemeProvider} from '@material-ui/core/styles';
import Navbar from './components/Navbar/Navbar';

import Home from './pages/Home/Home';
import Createcourse from './pages/Createcourse/Createcourse';
import Settings from './pages/Settings/Settings';
import Statistics from './pages/Statistics/Statistics';
import EditCourse from './pages/EditCourse/EditCourse';
import Loading from './pages/Loading/Loading';
import EditSection from './pages/EditSection/EditSection';

import palette from './consts/palette';

import * as authActions from './store/actions/Auth';
import { connect } from 'react-redux';
import Login from './pages/Login/Login';
import { Component } from 'react';


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

class App extends Component {

  // Run fetchUser() on every mount of App
  // Ensures to ALWAYS check if user is signed in or not
  componentDidMount(){
    this.props.fetchUser()
  }

  render() {
      // Routes if user is not signed in
  let routes = (
    <Switch>
      <Route path="/login" component={Login}></Route>
      <Redirect to="/login"></Redirect>
    </Switch>
  );
  
  // Routes while application is checking if user is signed in
  if (this.props.auth.loginStatus === 'checking') {
    routes = (
      <Switch>
        <Route path="/loading" component={Loading}></Route>
        <Redirect to="/Loading"></Redirect>
      </Switch>
    )
  }

  // Routes when user is signed in
  if (this.props.auth.loginStatus === true ) {
    routes = (
      <Navbar>
        <Switch>
          <Route path="/home" component={Home} exact></Route>
          <Route path="/createcourse" component={Createcourse} exact></Route>
          <Route path="/statistics" component={Statistics} exact></Route>
          <Route path="/settings" component={Settings} exact></Route>
          <Route path="/edit/course" component={EditCourse} exact></Route>
          <Route path="/edit/section" component={EditSection} exact></Route>
          <Route path="/auth/google/callback" component={Home}></Route>
          <Redirect to="/home"></Redirect>
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
  )}
}

function mapStateToProps(state) {
  return {auth: state.auth};
}

export default connect(mapStateToProps,authActions)(App);
