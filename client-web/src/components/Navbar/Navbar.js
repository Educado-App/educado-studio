// Base imports 
import React,{useState} from 'react';
import clsx from 'clsx';

// Material UI base
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline, Container, Typography, useTheme, Button} from '@material-ui/core';

// Material UI components
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider'

// Material UI icons
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MenuIcon from '@material-ui/icons/Menu';

// Project imports 
import './Navbar.css';
import MenuList from './components/menuList';
import palette from '../../consts/palette';


// Redux stuff
import {connect} from 'react-redux';
import * as authActions from '../../store/actions/Auth';

// Constants
const drawerOpenWidth = 240;
const drawerClosedWidth = 70;

// Material UI Styles 
const useStyles = makeStyles((theme) => ({
    // Root element styling
    root: {
        display: 'flex', // Use flexbox for positioning
        height: '100vh', // Specify that root element takes complete window hight. This ensures correct reactinos in sub elements.
    },
    // App bar styling for both when drawer is closed and open
    appBar: {
        zIndex: theme.zIndex.drawer + 1, // Make sure that the app bar has higher index than drawer, when drawer is closed
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      },
    appBarShift: {
        marginLeft: drawerOpenWidth, // Give the appbar a left margin of the drawer width when drawer is open
        width: `calc(100% - ${drawerOpenWidth}px)`, // Calculate the width when drawer is open
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    // Toolbar styling
    toolbar: {
        backgroundColor: palette.primary,
        paddingRight: '0px', // keep right padding when drawer is closed
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    // Drawer styling
    drawerClosed: {
        overflowX: 'hidden',
        position: 'relative',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          width: drawerClosedWidth, // Fixed width of the drawer when closed
    },
    drawerOpen: {
        position: 'relative',
        whiteSpace: 'nowrap', // Make sure that the elements don't wrap
        width: drawerOpenWidth, // Fixed width of the drawer when open
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
    })},
    
      appBarSpacer: theme.mixins.toolbar, // Gets minimum height from toolbar object. Use to layout elements underneeth toolbar

      content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
      },
      // Title
      title: {
          position: 'relative',
          marginLeft: `calc(50% - ${drawerClosedWidth}px)`,
      },
      barIcon: {
          position: 'relative',
          marginLeft: '0px'
      },
      barLogoutButton: {
          position: 'absolute',
          right: '10px',
      }
    }))




const Navbar = (props) => {
    // Constants
    const classes = useStyles();

    // State management 
    const [drawerState,setDrawerState] = useState(false);

    // Functions
    const handleDrawerOpen = () => {
        setDrawerState(true);
      };
      const handleDrawerClose = () => {
        setDrawerState(false);
      };
    

    const RenderDrawerButton = () => {
        if (drawerState) {
            return (
                <IconButton className={classes.barIcon} onClick={handleDrawerClose}>
                    <ChevronLeftIcon></ChevronLeftIcon>
                </IconButton>
            )
        } else {
            return (
                <IconButton className={classes.barIcon} onClick={handleDrawerOpen}>
                    <MenuIcon></MenuIcon>
                </IconButton>     
            )
        }
    }  
    
    // Main return JSX object 
    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar className={clsx(classes.appBar, drawerState && classes.appBarShift)} position="absolute"> 
                <Toolbar className={classes.toolbar}>
                    
                    <RenderDrawerButton />
                    
                    <Typography variant="h5" align='center' className={classes.title}>Colibri</Typography>
                    <Button className={classes.barLogoutButton} href="/api/logout">Logout</Button>
                    
                </Toolbar>
            </AppBar>
            
            <Drawer 
            variant="permanent" 
            open={drawerState} 
            classes={{paper: clsx(classes.drawerClosed,drawerState && classes.drawerOpen)}}
            >
                <div className={classes.appBarSpacer} />
                <Divider />
                <MenuList click={handleDrawerClose}></MenuList>
            </Drawer>

            

            <main className={classes.content}>
                <Container maxWidth="xl" >
                    <div className={classes.appBarSpacer}></div>
                    {props.children}
                </Container>
            </main>
        </div>
    )
}

function mapStateToProps(state) {
    return {auth: state.auth};
}


export default connect(mapStateToProps)(Navbar);