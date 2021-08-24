import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import pageStyles from "./myblogs.module.css";
import Layout from "../../../components/Layout/Layout";
import Typography from '../../../components/Typography/Typography';
import { serverURL } from '../../../config/Server';
import { useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 1000,
    backgroundColor: theme.palette.background.paper,
    color: "#fff"
  },
}));

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

const index = () => {
  const classes = useStyles();
  const user = useSelector(state => state.user);
  const router = useRouter();
  const [blogs, setBlogs] = useState([]);

  useEffect(async () => {
    try {
        const response = await fetch(serverURL + "/api/user/get_data?id=" + user.user._id);
        const responseData = await response.json();
        if (!response.ok) {
            alert("error");
        } else {
            setBlogs(responseData.blogs.reverse());
        }
    } catch(err) {
        if (err) throw err;
    }
  }, []);

  return (
    <Layout>
        <div className={pageStyles.pageContainer}>
            <div style={{width: 1000}} className="mb-8 flex justify-start items-center">
                <Typography>My Blogs</Typography>
            </div>
            <div className={classes.root}>
                <List component="nav" aria-label="main mailbox folders">
                    {blogs.map((blog, index) => {
                        if (blog.blogTitle === "") {
                            return (
                                <ListItem button>
                                    <Link href={`/${router.query.story}/${blog._id}/edit`}>
                                        <a>
                                            <ListItemText primary={"No Title"} />
                                            <ListItemText primary={`Date Created: ${moment(blog.createdAt).format('MMMM Do YYYY, h:mm:ss a')}`} />
                                        </a>
                                    </Link>
                                </ListItem>
                            );
                        } else {
                            return (
                                <ListItem button>
                                    <Link href={`/${router.query.story}/${blog._id}/edit`}>
                                        <a>
                                            <ListItemText primary={blog.blogTitle} />
                                            <ListItemText primary={`Date Created: ${moment(blog.createdAt).format('MMMM Do YYYY, h:mm:ss a')}`} />
                                        </a>
                                    </Link>
                                </ListItem>
                            );
                        }
                    })}
                </List>
            </div>
        </div>
    </Layout>
  );
}

export default index;