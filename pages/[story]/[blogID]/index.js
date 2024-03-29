import Banner from "../../../components/Banner/Banner";
import Layout from "../../../components/Layout/Layout";
import Typography from "../../../components/Typography/Typography";
import { serverURL } from "../../../config/Server";
import ImageDisplay from "../../../components/ImageDisplay/ImageDisplay";

export const getServerSideProps = async (context) => {
    try {
        const res = await fetch(serverURL + "/api/blog/get_contents?blogID=" + context.query.blogID);
        const data = await res.json();
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
                }
            };
        }
    } catch(err) {
        if (err) throw err;
    }
};

const Index = ({ err, blog }) => {

    if (err) {
        return <h1>{err}</h1>;
    }

    return (
        <Layout>
            <Banner
                title={blog.headerTitle}
                text={blog.headerSub}
                uri={blog.headerImage}
            />
            <section style={{ width: "100%", overflowX: "hidden" }} className={"bg-black flex justify-center p-36"}>
                <div style={{ width: 1000 }}>
                    <div style={{ marginBottom: 15 }}>
                        <Typography type="r1">{blog.blogTitle}</Typography>
                    </div>
                    {blog.blogContent.map((content, index) => {
                        switch (content.type) {
                            case "text": 
                                return <div className="mb-5"><Typography type="r2">{content.content}</Typography></div>
                            case "image": 
                                return (
                                    <ImageDisplay
                                        content={content.content}
                                    />
                                );                        
                        }
                    })}
                </div>
            </section>
        </Layout>
    );
};

export default Index;