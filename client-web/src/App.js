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
    
  }


  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <MuiThemeProvider theme={theme}>
          <Router>
            <div>
              <Navbar>
                <Switch>
                  <Route path="/home" component={Home} exact></Route>
                  <Route path="/createcourse" component={Createcourse} exact></Route>
                  <Route path="/statistics" component={Statistics} exact></Route>
                  <Route path="/settings" component={Settings} exact></Route>
                  <Route path="/overview" component={Overview} exact></Route>
                </Switch>
              </Navbar>
            </div>
            
          </Router>
        </MuiThemeProvider>
      </React.Fragment>
    );
  }
}

export default App;
