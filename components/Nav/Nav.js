import React, { useState } from "react";
import Typography from "../Typography/Typography";
import ButtonA from "../ButtonA/ButtonA";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../services/modules/User/userSlice";
import { Menu, MenuItem } from "@material-ui/core";
import { serverURL } from "../../config/Server";
import { useRouter } from "next/router";

const Nav = ({ query }) => {
    const router = useRouter();
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleItemClick = async (type) => {
        setAnchorEl(null);
        switch (type) {
            case "logout":
                await dispatch(logout());
                window.location.href="/";
                break;
            case "create":
                const createRes = await fetch(serverURL + "/api/blog/create", {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        hub: router.query.story,
                    }),
                });
                const createResData = await createRes.json();
                if (createRes.ok) {
                    const addedBlogRes = await fetch(serverURL + "/api/user/update", {
                        method: "POST",
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            userID: user.user._id,
                            blogID: createResData._id,
                        }),
                    });
                    if (addedBlogRes.ok) {
                        //add story and href
                        window.location.href = `/${router.query.story}/${createResData._id}/edit`
                    }
                }
                break; 
        }
    };

    let userModule = (
        <li className="mx-8">
        <ButtonA disableElevation={true} clickHandler={handleClick}><Typography type="r2">Profile</Typography></ButtonA>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
            >
                <MenuItem style={{ width: 200 }} onClick={handleItemClick.bind(this, "create")}>Create Story</MenuItem> 
                <MenuItem>
                    <Link href={"/" + query[0] + "/story_settings"} passHref><a>Story Settings</a></Link>
                </MenuItem>
                <MenuItem onClick={handleItemClick.bind(this, "logout")}>Logout</MenuItem>
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