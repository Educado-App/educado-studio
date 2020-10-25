// Base imports 
import React,{useState} from 'react';
import clsx from 'clsx';

// Material UI base
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline, Container, Typography, useTheme } from '@material-ui/core';

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
        paddingRight: 70, // keep right padding when drawer is closed
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingRight: 8,
        ...theme.mixins.toolbar, // Get height and width from toolbar 
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
          alignSelf: 'center',
          fontSize: 20,

      },
      titleContainer: {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center', // Center column
          justifyContent: 'flex-start', // Left start
      },
      barMenuIconContainer: {
          width: '33.3%',
          position: 'relative',
      },
      barTitleContainer: {
          width: '33.3%',
          position: 'relative',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center'
      },
      barStuffContainer: {
          width: '33.3%',
          position: 'relative',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end'
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
                <IconButton onClick={handleDrawerClose}>
                    <ChevronLeftIcon></ChevronLeftIcon>
                </IconButton>
            )
        } else {
            return (
                <IconButton onClick={handleDrawerOpen}>
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
                    <div className={classes.barMenuIconContainer}>
                        <RenderDrawerButton />
                    </div>
                    <div className={classes.barTitleContainer}>
                        <Typography className={classes.title}>Course Creator</Typography>
                    </div>
                    <div className={classes.barStuffContainer}>
                        <a href="/auth/google" >Login with Google</a>
                    </div>
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


export default Navbar;