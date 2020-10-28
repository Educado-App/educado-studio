import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import {createMuiTheme,MuiThemeProvider} from '@material-ui/core/styles';
import Navbar from './components/Navbar/Navbar';

import Home from './pages/Home/Home';
import Createcourse from './pages/Createcourse/Createcourse';
import Settings from './pages/Settings/Settings';
import Statistics from './pages/Statistics/Statistics';
import Overview from './pages/Overview/Overview';

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




class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    if (this.props.auth.loginStatus === false) {
      return (<Login></Login>);
    } else {
      return (
        <React.Fragment>
          <CssBaseline />
          <MuiThemeProvider theme={theme}>
            <Router>
                <Navbar>
                  <Switch>
                    <Route path="/home" component={Home} exact></Route>
                    <Route path="/createcourse" component={Createcourse} exact></Route>
                    <Route path="/statistics" component={Statistics} exact></Route>
                    <Route path="/settings" component={Settings} exact></Route>
                    <Route path="/overview" component={Overview} exact></Route>
                    <Route path="/auth/google/callback" component={Home}></Route>
                  </Switch>
                </Navbar>
            </Router>
          </MuiThemeProvider>
        </React.Fragment>
      );
    }
  }
}

function mapStateToProps(state) {
  return {auth: state.auth};
}

export default connect(mapStateToProps,authActions)(App);
