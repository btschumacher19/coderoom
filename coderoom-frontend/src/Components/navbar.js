import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { CustomThemeContext } from "../Themes/CustomThemeProvider";
import { Avatar, Switch } from "@material-ui/core";
import styled from "styled-components";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import PersonOutlineRoundedIcon from "@material-ui/icons/PersonOutlineRounded";
import Menu from "@material-ui/core/Menu";
import logo from "../Data/CodeRoom_Logo_Avatar.png";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const StyledApp = styled(AppBar)`
  background-color: ${(props) =>
    props.theme === "dark" ? "#2d2d2d" : undefined};
  width: 100%;
  right: 0;
`;

const HomeIcon = styled.img`
position: relative;
height: 90%;
cursor: pointer;

`

const MenuAppBar = (props) => {
  let history = useHistory();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const { currentTheme, setTheme } = useContext(CustomThemeContext);
  const isDark = Boolean(currentTheme === "dark");

  const handleThemeChange = (event) => {
    const { checked } = event.target;
    if (checked) {
      setTheme("dark");
    } else {
      setTheme("normal");
    }
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    props.clearUserData();
    history.push("/");
  };

  return (
    <div className={classes.root}>
      <StyledApp position="static" theme={currentTheme}>
        <Toolbar style={{paddingLeft: '10px', height: '2em'}}>
            <HomeIcon
            edge="start"
            className={classes.menuButton}
            // color="inherit"
            aria-label="menu"
            onClick={() => history.push("/dashboard")}
              alt="Home"
              src={logo}
              style={{ }}
              />
              {/* <Icon className="fas fa-home" />{" "} */}
          <Switch
            checked={isDark}
            onChange={handleThemeChange}
            name="checkedA"
            color="secondary"
            inputProps={{ "aria-label": "info checkbox" }}
          />

          <div style={{ marginLeft: "auto" }}>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              {props.user.first_name ? (
                <Avatar
                  src={props.user.first_name.toUpperCase()}
                  alt={props.user.username.toUpperCase()}
                />
              ) : (
                <PersonOutlineRoundedIcon />
              )}
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </StyledApp>
    </div>
  );
};

export { MenuAppBar };
