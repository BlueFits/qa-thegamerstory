import React, { useState } from "react";
import Typography from "../Typography/Typography";
import ButtonA from "../ButtonA/ButtonA";
import Link from "next/link";
import { useSelector } from "react-redux";
import { Menu, MenuItem } from "@material-ui/core";

const Nav = ({ query }) => {
    const user = useSelector(state => state.user);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    let userModule = (
        <li className="mx-8">
        <ButtonA disableElevation={true} clickHandler={handleClick}><Typography type="r2">Profile</Typography></ButtonA>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem style={{ width: 200 }} onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
        </li>
    );

    if (!user.token) {
        userModule = (
            <li className="mx-8"><Link href={"/auth/login"} passHref><a>
                <ButtonA disableElevation={true}><Typography type="r2">LOG IN</Typography></ButtonA>
            </a></Link></li>
        );
    }

    return (
        <ul style={{ width: "100vw", marginTop: 30 }} className="flex justify-end items-center px-20 fixed">
            <li className="mx-8"><Link href={"/" + query[0]} passHref><a><Typography type="r2">HOME</Typography></a></Link></li>
            <li className="mx-8"><Link href={"/" + query[0] + "/characters"} passHref><a><Typography type="r2">CHARACTERS</Typography></a></Link></li>
            <li className="mx-8"><Link href={"/" + query[0] + "/history"} passHref><a><Typography type="r2">HISTORY</Typography></a></Link></li>
            {userModule}
        </ul>
    );
};

export default Nav;