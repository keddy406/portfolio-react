import React from "react";
import { Link } from "react-router-dom";
// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// import ExpandLessIcon from "@material-ui/icons/ExpandLess";
// import ContactsIcon from "@material-ui/icons/Contacts";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import { AiFillWechat } from "react-icons/ai";
import { FaTelegram } from "react-icons/fa";
import { RiLineFill } from "react-icons/ri";

import { storage } from "./firebase";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.gray,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.black,
      },
    },
  },
}))(MenuItem);

function Navbar() {
  // const [toggle, setToggle] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const qrcode = (props) => {
    //get firestore storage url
    storage
      .ref(`${props}.jpg`)
      .getDownloadURL()
      .then((url) => {
        // Do something with the URL ...
        window.open(url, url, "width=300,height=300");
      });
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="navbar">
      <Link className="navbar__option" to="/">
        <p>首頁</p>
      </Link>
      <Link className="navbar__option" to="/projects">
        <p>作品</p>
      </Link>
      {/* <div className="navbar__option" onClick={() => setToggle(!toggle)}>
        <ContactsIcon />
        {!toggle ? <ExpandMoreIcon /> : <ExpandLessIcon />}
        <p>
          {toggle && (
            <div className="navbar__contact">
              <p>微信: twkccy1990</p>
              <p>Line: twkccy1990</p>
              <p>Mobile: (+63)09983996912</p>
            </div>
          )}
        </p>
      </div> */}
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        onClick={handleClick}
      >
        聯絡我
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem onClick={() => qrcode("wechat")}>
          <ListItemIcon>
            <AiFillWechat fontSize="large" />
          </ListItemIcon>
          <ListItemText primary="twkccy1990" />
        </StyledMenuItem>
        <StyledMenuItem onClick={() => qrcode("line")}>
          <ListItemIcon>
            <RiLineFill fontSize="large" />
          </ListItemIcon>
          <ListItemText primary="douknowccy" />
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemIcon>
            <FaTelegram fontSize="large" />
          </ListItemIcon>
          <ListItemText primary="(+63) 9983996912" />
        </StyledMenuItem>
      </StyledMenu>
      {/**/}
    </div>
  );
}

export default Navbar;
