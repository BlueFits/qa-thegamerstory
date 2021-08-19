import React, { useState } from "react";
import { Add, Close } from "@material-ui/icons";
import ButtonA from "../../../components/ButtonA/ButtonA";
import Typography from "../../../components/Typography/Typography";
import styles from "./edit.module.css";
import ImageDisplay from "../../../components/ImageDisplay/ImageDisplay";
import TextareaAutosize from "react-textarea-autosize";
import { Fab } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';



const Edit = () => {

    const [data, setData] = useState([
        {
            type:"image",
            content: "https://checkpointxp.com/wp-content/uploads/2021/04/FFXIV_PUB_Patch5.5_25-e1619804511703.png"
        },
        { type:"create" }
    ]);
    const [createText, setCreateText] = useState("");
    const [contentType, setContentType] = useState("text");
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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
        }
    }

    return (
        <div className="flex flex-col items-center" style={{ width: "100vw" }}>
            <Drawer anchor={"bottom"} open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
                <List>
                    <ListItem onClick={contentTypeHandler.bind(this, "image")} button>
                        <ListItemText primary={"Add Image"} />
                    </ListItem>
                </List>
            </Drawer>
            <div style={{ width: "100vw", height: 80 }} className="bg-black flex justify-end items-center px-7">
                <ButtonA>
                    <Typography type="r2">Publish</Typography>
                </ButtonA>
                <div className="mx-2" />
                <ButtonA backgroundColor={"transparent"}>
                    <Typography type="r2">Cancel</Typography>
                </ButtonA>
            </div>

            <div style={{ width: 800 }} className="mt-12 flex flex-col justify-center items-center">
                <div className="flex" style={{ width: "100%" }}>
                    <input className={styles.title} placeholder="Title" />
                </div>
                {data.map((item, index) => {

                    
                    const keyDownHandler = (e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            let update = [
                                ...data, 
                                // {
                                //     type: contentType,
                                //     content: createText,
                                // },
                                // { type: "create" }
                            ];
                            update.splice(index, 1, { type: contentType, content: createText }, { type: "create" });
                            setCreateText("");
                            setData(update);
                            contentTypeHandler("text");
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
                                onKeyDown={(e) => {
                                    if (e.key === "Backspace") {
                                        if (item.content === "") {
                                            deleteData();
                                        }
                                    } else if (e.key === "Enter") {
                                        console.log("This worked")
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
                                    update[index] = {
                                        type: item.type,
                                        content: e.target.value,
                                    };
                                    setData(update);
                                }} 
                                value={item.content}
                                />
                            );
                        case "image": 
                                return (
                                    <ImageDisplay
                                        onClose={deleteData}
                                        content={item.content}
                                    />
                                );
                        case "create":
                            return (
                                <div style={{ width: "100%" }} className="flex relative">
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
                                        onKeyDown={keyDownHandler} 
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