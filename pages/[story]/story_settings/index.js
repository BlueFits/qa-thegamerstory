import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import pageStyles from "./story_settings.module.css";
import Layout from "../../../components/Layout/Layout";
import Typography from '../../../components/Typography/Typography';
import { serverURL } from '../../../config/Server';
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from 'react';
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import { Delete, Add } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    root: {
      width: 1000,
      backgroundColor: theme.palette.background.paper,
      color: "#fff"
    },
  }));

export const getServerSideProps = async (context) => {
    try {
        const res = await fetch(serverURL + "/api/hub/get_hub?hubName=" + context.query.story);
        if (!res.ok) {
            const errData = await res.json();
            return {
                props: {
                    err: errData.error,
                },
            };
        } else {
            const resData = await res.json();
            console.log(resData);
            return {
                props: {
                    hub: resData,
                },
            };
        }
    } catch(err) {
        if (err) throw err;
    }
};

const Index = ({ hub }) => {
  const classes = useStyles();
  const user = useSelector(state => state.user);
  const router = useRouter();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
      const fetchData = async () => {
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
      }
      console.log("!!!", hub);
      fetchData();
  }, []);

  const deleteHandler = async (blogID) => {
    const response = await fetch(serverURL + "/api/blog/delete", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            blogID,
        }),
    })
    const responseData = await response.json();
    if (!response.ok) {
        alert(responseData.error);
    } else {
        const update = [...blogs];
        const updatedList = update.filter(blog => blog._id !== blogID);
        setBlogs(updatedList);
        console.log("Successfully deleted");
        console.log(responseData);
    }
  };

  return (
    <Layout>
        <div className={pageStyles.pageContainer}>
            <div style={{width: 1000}} className="mb-8 flex justify-start items-center">
                <Typography>My Blogs</Typography>
            </div>
            <div className={classes.root}>
                <List component="nav" aria-label="main mailbox folders">
                    {blogs.map((blog, index) => {
                        if (blog.hub === router.query.story) {
                            if (blog.blogTitle === "") {
                                return (
                                    <ListItem button>
                                        <div className="flex justify-between items-center w-full">
                                            <Link href={`/${router.query.story}/${blog._id}/edit`}>
                                                <a className="w-full" >
                                                    <ListItemText primary={"No Title"} />
                                                    <ListItemText primary={`Date Created: ${moment(blog.createdAt).format('MMMM Do YYYY, h:mm:ss a')}`} />
                                                </a>
                                            </Link> 
                                            <div onClick={deleteHandler.bind(this, blog._id)} style={{ width: 50 }} className="flex justify-center items-center">
                                                <Delete />
                                            </div>
                                        </div>
                                    </ListItem>
                                );
                            } else {
                                return (
                                    <ListItem button>
                                        <div className="flex justify-between items-center w-full">
                                            <Link href={`/${router.query.story}/${blog._id}/edit`}>
                                                <a className="w-full" >
                                                    <ListItemText primary={blog.blogTitle} />
                                                    <ListItemText primary={`Date Created: ${moment(blog.createdAt).format('MMMM Do YYYY, h:mm:ss a')}`} />
                                                </a>
                                            </Link>
                                            <div onClick={deleteHandler.bind(this, blog._id)} style={{ width: 50 }} className="flex justify-center items-center">
                                                <Delete />
                                            </div>
                                        </div>
                                    </ListItem>
                                );
                            }
                        }
                    })}
                </List>
            </div>
            <div style={{width: 1000}} className="mt-12 mb-8 flex justify-start items-center">
                <Typography>Hub Settings</Typography>
            </div>
            <div className={classes.root}>
                <List component="nav" aria-label="main mailbox folders">
                    <ListItem>
                        <ListItemText><strong>Timeline</strong></ListItemText>
                        <div onClick={() => alert()} style={{ width: 50 }} className="flex justify-center items-center">
                            <Add />
                        </div>
                    </ListItem>
                    {hub.history.map((item, index) => (
                        <ListItem key={index} button>
                            <div className="flex justify-between items-center w-full">
                                <a className="w-full" >
                                    <ListItemText primary={item} />
                                </a>
                                <div onClick={() => alert()} style={{ width: 50 }} className="flex justify-center items-center">
                                    <Delete />
                                </div>
                            </div>
                        </ListItem>
                    ))}
                </List>
            </div>
        </div>
    </Layout>
  );
}

export default Index;