// Base imports
import React,{useState,useRef} from 'react';
import clsx from 'clsx';
import {Link, useLocation, NavLink} from 'react-router-dom';
// Material UI base
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';

// Material UI components
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

// Material UI icons
import HomeIcon from '@material-ui/icons/Home';
import CreateIcon from '@material-ui/icons/Create';
import BarChartIcon from '@material-ui/icons/BarChart';
import SettingsIcon from '@material-ui/icons/Settings';

// Project imports 
import './menuList.css';
import palette from './../../../consts/palette';



const useStyles = makeStyles((theme) => ({
    listItemSelected: {
        color: palette.primary,
    },
    listItem: {
        color: 'default',
    },
}))



const MenuList = (props) => {
    const classes = useStyles();
    const [selectedIndex, setSelectedIndex] = useState(useLocation().pathname);

    const handleListItemClick = (event,index) => {
        setSelectedIndex(index)
    };

    return (
        <div className="container">
            <List className="main">
                <Link to="/home" className="link" onClick={props.click}>
                    <ListItem button onClick={(event) => handleListItemClick(event,1)}>
                        <ListItemIcon className={clsx(classes.listItem,useLocation().pathname === "/home" && classes.listItemSelected)}>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItem>
                </Link>
                
                <Link to="/createcourse" className="link" onClick={props.click}>
                    <ListItem button onClick={(event) => handleListItemClick(event,2)}>
                        <ListItemIcon className={clsx(classes.listItem,useLocation().pathname === "/createcourse" && classes.listItemSelected)}>
                            <CreateIcon />
                        </ListItemIcon>
                        <ListItemText primary="Create course" />
                    </ListItem>
                </Link>

                <Link to="/statistics" className="link" onClick={props.click}>
                    <ListItem button onClick={(event) => handleListItemClick(event,3)}>
                        <ListItemIcon className={clsx(classes.listItem,useLocation().pathname === "/statistics" && classes.listItemSelected)}>
                            <BarChartIcon />
                        </ListItemIcon>
                        <ListItemText primary="Statistics" />
                    </ListItem>
                </Link>

                <Link to="/settings" className="link" onClick={props.click}>
                    <ListItem button onClick={(event) => handleListItemClick(event,4)}>
                        <ListItemIcon className={clsx(classes.listItem,useLocation().pathname === "/settings" && classes.listItemSelected)}>
                            <SettingsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Settings" />
                    </ListItem>
                </Link>
            </List>
        </div>
    )
}


export default MenuList;