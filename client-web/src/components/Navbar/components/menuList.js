// Base imports
import React, { useState } from "react";
import clsx from "clsx";
import { Link, useLocation } from "react-router-dom";
// Material UI base
import { makeStyles } from "@material-ui/core/styles";

// Material UI components
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

// Material UI icons
import HomeIcon from "@material-ui/icons/Home";
import CreateIcon from "@material-ui/icons/Create";

// Project imports
import "./menuList.css";
import palette from "./../../../consts/palette";

const useStyles = makeStyles((theme) => ({
  listItemSelected: {
    color: palette.primary,
  },
  listItem: {
    color: "default",
  },
}));

const MenuList = (props) => {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = useState(useLocation().pathname);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <div className="container">
      <List className="main">
        <Link to="/home" className="link" onClick={props.click}>
          <ListItem button onClick={(event) => handleListItemClick(event, 1)}>
            <ListItemIcon
              className={clsx(
                classes.listItem,
                useLocation().pathname === "/home" && classes.listItemSelected
              )}
            >
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
        </Link>

        <Link to="/createcourse" className="link" onClick={props.click}>
          <ListItem button onClick={(event) => handleListItemClick(event, 2)}>
            <ListItemIcon
              className={clsx(
                classes.listItem,
                useLocation().pathname === "/createcourse" &&
                  classes.listItemSelected
              )}
            >
              <CreateIcon />
            </ListItemIcon>
            <ListItemText primary="Create course" />
          </ListItem>
        </Link>
      </List>
    </div>
  );
};

export default MenuList;
