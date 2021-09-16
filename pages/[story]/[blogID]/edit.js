import React, { useState } from "react";
import { Add } from "@material-ui/icons";
import ButtonA from "../../../components/ButtonA/ButtonA";
import Typography from "../../../components/Typography/Typography";
import ImageDisplay from "../../../components/ImageDisplay/ImageDisplay";
import styles from "./edit.module.css";
import TextareaAutosize from "react-textarea-autosize";
import { Fab, Select, FormControl, MenuItem, InputLabel, Button } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { serverURL } from "../../../config/Server";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Banner from "../../../components/Banner/Banner";
import Modal from '@material-ui/core/Modal';

export const getServerSideProps = async (context) => {
    try {
        const res = await fetch(serverURL + "/api/blog/get_contents?blogID=" + context.query.blogID);
        const resHub = await fetch(serverURL + "/api/hub/get_hub?hubName=ffxiv");
        const data = await res.json();
        const resHubData = await resHub.json();
        if (!res.ok) {
            return {
                props: {
                    err: data.error,
                },
            };
        } else {
            return {
                props: {
                    blog: data,
                    hub: resHubData,
                }
            };
        }
    } catch(err) {
        if (err) throw err;
    }
};

const Edit = ({ err, blog, hub }) => {
    const user = useSelector(state => state.user);
    const router = useRouter();
    const [data, setData] = useState([...blog.blogContent, { type:"create" }]);
    const [createText, setCreateText] = useState("");
    const [contentType, setContentType] = useState("text");
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [headerImageValue, setHeaderImageValue] = useState(blog.headerImage || "");
    const [title, setTitle] = useState(blog.blogTitle || "");
    const [type, setType] = useState(blog.blogType || "");
    const [category, setCategory] = useState(blog.historyTitle || "");
    const [isModalOpen, setIsModalOpen] = useState(false);

    let typingTimerTitle;                

    if (err) {
        return <h1>Id not available for edit</h1>;
    } else if (!user.token) {
        return <h1>Restricted</h1>
    }

    const doneTyping = async (textContent, type) => {
        switch (type) {
            case "content": 
                const response = await fetch(serverURL + "/api/blog/content/update", {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        blogContentID: textContent._id,
                        content: textContent.content,
                        type: textContent.type,
                    }),
                })
                break;
            case "title":
                await fetch(serverURL + "/api/blog/udpate_blog", {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        blogID: router.query.blogID,
                        blogTitle: textContent.blogTitle,
                    }),
                });
        }
    }

    const placeHolderHelper = () => {
        switch (contentType) {
            case "text":
                return "Type here";
            case "image":
                return "Paste and image URL here, and press Enter";
        }
    };

    const contentTypeHandler = (action) => {
        setIsDrawerOpen(false);
        switch (action) {
            case "image":
                setContentType("image");
                break;
            case "text":
                setContentType("text");
                break;
            case "imageHeader":
                setIsModalOpen(true);
                break;;
        }
    };

    const publishHandler = async () => {
        const response = await fetch(serverURL + "/api/blog/udpate_blog", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                blogID: router.query.blogID,
                isPrivate: false,
            }),
        });
        if (!response.ok) {
            const errData = response.json();
            console.log(errData.error);
        } else {
            alert("Published");
            window.location.href= `/${router.query.story }/${router.query.blogID}`
        }
    };

    const cancelHandler = () => {
        history.back();
    };

    return (
        <div className="flex flex-col items-center" style={{ width: "100vw" }}>
            <Modal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div style={{ width: 500, height: 450, left: "50%", top: "30%", transform: "translate(-50%, -30%)" }} className="bg-white absolute flex flex-col justify-center items-center">
                    <div className="mb-4">
                        <Typography color="black">
                            Header Settings
                        </Typography>
                    </div>
                    <div className="flex-col justify-center py-4" style={{ width: "80%" }}>
                        <input 
                            className={styles.headerInputs} 
                            placeholder="Header Image" 
                            value={headerImageValue} 
                            onChange={e => setHeaderImageValue(e.target.value)}
                        />
                        <input 
                            className={styles.headerInputs} 
                            placeholder="Header Tittle" 
                            value={headerImageValue} 
                            onChange={e => setHeaderImageValue(e.target.value)}
                        />
                        <input 
                            className={styles.headerInputs} 
                            placeholder="Sub header" 
                            value={headerImageValue} 
                            onChange={e => setHeaderImageValue(e.target.value)}
                        />
                        <div className="w-full flex justify-end">
                            <ButtonA>
                                <Typography type="r2">Update</Typography>
                            </ButtonA>
                        </div>
                    </div>
                </div>
            </Modal>
            <Drawer anchor={"bottom"} open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
                <List>
                    <ListItem onClick={contentTypeHandler.bind(this, "imageHeader")} button>
                        <ListItemText primary={"Edit header"} />
                    </ListItem>
                    <Divider style={{ margin: "15px 0" }}/>
                    <ListItem onClick={contentTypeHandler.bind(this, "image")} button>
                        <ListItemText primary={"Add Image"} />
                    </ListItem>
                </List>
            </Drawer>
            <div style={{ width: "100vw", height: 80 }} className="bg-black flex justify-between items-center px-7">
                <div>
                    <ul className="flex">
                        <li className="mr-8">
                            <FormControl style={{ width: 120 }}>
                                <InputLabel id="type-label">Type</InputLabel>
                                <Select
                                    labelId="type-label"
                                    id="type"
                                    value={type}
                                    onChange={async (e) => {
                                        const res = await fetch(serverURL + "/api/blog/udpate_blog", {
                                            method: "POST",
                                            headers: {
                                                'Accept': 'application/json',
                                                'Content-Type': 'application/json'
                                            },
                                            body: JSON.stringify({
                                                blogID: router.query.blogID,
                                                blogType: e.target.value,
                                            }),
                                        });                 
                                        if (!res.ok) {
                                            console.log(await res.json().error);
                                        } else {
                                            setType(e.target.value)
                                        }                    
                                    }}
                                >
                                    <MenuItem value={"char"}>Character</MenuItem>
                                    <MenuItem value={"blog"}>Blog</MenuItem>
                                </Select>
                            </FormControl>
                        </li>
                        <li className="mr-8">
                            <FormControl style={{ width: 120 }}>
                                <InputLabel id="category-label">Category</InputLabel>
                                <Select
                                    labelId="category-label"
                                    id="category"
                                    value={category}
                                    onChange={async (e) => {
                                        const res = await fetch(serverURL + "/api/blog/udpate_blog", {
                                            method: "POST",
                                            headers: {
                                                'Accept': 'application/json',
                                                'Content-Type': 'application/json'
                                            },
                                            body: JSON.stringify({
                                                blogID: router.query.blogID,
                                                historyTitle: e.target.value,
                                            }),
                                        });
                                        if (!res.ok) {
                                            const errData = await res.json();
                                            console.log(errData.error);
                                        } else {
                                            setCategory(e.target.value)
                                        }
                                    }}
                                >
                                    {hub.history.map((item, index) => {
                                        return (
                                            <MenuItem 
                                                key={index} 
                                                value={item}
                                            >{item}</MenuItem>
                                        );
                                    })}
                                </Select>
                            </FormControl>
                        </li>
                    </ul>
                </div>

                <div className="flex">
                    <ButtonA clickHandler={publishHandler}>
                        <Typography type="r2">Publish</Typography>
                    </ButtonA>
                    <div className="mx-2" />
                    <ButtonA clickHandler={cancelHandler} backgroundColor={"transparent"}>
                        <Typography type="r2">Cancel</Typography>
                    </ButtonA>
                </div>
            </div>
            <Banner
                uri={"https://checkpointxp.com/wp-content/uploads/2021/04/FFXIV_PUB_Patch5.5_25-e1619804511703.png"}
                title={"asdasd"}
                text={"ASDASDasd"}
            />
            <div style={{ width: 800 }} className="mt-12 flex flex-col justify-center items-center">
                <div className="flex" style={{ width: "100%" }}>
                    <input 
                        className={styles.title} 
                        placeholder="Title" 
                        value={title} 
                        onChange={e => setTitle(e.target.value)}
                        onKeyDown={() => clearTimeout(typingTimerTitle)}
                        onKeyUp={() => {
                            clearTimeout(typingTimerTitle);
                            typingTimerTitle = setTimeout(doneTyping.bind(this, { blogTitle: title }, "title"), 4000);
                        }}
                    />
                </div>
                {data.map((item, index) => {

                    let typingTimer;             
                    const doneTypingInterval = 3000; 

                    const keyUpHandler = () => {
                        clearTimeout(typingTimer);
                        typingTimer = setTimeout(doneTyping.bind(this, item, "content"), doneTypingInterval);

                    }
                    
                    const keyDownHandlerCreate = async (e) => {
                        clearTimeout(typingTimer);
                        if (e.key === "Enter") {
                            e.preventDefault();
                            let update = [...data];
                            const res = await fetch(serverURL + "/api/blog/content/create", {
                                method: "POST",
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    blogID: router.query.blogID,
                                    content: createText,
                                    type: contentType,
                                }),
                            });
                            const resData = await res.json();
                            if (!res.ok) {
                                console.log(resData.err);
                            } else {
                                update.splice(index, 1, { _id: resData._id, type: contentType, content: createText }, { type: "create" });
                                setCreateText("");
                                setData(update);
                                contentTypeHandler("text");
                            }
                        }
                    }

                    const deleteData = () => {
                        let update = [...data];
                        update.splice(index, 1);
                        setData(update);
                    }

                    switch (item.type) {
                        case "text": 
                            return (
                                <TextareaAutosize 
                                key={"key:" + index} 
                                className={styles.text} 
                                onKeyUp={keyUpHandler}
                                onKeyDown={async (e) => {
                                    clearTimeout(typingTimer);
                                    if (e.key === "Backspace") {
                                        if (item.content === "") {
                                            const res = await fetch(serverURL + "/api/blog/content/remove", {
                                                method: "POST",
                                                headers: {
                                                    'Accept': 'application/json',
                                                    'Content-Type': 'application/json'
                                                },
                                                body: JSON.stringify({
                                                    blogContentID: item._id,
                                                }),
                                            });
                                            if (!res.ok) {
                                                const errData = await res.json();
                                                console.log(errData.error);
                                            } else {
                                                const resData = await res.json();
                                                console.log("This is the log", resData);
                                                deleteData();
                                            }
                                        }
                                    } else if (e.key === "Enter") {
                                        e.preventDefault();
                                        let update = [...data];
                                        const filteredUpdate = update.filter(content => {
                                            if (content.type !== "create") {
                                                return content;
                                            }
                                        });
                                        filteredUpdate.splice(index + 1, 0, { type: "create" });
                                        setData(filteredUpdate);
                                    }
                                }}
                                onChange={(e) => {
                                    let update = [...data];
                                    update[index].type = item.type;
                                    update[index].content = e.target.value;
                                    setData(update);
                                }} 
                                value={item.content}
                                />
                            );
                        case "image": 
                                return (
                                    <ImageDisplay
                                        key={"key:" + index}
                                        onClose={async () => {
                                            const res = await fetch(serverURL + "/api/blog/content/remove", {
                                                method: "POST",
                                                headers: {
                                                    'Accept': 'application/json',
                                                    'Content-Type': 'application/json'
                                                },
                                                body: JSON.stringify({
                                                    blogContentID: item._id,
                                                }),
                                            });
                                            if (!res.ok) {
                                                const errData = await res.json();
                                                console.log(errData.error);
                                            } else {
                                                const resData = await res.json();
                                                console.log("This is the log", resData);
                                                deleteData();
                                            }
                                        }}
                                        content={item.content}
                                    />
                                );
                        case "create":
                            return (
                                <div key={index} style={{ width: "100%" }} className="flex relative">
                                    {createText === "" &&
                                        <div onClick={() => setIsDrawerOpen(true)} className="absolute flex justify-center items-center" style={{ left: -80, top: -15 }}>
                                            <Fab color="primary" aria-label="add">
                                                <Add />
                                            </Fab>
                                        </div>
                                    }
                                    <TextareaAutosize 
                                        autoFocus
                                        onBlur={contentTypeHandler.bind(this, "text")} 
                                        placeholder={placeHolderHelper()} 
                                        onKeyDown={keyDownHandlerCreate} 
                                        className={styles.text} 
                                        value={createText} 
                                        onChange={(e) => {
                                            setCreateText(e.target.value);
                                        }}
                                    />
                                </div>
                            );
                    }
                })}
            </div>
        </div>
    );
};

export default Edit;