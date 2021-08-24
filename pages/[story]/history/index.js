import React, { useState } from "react";
import Link from "next/link";
import Layout from "../../../components/Layout/Layout";
import Typography from "../../../components/Typography/Typography";
import TimeLineBlock from "../../../components/TimeLineBlock/TimeLineBlock";
import RoadMap from "../../../assets/svg/RoadMap.svg"
import Image from "next/image";
import { useRouter } from "next/router"
import { serverURL } from "../../../config/Server"
import { capitalizeFirstLetter } from "../../../helpers/stringHelpers";

export const getServerSideProps = async (context) => {
    try {
        const res = await fetch(serverURL + "/api/hub/get_hub?hubName=" + context.query.story);
       const resBlog = await fetch(serverURL + "/api/blog/get_all_blogs");
        if (!res.ok) {
            const errData = await res.json();
            return {
                props: {
                    err: errData.error,
                }
            };
        } else if (!resBlog.ok) {
            const resBlogErr = await resBlog.json();
            return {
                props: {
                    err: resBlogErr.error,
                },
            };
        } else {
            const resData = await res.json();
            const resBlogData = await resBlog.json();
            return {
                props: {
                    hub: resData,
                    blogs: resBlogData,
                },
            };
        }
        
    } catch(err) {
        if (err) throw err;
    }
};


const Index = ({ hub, blogs }) => {

    const router = useRouter();

    const { story } = router.query;

    return (
        <Layout>
            <section style={{ minHeight: "100vh", width: "100vw" }} className="bg-black flex flex-col items-center">
                <div className="mt-80">
                    <Typography type="s2" bold>TIMELINE</Typography>
                </div>
                <div className="flex justify-center flex-col-reverse" style={{ width: 1000, padding: "40px 20px"}}>
                        {hub.history.map((title, index) => {
                            if (index === 0) {
                                return (
                                    <div key={"key:" + index} className="flex flex-col justify-center items-center">
                                        <Typography style={{ marginBottom: 25 }} type="r1">{capitalizeFirstLetter(title)}</Typography>
                                        <div className="flex">
                                            {blogs.map((blog, index) => {
                                                if ((blog.historyTitle === title) && (blog.isPrivate === false)) {
                                                    return (
                                                        <Link key={"key:" + index} href={`/${story}/${blog._id}`}><a>
                                                            <TimeLineBlock
                                                                title={blog.blogTitle}
                                                                src={blog.thumbnailImage}
                                                            />
                                                        </a></Link>
                                                    );
                                                }
                                            })}
                                        </div>
                                    </div>
                                );
                            } else {
                                return (
                                    <div key={"key:" + index}>
                                        <div className="flex flex-col justify-center items-center">
                                            <Typography style={{ marginBottom: 25 }} type="r1">{capitalizeFirstLetter(title)}</Typography>
                                            <div className="flex">
                                                {blogs.map((blog, index) => {
                                                    if (blog.historyTitle === title) {
                                                        return (
                                                            <Link key={"key:" + index} href={`/${story}/${blog._id}`}><a>
                                                                <TimeLineBlock
                                                                    title={blog.blogTitle}
                                                                    src={blog.thumbnailImage}
                                                                />
                                                            </a></Link>
                                                        );
                                                    }
                                                })}
                                            </div>
                                        </div>
                                        <div className="flex justify-center my-9">
                                            <Image src={RoadMap}/>
                                        </div>
                                    </div>
                                );
                            }
                        })}
                </div>
            </section>
        </Layout>
    );
};

export default Index;